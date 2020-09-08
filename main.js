const canvas = document.querySelector("#draw");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

ctx.fillStyle = "#FFFFFF";
ctx.fillRect(0, 0, canvas.width, canvas.height);

ctx.strokeStyle = "#000000";
ctx.lineJoin = "round";
ctx.lineCap = "round";
ctx.lineWidth = 10;

let isDrawing = false;
let lastX = 0;
let lastY = 0;
let hue = 0;
let direction = true;
let rainbowIsOn = false;

//DRAWING
function draw(e) {
  if (!isDrawing) return;
  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
  [lastX, lastY] = [e.offsetX, e.offsetY];

  //RAINBOW ON
  if (rainbowIsOn) {
    hue++;
    ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
    if (hue >= 360) {
      hue = 0;
    }
  }
}
canvas.addEventListener("mousedown", (e) => {
  isDrawing = true;
  [lastX, lastY] = [e.offsetX, e.offsetY];
});

canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", () => (isDrawing = false));
canvas.addEventListener("mouseout", () => (isDrawing = false));

//RAINBOW SETTING
function toggleRainbow() {
  rainbowIsOn = !rainbowIsOn;
  const rainbowButton = document.querySelector("#rainbowButton");
  rainbowButton.style.backgroundImage =
    "linear-gradient(red, orange, yellow, green, blue, purple)";
  if (!rainbowIsOn) {
    ctx.strokeStyle = colorInput.value;
    rainbowButton.style.backgroundImage = "";
    rainbowButton.style.backgroundColor = "#0075ff";
  }
}

//CHANGING BRUSH FEATURES
function handleSizeUpdate(e) {
  ctx.lineWidth = e.target.value;
}

function handleColorUpdate(e) {
  ctx.strokeStyle = e.target.value;
}

function handleStyleUpdate(e) {
  ctx.lineCap = e.target.value;
}

const sizeInput = document.querySelector("#sizeInput");
sizeInput.addEventListener("change", handleSizeUpdate);

const colorInput = document.querySelector("#colorInput");
colorInput.addEventListener("change", handleColorUpdate);

const styleInputs = document.querySelectorAll("#styleInput");
styleInputs.forEach((input) =>
  input.addEventListener("change", handleStyleUpdate)
);

//CLEAR CANVAS
function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

const clearButton = document.querySelector("#clear");
clearButton.addEventListener("mouseover", function () {
  this.style.backgroundColor = "#D30D0D";
});
clearButton.addEventListener("mouseout", function () {
  this.style.backgroundColor = "#0075ff";
});

//SAVE CANVAS
const saveButton = document.querySelector("#save");
saveButton.addEventListener("mouseover", function () {
  this.style.backgroundColor = "#3FF10E";
});
saveButton.addEventListener("mouseout", function () {
  this.style.backgroundColor = "#0075ff";
});

function saveCanvas() {
  const url = canvas.toDataURL();
  const a = document.createElement("a");
  a.style.display = "none";
  a.href = url;
  a.download = "Let's Draw! image";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  alert("Your file has downloaded!");
}
