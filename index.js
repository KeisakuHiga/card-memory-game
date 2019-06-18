// hello k!

const showImage = id => {
  var elem = document.getElementById(`#${id}`);
  elem.style.display = "block";
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
