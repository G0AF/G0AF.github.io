const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let nbcoups = 0;
let nbPair = 0;

function flipCard() {

  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');

  if (!hasFlippedCard) {
    // first click
    hasFlippedCard = true;
    firstCard = this;

    nbcoups++;

    return;
  }

  // second click
  secondCard = this;
  checkForMatch();

  nbcoups++;

  validerRecord();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  nbPair++;

  resetBoard();
  
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
  }, 1500);
}

function resetBoard() { 
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();

cards.forEach(card => card.addEventListener('click', flipCard));

const dialog = document.getElementById('dialog');
const closeButton = document.querySelector("dialog button");
const plusAfficher = document.getElementById('plusAfficher');
const carteTourne = document.getElementById("carteTourne");
const record = document.getElementById("record");
const fin = document.getElementById("fin");
const recordFin = document.getElementById("recordFin");
const carteFin = document.getElementById("carteTourneFin");

/**
 * Quand on click sur le bouton Fermer la fenêtre le dialog ferme
 */
closeButton.addEventListener("click", () =>{
  dialog.close();
});

plusAfficher.addEventListener("click",plusAfficherDialog);

/**
 * Ferme le dialog avec le ne plus afficher
 */
plusAfficher.addEventListener('click', () =>{
  dialog.close();
})

/**
 * Affiche un message dans le stockage local
 */
function plusAfficherDialog() {
  localStorage.setItem("Afficher", "non")
}

/**
 * Quand la page charge il verifie sur il y a un message dans le stockage
 * Si il y a rien il ouvre le dialog
 */
window.onload = function verifierLePlusAfficher() {

  if (localStorage.getItem('Afficher') != "non") {
    var dialog = document.getElementById('dialog');
    dialog.showModal();
  }
}

cards.forEach(card => card.addEventListener('click',coup));

/**
 * Écrit dans le html le nombre de coup
 */
function coup(){
  carteTourne.innerText = "Nombre de carte tournée : " + nbcoups;
}

/**
 * Valide si il la partie est fini
 * En regardant si il y a 6 pairs de trouvée
 * Écrie le record dans le html
 */
function validerRecord() {
  if (nbPair >= 6){

    if (localStorage.getItem('record') === null){
      localStorage.setItem('record', nbcoups);
    }
    
    if (nbcoups < localStorage.getItem('record')){
      localStorage.setItem('record', nbcoups);
    }
    afficherFin();
    fin.showModal();
  }
}

record.innerText = "Record : " + localStorage.getItem('record');

/**
 * Recommence le jeu
 */
function reinitialiser() {
  window.location.reload();
}

/**
 * Écrie dans le dialog de fin
 */
function afficherFin() {
  carteFin.innerText = nbcoups;
  recordFin.innerText = localStorage.getItem('record');
}