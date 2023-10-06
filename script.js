var url;
var image;
var text;
var words = [];
var imageUrls = [];
var i = 0;
var count = 0;
var wordsActual = [];
var currentWord;

//Read on start (has modal on start)
window.onload = function(){
  readFromStorage();
  displayMultiple(); 
  var showAgain = JSON.parse(localStorage.getItem("showAgain"));
  if(showAgain || showAgain == null){
    displayModal();
    localStorage.setItem("showAgain", "true");
  }
}

//creates div inside of body
var main = document.createElement("DIV");
main.setAttribute("class", "cards");
document.body.appendChild(main); //appends div to body

function speak(){
  var u = new SpeechSynthesisUtterance();
  for(let k = 0; k < wordsActual.length; k++){
    u.text += wordsActual[k] + " ";
  }

  speechSynthesis.speak(u);
  u.onend = function(event){
    currentWord.innerHTML = ""; //clears sentence at bottom after it is spoken
  }
  
  wordsActual = [];
}


//open form
function openForm() {
  document.getElementById("enterWord").style.display = "block";
}

//close form
function closeForm() { //'resets' values
  document.getElementById("enterWord").style.display = "none";
  document.getElementById("userInputWord").value = "";
  document.getElementById("dImageBox").value = "";
  document.getElementById('userInputWord').placeholder = "Enter the word...";
}

//Save the text and images and displays it
function saveTextAndDisplay(){
  text = document.getElementById('userInputWord').value;
  if(text == " " || text == "" || text == null){ //if user did not enter a word
    document.getElementById('userInputWord').placeholder = "Please enter a word.";
  }else{
    count = 0;
    for(let f = 0; f < text.length; f++){ //if user tries to enter 2 words
      if(text[f] == " "){
        document.getElementById('userInputWord').value = "";
        document.getElementById('userInputWord').placeholder = "Please enter 1 word.";
      }else{
        count++;
      }
    }

    if(count == text.length){
      count = 0;
      for(let j = 0; j < words.length; j++){
        if(text == words[j]){ //if user tries to enter duplicate word
          document.getElementById('userInputWord').value = "";
          document.getElementById('userInputWord').placeholder = "Please enter a word.";
        }else{
          count++;
        }
      }

      if(count == words.length){ //if word is valid, push it to the array
        words.push(text);
        count = 0;
        //removed saveImage and addToArray
        url = document.getElementById('dImageBox').value;
        imageUrls.push(url); //adds image to array
        printArray();
        closeForm();
      }
    }
  }
  saveToStorage();
}

//Print Arrays
function printArray(){
  var articleCard = document.createElement("ARTICLE"); //creates article
  articleCard.setAttribute("class", "card");
  main.appendChild(articleCard); //appends article to main div

  //creates image
  if(imageUrls[i] != null && imageUrls[i] != " " && imageUrls[i] != ""){
    var img = document.createElement("IMG"); 
    img.src = imageUrls[i]; //sets image source
    articleCard.appendChild(img); //appends img to article
  } 

  //creates div for text
  var divCard = document.createElement("DIV");
  divCard.setAttribute("class", "text");
  articleCard.appendChild(divCard); //appends div to article

  //creates text
  var para = document.createElement("P");  
  para.setAttribute("class", "card"); 
  para.setAttribute("id", "textID");

  para.innerText = words[i]; //sets text source              
  divCard.appendChild(para); //appends text to div 
 
  articleCard.onclick = function(){speakBot()}; //when card is clicked

  function speakBot(){
    wordsActual.push(para.innerHTML); //adds

    currentWord = document.getElementById("sentencePreview");
    currentWord.innerHTML += para.innerHTML + " "; //adds current word to the sentence at the bottom
  }

  i++;
}

/* -------------------COOKIES---------------------- */

//Display Multiple
function displayMultiple(){
  if (words != null){
    for(j = 0; j < words.length; j++){
      printArray();
    }
  }
}

//Save the arrays to localStorage
function saveToStorage(){
  localStorage.setItem("wordArray", JSON.stringify(words));
  localStorage.setItem("imageUrlArray", JSON.stringify(imageUrls));
  
}

//Read from localStorage
function readFromStorage(){
  wArray = JSON.parse(localStorage.getItem("wordArray"));
  iArray = JSON.parse(localStorage.getItem("imageUrlArray"));
  if(wArray == null){
    words = [];
  }
  else{
    words = JSON.parse(localStorage.getItem("wordArray"));
  }
  
  if(iArray == null){
    imageUrls = [];
  }
  else{
    imageUrls = JSON.parse(localStorage.getItem("imageUrlArray"));
  }
  
}

//Empty the arrays
function emptyArrays(){
  localStorage.setItem("wordArray", JSON.stringify([]));
  localStorage.setItem("imageUrlArray", JSON.stringify([]));
  window.location.reload();
}

function deleteButton(){
  currentWord.innerHTML = " ";
  wordsActual = [];
}
//https://www.twilio.com/blog/speech-to-text-browser-web-speech-api
const chk = document.getElementById('chk');

chk.addEventListener('change', () => {
	document.body.classList.toggle('dark');
});