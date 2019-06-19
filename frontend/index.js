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

    resultObj = {
      id: 1,
      turns: 10,
      time: 120
    };

    axios
      .post("/results", resultObj)
      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
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
    console.log(`${i + 1}: ${arrayLen}`);
    const randomNum = Math.floor(Math.random() * arrayLen);

    console.log(randomNum);

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
