//save the modal
var modal = document.getElementById("modal");

//set the span class
var span = document.getElementsByClassName("closeModal")[0];

//open
function displayModal(){
  modal.style.display = "block";
}
//close
span.onclick = function () {
  modal.style.display = "none";
}

//Close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

//don´t show modal
dontShowAgain.onclick = function (event){
  localStorage.setItem("showAgain", "false");
  modal.style.display = "none";
}
