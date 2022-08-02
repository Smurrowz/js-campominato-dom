

const grigliaElement = document.querySelector('.tabellone')
const diffChoice = document.getElementById('difficulty-choice')
const genButton = document.getElementById('gen-button')
const punteggioHtml = document.querySelector('.result')
const tutteLeCell = document.getElementsByClassName('square')
let bombArray = []
let punteggio = 0
let userTries




// genero il tabellone in base alla grandezza scelta
genButton.addEventListener('click', function(){
  gameReset()
  
  if(diffChoice.value === '1'){
    // se ha scelto facile allora la tabella sará 10x10
    gridGenerator(10)
    bombGenerator(100, bombArray)
    
    userTries = 100 - 16
    
    
    grigliaElement.classList.add('large')
  } else if(diffChoice.value === '2'){
    // se ha scelto medio allora la tabella sará 9x9
    gridGenerator(9)
    bombGenerator(81, bombArray)
    userTries = 81 - 16
    
    
    
    grigliaElement.classList.add('medium')
  } else if(diffChoice.value === '3'){
    // se ha scelto difficile allora la tabella sará 7x7
    gridGenerator(7)
    bombGenerator(49, bombArray)
    userTries = 49 - 16
    
    
    
    grigliaElement.classList.add('small')
  } else if(diffChoice.value === '4'){
    // se ha scelto molto difficile allora la tabella sará 6x6
    gridGenerator(6)
    bombGenerator(36, bombArray)
    userTries = 36 - 16
    
    
    grigliaElement.classList.add('extrasmall')
    
  }

  console.log(bombArray.sort((a, b) => a - b))
 
  
})



// creo la funzione per generare la griglia in base al dato inserito
function gridGenerator(dimensione){
  let numeroCelle = dimensione ** 2
  for(let i = 0; i < numeroCelle; i++){
    
    const cella = getSquareElement() 
    cella.innerHTML = i + 1
    // appendo la cella al tabellone
    grigliaElement.append(cella)
    
  }
}

// creo la funzione per generare le caselle e ci attacco gia' l'event listener
function getSquareElement() {
  const square = document.createElement('div')
  square.classList.add('square')
  square.addEventListener('click', clickHandler)  
  
  return square
}
// creo la funzione che mi andra' a gestire i click nelle celle
function clickHandler(){
  // in questo caso this e' uguale a cio' che clickiamo 
  const square = this
  const numeroCella = parseInt(this.innerHTML) 
  if (bombArray.includes(numeroCella)){
    this.classList.add('bomb')
    gameOver()
   
  } else {
    this.classList.add('safe')
    punteggio++
    if ( userTries - punteggio === 0 ){
      gameWin()
    }
    punteggioHtml.innerHTML = "punteggio: " + punteggio 
  }
  // rendo la cella non clickabile piu' di una volta perché quando viene invocato l'addeventlistener gli levo l'event listener 
  square.removeEventListener('click', clickHandler)
  
}


function bombGenerator(numeroDiCaselle, bombArray){
  // genero un array di bombe
  
  while (bombArray.length < 16 ){
    const randomNumber = Math.floor(Math.random() * numeroDiCaselle) + 1
    if (bombArray.includes(randomNumber)){
    }else{
      bombArray.push(randomNumber)
    }
}
  return bombArray
  
}


function gameOver(){
  alert("hai perso")
  console.log("il tuo punteggio finale é " + punteggio)
  grigliaElement.classList.add('gameover')
  punteggioHtml.innerHTML = "punteggio finale: " + punteggio 
  const celleList = document.querySelectorAll('.square')
  for(  let i = 0; i < celleList.length; i ++){
    const  cellaCorrente = celleList[i]
    if(isBomb(cellaCorrente)){
      cellaCorrente.classList.add('bomb')
    }
  }
 
  
  
  
  
  
}
function gameWin(){
  alert("hai vinto")
  grigliaElement.classList.add('gameover')
  punteggioHtml.innerHTML = "punteggio finale: " + punteggio 
}

function gameReset(){
    // pulisco la console,l'HTML e tolgo eventuali classi se hai gia' generato
    console.clear()
    punteggio = 0
    grigliaElement.innerHTML = ""
    grigliaElement.classList.remove('small', 'medium', 'large', 'extrasmall', 'gameover')
    bombArray = []
    punteggioHtml.innerHTML = 'punteggio: '
}
 function isBomb(cella){
  const numeroCella = parseInt(cella.innerHTML)
    if(bombArray.includes(numeroCella)){
      return true
    }

  

  }
 
  
