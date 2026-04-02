
// ===== SELECT ELEMENTS =====
let pupils = document.querySelectorAll(".pupil");
let password = document.getElementById("password");
let eyes = document.querySelectorAll(".eye");
let bar = document.getElementById("strength-bar");
let text = document.getElementById("strength-text");
let toggle = document.getElementById("toggle");
let loginBtn = document.querySelector("button");
let username = document.querySelector("input[type='text']");
let message = document.getElementById("message");


// ===== 👀 EYE TRACK (FIXED WITH LIMIT) =====
document.addEventListener("mousemove", (e) => {
  pupils.forEach(pupil => {
    let rect = pupil.parentElement.getBoundingClientRect();

    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;

    let moveX = (x - rect.width/2) / 8;
    let moveY = (y - rect.height/2) / 8;

    let max = 12;

    moveX = Math.max(-max, Math.min(max, moveX));
    moveY = Math.max(-max, Math.min(max, moveY));

    pupil.style.transform = `translate(${moveX}px, ${moveY}px)`;
  });
});


// ===== 🙈 CLOSE / OPEN EYES =====
password.addEventListener("focus", () => {
  eyes.forEach(eye => eye.classList.add("closed"));
});

password.addEventListener("blur", () => {
  eyes.forEach(eye => eye.classList.remove("closed"));
});


// ===== 👁 SHOW / HIDE PASSWORD =====
toggle.addEventListener("click", () => {

  if (password.type === "password") {
    password.type = "text";
    eyeIcon.style.fill = "red";

    // 👀 open eyes
    eyes.forEach(eye => eye.classList.remove("closed"));

  } else {
    password.type = "password";
    eyeIcon.style.fill = "#00ff00";

    // 🙈 close eyes
    eyes.forEach(eye => eye.classList.add("closed"));
  }

});


// ===== 🔐 PASSWORD STRENGTH =====
password.addEventListener("input", () => {
  let val = password.value;
  let score = 0;

  if (val.length > 5) score++;
  if (/[A-Z]/.test(val)) score++;
  if (/[0-9]/.test(val)) score++;
  if (/[^A-Za-z0-9]/.test(val)) score++;

  let colors = ["red","orange","yellow","lime"];
  let texts = ["WEAK ❌","MEDIUM ⚠️","GOOD 👍","STRONG 🔥"];

  bar.style.width = (score+1)*25 + "%";
  bar.style.background = colors[score];
  text.innerText = texts[score];
});


// ===== 🔘 LOGIN VALIDATION =====
loginBtn.addEventListener("click", () => {

  if (username.value.trim() !== "" && password.value.trim() !== "") {
    message.innerText = "ACCESS GRANTED ✅";
    message.style.color = "lime";
  } else {
    message.innerText = "ENTER USERNAME & PASSWORD ❌";
    message.style.color = "red";
  }

});


// ===== 🌧 MATRIX BACKGROUND =====
let canvas = document.getElementById("matrix");
let ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let letters = "01";
let fontSize = 14;
let columns = Math.floor(canvas.width / fontSize);
let drops = new Array(columns).fill(1);

function draw() {
  ctx.fillStyle = "rgba(0,0,0,0.05)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#0f0";
  ctx.font = fontSize + "px monospace";

  for (let i = 0; i < drops.length; i++) {
    let char = letters[Math.floor(Math.random()*letters.length)];
    ctx.fillText(char, i*fontSize, drops[i]*fontSize);

    if (drops[i]*fontSize > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }

    drops[i]++;
  }
}

setInterval(draw, 50);


// ===== 📱 RESIZE FIX =====
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
