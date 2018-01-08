/*
 * Create a list that holds all of your cards
 */
let defaultCards = ["fa-diamond", "fa-paper-plane-o", "fa-anchor", "fa-bolt", "fa-cube", "fa-leaf", "fa-bicycle", "fa-bomb",
    "fa-diamond", "fa-paper-plane-o", "fa-anchor", "fa-bolt", "fa-cube", "fa-leaf", "fa-bicycle", "fa-bomb"];

let triedCards = [];
let matchedCount = 0;
let hasStarted = false;
let canOpenCard = false;
let movedCount = 0;
let currentStars = 3;
let timer;
let secondCount = 0;
const restartDOM = document.querySelector(".restart");
const timesDOM = document.querySelector(".times");
const deckDOM = document.querySelector(".deck");
const moveDOM = document.querySelector(".moves");
const starsDOM = document.querySelector(".stars").getElementsByTagName("i");
restartDOM.addEventListener("click", startGame);
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
/**
 * @description resetGame to initial state
 */
function resetGame() {
    updateStars();
    moveDOM.innerText = movedCount;
    const cardElements = document.getElementsByClassName("card");
    for (let cardIndex = 0; cardIndex < cardElements.length; cardIndex++) {
        cardElements[cardIndex].remove();
        cardIndex--;
    }
}
/**
 * @description generate card using suffle method
 */
function generateCards() {
    const gameCards = shuffle(defaultCards);
    for (let card of gameCards) {
        deckDOM.append(createCard(card));
    }
}
/**
 * @description create card element
 */
function createCard(card) {
    let newLi = document.createElement('li');
    newLi.classList.add("card");
    let newI = document.createElement('i');
    newI.classList.add("fa", card);
    newLi.appendChild(newI);
    newLi.addEventListener("click", onCardClick);
    return newLi;
}
/**
 * @description event for clicking in card
 */
function onCardClick(evt) {

    const openedCard = evt.target;
    if (!canOpenCard || openedCard.classList.contains("match") || openedCard.classList.contains("open show")) {
        return;
    }
    movedCount++;
    updateStars();
    moveDOM.innerText = movedCount;
    openShowCard(evt.target);
    if (triedCards.length < 1) {
        triedCards.push(openedCard);
    } else {
        const firstCardTried = triedCards[0].firstChild;
        const secondCardTried = triedCards[1].firstChild;
        if (firstCardTried.getAttribute("class") === secondCardTried.getAttribute("class")) {
            for (let card of triedCards) {
                card.setAttribute("class", "card match");
            }
            triedCards = [];
            matchedCount++;
            if (matchedCount === 8) {
                winMatch();
            }
        } else {
            canOpenCard = false;
            setTimeout(() => {
                for (let card of triedCards) {
                    card.setAttribute("class", "card");
                }
                triedCards = [];
                canOpenCard = true;
            }, 1000);
        }
    }
}
/**
 * @description update number of stars
 */
function updateStars() {
    let mUpdateStars = 0;
    if (movedCount < 30) {
        mUpdateStars = 3;
    } else if (movedCount < 50) {
        mUpdateStars = 2;
    } else {
        mUpdateStars = 1;
    }

    if (mUpdateStars === currentStars) {
        return;
    }

    for (let i = 0; i < starsDOM.length; i++) {
        if (i + 1 < currentStars) {
            starsDOM[i].setAttribute("class", "fa fa-star");
        } else {
            starsDOM[i].setAttribute("class", "fa fa-star-o");
        }
    }

}
/**
 * @description change UI screen when user win the game
 */
function winMatch() {
    if (timer) {
        clearInterval(timer);
    }
    alert("You won the game in  " + secondCount + " seconds. You received " + currentStars + " stars for this game. CONGRATULATION, click Restart Button to play again");
}


/**
 * @description add open show to Card to change the card style
 */
function openShowCard(card) {
    card.classList.add("open");
    card.classList.add("show");
    triedCards.push(card);
}

/**
 * @description using setInterval to run every second
 */
function startTimer() {

    if (timer) {
        clearInterval(timer);
    }
    timer = setInterval(countTimer, 1000);
}

/**
 * @description run everysecond to update the time
 */

function countTimer() {
    secondCount++;
    timesDOM.innerText = secondCount;
}
/**
 * @description start game, when first launch site or click restart
 */
function startGame() {
    hasStarted = true;
    matchedCount = 0;
    movedCount = 0;
    canOpenCard = true;
    triedCards = [];
    currentStars = 3;
    secondCount = 0;
    resetGame();
    startTimer();
    updateStars();
    generateCards();


}

startGame();

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
