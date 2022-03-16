/* Card var */
const toAddCard = document.querySelector(".card.to-add-card");
const cardList = document.querySelector(".card-list");
const deleteButton = document.querySelector(".delete-button");

const CARDS_KEY = "CARDS";
let count = 0; // 임시 변수
let cards = [];

/* Card Func */
const saveCard = (cards) => {
    localStorage.setItem(CARDS_KEY, JSON.stringify(cards));
}

const makeCard = () => {
    
    newCardObj = {
        todo: new Array(),
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
    
    /* Card */
    div.classList.add("card");
    deleteButton.classList.add("delete-button");
    div.appendChild(deleteButton);
    deleteButton.addEventListener("click", deleteCard);

    /* Card Form */
    const cardForm = document.createElement("form");
    const cardFormInput = document.createElement("input");
    cardFormInput.required = true;
    cardFormInput.type = "text";
    cardFormInput.placeholder = "Put todo";
    cardForm.appendChild(cardFormInput);
    div.appendChild(cardForm);
    cardForm.addEventListener("submit",handleTodo);

    /* Card insert */
    cardList.insertBefore(div, toAddCard);
}

const deleteCard = (event) => {
    const toDeleteCard = event.target.parentElement;
    toDeleteCard.remove();
    cards = cards.filter((card) => card.id !== parseInt(toDeleteCard.id));
    saveCard(cards);

}
/* Todo Func */
const handleTodo = (event) => {
    event.preventDefault();
    let newTodo = event.target.querySelector("input").value;
    const toPutCardCount = event.target.parentElement.id;
    newTodoObj = {
        text: newTodo,
        parent: toPutCardCount,
        id: Date.now()
    }
    let gotchaCard = cards.filter(card => card.id === parseInt(toPutCardCount))[0];
    gotchaCard.todo[gotchaCard.todo.length] = newTodoObj;
    //paintTodo(newTodoObj);
    saveCard(cards);
}

toAddCard.addEventListener("click", makeCard);

const savedCards = localStorage.getItem(CARDS_KEY);
if (savedCards !== null) {
    parsedCard = JSON.parse(savedCards);
    cards = parsedCard;
    cards.forEach(paintCard);
}
