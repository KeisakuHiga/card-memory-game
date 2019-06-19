// const fetch = require("node-fetch");

let choices = [];
let arrayOfCountries = [
  "australia",
  "brazil",
  "canada",
  "china",
  "denmark",
  "france",
  "japan",
  "senegal",
  "australia",
  "brazil",
  "canada",
  "china",
  "denmark",
  "france",
  "japan",
  "senegal"
];
let turns = 0;
let matches = 0;
let playerid = 1;
// let timetaken = 240 - countdown;

const showImage = id => {
  turns++;

  let element = document.getElementById(`${id}`);
  element.style.display = "block";
  choices.push(element);
  if (element.style.display === "block") {
    element.disabled = "disabled";
  }
  element.style.pointerEvents = "none";
  element.parentNode.style.pointerEvents = "none";
  if (choices.length === 2) {
    comparingTwoCards();
  }
  console.log(turns);
};

const comparingTwoCards = () => {
  // get the first and second cards
  const firstCard = document.getElementById(`${choices[0].id}`);
  const firstParent = firstCard.parentNode;
  const secondCard = document.getElementById(`${choices[1].id}`);
  const secondParent = secondCard.parentNode;

  // compare two cards
  if (choices[0].src === choices[1].src) {
    matches++;

    firstParent.style.pointerEvents = "none";
    secondParent.style.pointerEvents = "none";

    setTimeout(() => {
      const newPic = `<img id="girl1" class="girl" src="./girls/${
        firstCard.name
      }_girl.jpeg" alt="" />`;

      firstParent.innerHTML = null;
      firstParent.insertAdjacentHTML("beforeend", newPic);

      secondParent.innerHTML = null;
      secondParent.insertAdjacentHTML("beforeend", newPic);
    }, 1000);
    choices = [];
  } else {
    setTimeout(() => {
      firstCard.style.display = "none";
      secondCard.style.display = "none";
    }, 400);
    choices = [];
  }
  firstCard.style.pointerEvents = "auto";
  secondCard.style.pointerEvents = "auto";
  firstParent.style.pointerEvents = "auto";
  secondParent.style.pointerEvents = "auto";
  if (matches === 8) {
    alert("You win!");
    alert(`you took ${turns} turns`);
    console.log("win");
  }
};

const startGame = () => {
  playerid++;
  let countdown = 240;
  setInterval(() => {
    countdown--;
    document.getElementById("timer").innerHTML = countdown;
    if (countdown === 0) {
      return alert("Time is up!");
    }
  }, 1000);
  let time = 240 - countdown;
  return time;
};

const parentContainer = document.querySelector(".parent");
const startButton = document.querySelector("button");
startButton.addEventListener("click", event => {
  createCards();
});

const createCards = () => {
  for (let i = 0, len = arrayOfCountries.length; i < len; i++) {
    const arrayLen = arrayOfCountries.length;
    const randomNum = Math.floor(Math.random() * arrayLen);
    const htmlOfFlags = `
    <div class="card-container" onclick="showImage(${i + 1})">
      <img id="${i + 1}" class="flag" name="${
      arrayOfCountries[randomNum]
    }" src="./flags/${arrayOfCountries[randomNum]}.png" alt="" />
    </div>
    `;
    arrayOfCountries.splice(randomNum, 1);
    parentContainer.insertAdjacentHTML("beforeend", htmlOfFlags);
  }
};

// Request game history to sever and render the data as table

function showRanking() {
  // clear ranking
  const table = document.querySelector("table");
  table.innerHTML = null;
  const tHeadAndTBody = `
   <thead>
     <tr>
       <th scope=“col”>#</th>
       <td scope=“col”>Name</td>
       <td scope=“col”>Turns</td>
       <td scope=“col”>Time</td>
     </tr>
   </thead>
   <tbody></tbody>
 `;
  table.insertAdjacentHTML("beforeend", tHeadAndTBody);

  const tBody = document.querySelector("tbody");
  console.log(window.location);
  fetch("/game")
    .then(res_promise => {
      return res_promise.json();
    })
    .then(data => {
      console.log(data);
      data.forEach(gameHistory => {
        const table = `
         <tr>
           <th scope=“row”>${gameHistory.id}</th>
           <td>${gameHistory.name}</td>
           <td>${gameHistory.turns}</td>
           <td>${gameHistory.time}</td>
         </tr>
       `;
        tBody.insertAdjacentHTML("beforeend", table);
      });
    });
}
