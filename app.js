let boxes = document.querySelectorAll(".box");
let mgsName = document.querySelector(".mgs-winner");
let mgsNameBox = document.querySelector(".mgs-winner-box");
let newGamebtn = document.querySelector("#new-game");
let btnstart = document.querySelector(".start");
let mainsection = document.querySelector(".main");
let btnSection = document.querySelector(".btn");
let msgtrun = document.querySelector("#trun-msg");
let PlayerOName = document.getElementById("Player_O");
let PlayerXName = document.getElementById("Player_X");
let winSound = document.getElementById("winSound");
// console.log(winSound);
let userNameO = "";
let userNameX = "";
// msgtrun.innerText = "O";
let turnO = true;
let count = 0;
let box;

let winneerr = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [0, 4, 8],
];
const startGame = () => {
  userNameX = PlayerXName.value;
  userNameO = PlayerOName.value;
  if (userNameO != "" && userNameX != "") {
    mainsection.classList.remove("hide");
    btnSection.classList.add("hide");
    msgtrun.innerText = userNameO;
  } else {
    alert("Enter Players Name");
  }
};
btnstart.addEventListener("click", startGame);
const resrtGame = () => {
  pauseaudio();
  turnO = true;
  count = 0;
  msgtrun.innerText = userNameO;
  enebelboxes();
  mgsNameBox.classList.add("hide");
};
const disebleboxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};
const enebelboxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";

    box.style.backgroundColor = "#ffffc7";
  }
};

const winnerName = (winner) => {
  if (winner == "O") {
    // winSound.play();
    playAudio();
    mgsName.innerText = `Congeatulations, winner is ${userNameO}`;

    mgsNameBox.classList.remove("hide");
  } else if (winner == "X") {
    playAudio();
    mgsName.innerText = `Congeatulations, winner is ${userNameX}`;

    mgsNameBox.classList.remove("hide");
  }
};
const drawmgs = (draw) => {
  mgsName.innerText = `Game is draw, Start New  Game`;
  mgsNameBox.classList.remove("hide");
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO) {
      turnO = false;

      box.innerText = "O";

      msgtrun.innerText = userNameX;
    } else {
      turnO = true;
      box.innerText = "X";
      msgtrun.innerText = userNameO;
    }
    box.disabled = true;
    count++;
    let iswinner = winnercheck();
    if (count === 9 && !iswinner) {
      drawmgs();
    }
  });
});
function checkwin(pentter) {
  for (const boxs of boxes) {
    if (
      boxs.value == pentter[0] ||
      boxs.value == pentter[1] ||
      boxs.value == pentter[2]
    ) {
      boxs.style.backgroundColor = "Green";
    }
  }
}

const winnercheck = () => {
  for (let pentter of winneerr) {
    let val1 = boxes[pentter[0]].innerText;
    let val2 = boxes[pentter[1]].innerText;
    let val3 = boxes[pentter[2]].innerText;
    if (val1 != "" && val2 != "" && val3 != "") {
      if (val1 === val2 && val2 === val3) {
        checkwin(pentter);

        winnerName(val1);
        disebleboxes();
        return true;
      }
    }
  }
  return false;
};

newGamebtn.addEventListener("click", resrtGame);
var timesetid;
function playAudio() {
  winSound.currentTime = 0.6;
  winSound.play();

  timesetid = setTimeout(
    (resetsound = () => {
      playAudio();
    }),
    2000
  );
}
// playAudio();

function pauseaudio() {
  winSound.loop = false;
  clearTimeout(timesetid);
  winSound.pause();
}
