// show pictures

let choices = [];

function showImage(id) {
  let element = document.getElementById(`${id}`);
  if (element.style.display === "none") {
    element.style.display = "block";
  } else {
    element.style.display = "none";
  }
  if (func(element) === true) {
    let elementmatched = document.getElementById(`girl${id}`);
    elementmatched.style.display = "block";
  }
  func(element);
}

const func = element => {
  choices.push(element.src);
  console.log(choices);
  if (choices[0] === choices[1]) {
    console.log(choices);
    element.style.display = "none";
    return true;
  } else {
    return false;
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
