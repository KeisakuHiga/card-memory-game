// show pictures
// var x = 0
function showImage(id) {
  var x = document.getElementById(`${id}`);
  if (x.style.display === "none") {
    console.log(x.src)
    const newGirlImgSrc = ''
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}


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

