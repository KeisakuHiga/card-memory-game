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
// let timetaken = 240 - countdown;

const showImage = id => {
  turns++;

  let element = document.getElementById(`${id}`);
  element.style.display = "block";
  choices.push(element);
  if (element.style.display === "block") {
    element.disabled = "disabled";
  }

  if (choices.length === 2) {
    comparingTwoCards();
  }
  console.log(turns);
};

const turnController = () => {};

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
  if (matches === 8) {
    alert("You win!");
    alert(`you took ${turns} turns`);
    console.log("win");
  }
  console.log(matches);
};

const startGame = () => {
  let countdown = 240;
  setInterval(() => {
    countdown--;
    document.getElementById("timer").innerHTML = countdown;
    if (countdown === 0) {
      return alert("Time is up!");
    }
  }, 1000);
};

const createCards = arrayOfCountries => {
  const cardContainer = document.querySelector(".card-container");
  for (let i = 0, len = arrayOfCountries.length; i < len; i++) {
    const htmlOfFlags = `
    <div class="card-container" onclick="showImage(${i + 1})">
      <img id="${i + 1}" class="flag" name="${
      arrayOfCountries[i]
    }" src="./flags/senegal.png" alt="" />
    </div>
    `;
    cardContainer.insertAdjacentHTML("beforeend", htmlOfFlags);
  }
};
