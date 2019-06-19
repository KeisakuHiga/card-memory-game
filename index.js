let choices = []
let arrayOfCountries = ['australia', 'brazil', 'canada', 'china', 'denmark', 'france', 'japan', 'senegal', 'australia', 'brazil', 'canada', 'china', 'denmark', 'france', 'japan', 'senegal']

const showImage = (id) => {
  let element = document.getElementById(`${id}`)
  Reference: 
  https://stackoverflow.com/questions/23937923/javascript-function-onclick-must-click-twice-why-so

  element.style.display = "block"; 
  choices.push(element);

  element.style.pointerEvents = "none"
  element.parentNode.style.pointerEvents = "none"
  if(choices.length === 2){
    comparingTwoCards()
  }
}

const comparingTwoCards = () => {
  // get the first and second cards
  const firstCard = document.getElementById(`${choices[0].id}`)
  const firstParent =firstCard.parentNode
  const secondCard = document.getElementById(`${choices[1].id}`)
  const secondParent =secondCard.parentNode

  // compare two cards
  if (choices[0].src === choices[1].src) {
    setTimeout(() => {
      const newPic = `<img id="girl1" class="girl" src="./girls/${firstCard.name}_girl.jpeg" alt="" />`

      firstParent.innerHTML = null
      firstParent.insertAdjacentHTML('beforeend', newPic);
      
      secondParent.innerHTML = null
      secondParent.insertAdjacentHTML('beforeend', newPic);
    }, 1000)
    choices = []
  } else {
    setTimeout(() => {
      firstCard.style.display = "none"
      secondCard.style.display = "none"
    }, 400)

    firstCard.style.pointerEvents = "auto"
    secondCard.style.pointerEvents = "auto"
    firstParent.style.pointerEvents = "auto"
    secondParent.style.pointerEvents = "auto"
    choices = []
  }
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

const parentContainer = document.querySelector('.parent')
const startButton = document.querySelector('button')
startButton.addEventListener('click', (event) => {
  createCards()
})

const createCards = () => {
  for (let i = 0, len = arrayOfCountries.length; i < len; i++) {
    const randomNum = Math.floor(Math.random() * len)
    const htmlOfFlags = `
    <div class="card-container" onclick="showImage(${i+1})">
      <img id="${i+1}" class="flag" name="${arrayOfCountries[randomNum]}" src="./flags/${arrayOfCountries[randomNum]}.png" alt="" />
    </div>
    `
    arrayOfCountries.splice(1, randomNum)
    parentContainer.insertAdjacentHTML('beforeend', htmlOfFlags)
  }
}
