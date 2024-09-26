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
let userNameO = "";
let userNameX = "";
// msgtrun.innerText = "O";
let turnO = true;
let count = 0;
let winnerarr = [
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
  }
};

const winnerName = (winner) => {
  if (winner == "O") {
    mgsName.innerText = `Congeatulations, winner is ${userNameO}`;

    mgsNameBox.classList.remove("hide");
  } else if (winner == "X") {
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

const winnercheck = () => {
  for (let pentter of winnerarr) {
    let val1 = boxes[pentter[0]].innerText;
    let val2 = boxes[pentter[1]].innerText;
    let val3 = boxes[pentter[2]].innerText;
    if (val1 != "" && val2 != "" && val3 != "") {
      if (val1 === val2 && val2 === val3) {
        winnerName(val1);
        disebleboxes();
        return true;
      }
    }
  }
  return false;
};

newGamebtn.addEventListener("click", resrtGame);
