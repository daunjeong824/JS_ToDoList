/* Card var */
const toAddCard = document.querySelector(".card.to-add-card");
const cardList = document.querySelector(".card-list");
const deleteButton = document.querySelector(".delete-button");

const CARDS_KEY = "CARDS";
let count = 1; // 임시 변수
let cards = [];

/* Card Func */
const saveCard = (cards) => {
    localStorage.setItem(CARDS_KEY, JSON.stringify(cards));
}

const makeCard = () => {
    
    newCardObj = {
        todo: `hello, ${count}`,
        id : count
    }
    count += 1;
    cards.push(newCardObj);

   paintCard(newCardObj);
   saveCard(cards);

};


const paintCard = (newCardObj) => {
    const div = document.createElement("div");
    div.id = newCardObj.id;
    const deleteButton = document.createElement("button");
    

    div.classList.add("card");
    deleteButton.classList.add("delete-button");
    div.appendChild(deleteButton);
    deleteButton.addEventListener("click", deleteCard);

    cardList.insertBefore(div, toAddCard);
}

const deleteCard = (event) => {
    const toDeleteCard = event.target.parentElement;
    toDeleteCard.remove();
    console.log(toDeleteCard.id);
    cards = cards.filter((card) => card.id !== parseInt(toDeleteCard.id));
    saveCard(cards);

}

toAddCard.addEventListener("click", makeCard);
// deleteButton.addEventListener("click", deleteCard); // for 1st card

const savedCards = localStorage.getItem(CARDS_KEY);
if (savedCards !== null) {
    parsedCard = JSON.parse(savedCards);
    cards = parsedCard;
    cards.forEach(paintCard);
}
