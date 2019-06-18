let choices = []

const showImage = (id) => {
  let element = document.getElementById(`${id}`)
  Reference: 
  https://stackoverflow.com/questions/23937923/javascript-function-onclick-must-click-twice-why-so

  element.style.display = "block"; 
  choices.push(element);

  if(choices.length === 2){
    comparingTwoCards()
  }
}

const comparingTwoCards = () => {
  // get the first and second cards
  const firstCard = document.getElementById(`${choices[0].id}`)
  const parentOfFirstCard =firstCard.parentNode
  const secondCard = document.getElementById(`${choices[1].id}`)
  const parentOfSecondCard =secondCard.parentNode

  // compare two cards
  if (choices[0].src === choices[1].src) {
    firstCard.parentNode.style.pointerEvents = "none"
    secondCard.parentNode.style.pointerEvents = "none"
    setTimeout(() => {
      const newPic = `<img id="girl1" class="girl" src="./girls/${firstCard.name}_girl.jpeg" alt="" />`

      firstCard.parentNode.innerHTML = null
      parentOfFirstCard.insertAdjacentHTML('beforeend', newPic);
      
      secondCard.parentNode.innerHTML = null
      parentOfSecondCard.insertAdjacentHTML('beforeend', newPic);
    }, 1000)
    choices = []
  } else {
    setTimeout(() => {
      firstCard.style.display = "none"
      secondCard.style.display = "none"
    }, 400)
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
