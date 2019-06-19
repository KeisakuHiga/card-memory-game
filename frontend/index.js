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

// changed based on the game level (basic:120, normal:60, hard:30)
let timeLimit = 10

// basic game data
let turns = 0
let matches = 0
let timeTaken = 0
let gameTimer = 0

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
      const newPic = `<img id="girl1" class="girl" src="./answer/${
        firstCard.name
      }.jpeg" alt="" />`;

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
    stopGame()
    alert("You win!");
    alert(`you took ${turns} turns`);
    let userName = document.querySelector('input[name="user-name"]').value
    const gameData = {
      name: userName,
      turns: turns,
      time: timeTaken
    }
    saveGameData(gameData)
  }
};

const startGame = () => {
  gameTimer = setInterval(() => {
    timeTaken++;
    document.getElementById("timer").innerHTML = timeTaken;
    if (timeTaken === timeLimit) {
      stopGame()
      alert("Time is up!");
      let userName = document.querySelector('input[name="user-name"]').value
      const gameData = {
        name: userName,
        turns: turns,
        time: timeTaken
      }
      saveGameData(gameData)
    }
  }, 1000);
};

const parentContainer = document.querySelector(".parent");
const startButton = document.querySelector("button");
startButton.addEventListener("click", event => {
  startGame()
  createCards();
});

const stopGame = () => {
  clearInterval(gameTimer)
  gameTimer = 0
}
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
        <th scope=“col”>Rank</th>
        <td scope=“col”>Name</td>
        <td scope=“col”>Turns</td>
        <td scope=“col”>Time</td>
      </tr>
    </thead>
    <tbody></tbody>
  `;
  table.insertAdjacentHTML("beforeend", tHeadAndTBody);

  const tBody = document.querySelector("tbody");
  // console.log(window.location);
  fetch("/game")
    .then(res_promise => {
      // console.log(res_promise);
      return res_promise.json();
    })
    .then(data => {
      const sortedData = data.sort((data1, data2) => {
        return data1.time - data2.time
      })
      for (let i = 0; i < sortedData.length; i++) {
        const table = `
          <tr>
            <th scope=“row”>${i+1}</th>
            <td>${sortedData[i].name}</td>
            <td>${sortedData[i].turns} times</td>
            <td>${sortedData[i].time} seconds</td>
          </tr>
        `
      tBody.insertAdjacentHTML("beforeend", table)
      }
  })
}
showRanking()

async function saveGameData(gameData) {
  const response = await axios.post('/game', gameData)
  location.reload()
}