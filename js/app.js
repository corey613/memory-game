
const cards = document.querySelectorAll('.memoryCard');// selecting all the cards
const reset = document.querySelector('#reset');
const start = document.querySelector('#startContainer');
const game = document.querySelector('.memoryGame');
const pointCount = document.querySelector('#pointCount')
const timeLeftDisplay = document.querySelector('#num')
const startBtn = document.querySelector('#button')
const timerContainer = document.querySelector('#count');
const wellDone = document.querySelector('#how');
const finishDesc = document.querySelector('#instructions');
const resetBtn = document.querySelector('#reset');


let hasCardFlipped = false;
let firstCard, secondCard;
let boardLocked = false;

let timeLeft = 45;
let points = 0;



function countDown(){

    var timer = setInterval(function(){
        timeLeftDisplay.innerHTML = --timeLeft; 
       

        if(timeLeft <= 0){
            clearInterval(timer);
            gameFinish();
            wellDone.innerHTML= 'Better luck next time!';
            finishDesc.innerHTML= 'Oh No! you did not match all 6 pairs in time, would you like to try again?';
        }

        if(points == 6){
            clearInterval(timer);
            timeLeft = 45;
            timeLeftDisplay.innerHTML = 45;
            gameFinish();
            points = 0;
        }
    }, 1000)


    
}

document.addEventListener("DOMContentLoaded", mix);

function mix(){     // mixes the card every reload 
    cards.forEach(card => {
        let randomOrder = Math.floor(Math.random() * 12); // gives each card a random positiioning order 
        card.style.order = randomOrder; // adding random flex order 
    });
};  
 




startBtn.addEventListener('click', () => {
    countDown();
    start.style.display = 'none'; // removes start game container
    game.style.display = 'flex'; // adds game container
});




cards.forEach(card => card.addEventListener('click', flipCard)); // adds click listener for all cards 








function flipCard(){ // function for when player clicks on a card
    if (boardLocked) return; // rest of the code wont be exectued if this is true
    if (this === firstCard) return; // if first card is double clicked this would equal the second card and would then return from the function
    
    this.classList.add('flip'); // when clicked adds the class flipped which turns card around

    if(!hasCardFlipped){  // first time player has clicked a card 

        hasCardFlipped = true;
        firstCard = this;  // this is the first card

        return;
    } 
        // second click on a card
        hasCardFlipped = false;
        secondCard = this; 

        matchCheck(); 

}

function stopCards(){ // removes the ability to flip card again
    firstCard.removeEventListener('click', flipCard) 
    secondCard.removeEventListener('click', flipCard)
    boardReset();
}

function unflipCards(){ // if cards are not a match
        boardLocked = true; // if not a match 
        setTimeout( () => {
            firstCard.classList.remove('flip');
            secondCard.classList.remove('flip');
           

            boardReset(); // will unlock the board once cards have flipped over 
        }, 1200);
} 



function addPoints(){ // adds one point if a pair is found
    points++;
    pointCount.innerHTML = points;
}


function matchCheck(){  // check if the cards match

    let isMatch = firstCard.dataset.animal === secondCard.dataset.animal; // if first card has the same dataset as second card then it is a match

    isMatch ? stopCards() : unflipCards();
   
    if(isMatch){
        addPoints(); // adds one point if a pair is found 
    }

}

function boardReset(){
    [hasCardFlipped, boardLocked] = [false, false];
    [firstCard, secondCard] = [null, null];
}



function gameFinish(){
    game.style.display='none';
    start.style.display='flex';
    wellDone.innerHTML= 'Congratulations!!!';
    startBtn.style.display= 'none';
    resetBtn.style.display= 'block';
    finishDesc.innerHTML= 'Well Done, you matched up all 6 pairs!';
    finishDesc.style.margin='40px 0';
}



resetBtn.addEventListener('click', resetGame);


function resetGame(){
    location.reload();
return false;
}
