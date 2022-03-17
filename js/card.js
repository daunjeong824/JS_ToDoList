/* Card var */
const toAddCard = document.querySelector(".card.to-add-card");
const cardList = document.querySelector(".card-list");
const deleteButton = document.querySelector(".delete-button");

const CARDS_KEY = "CARDS";
const COUNT_KEY = "counts";
let count = 0;
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
    localStorage.setItem(COUNT_KEY, count);
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
    
    /* Card Todo-list */
    // <구현> 만약 카드에 todo가 존재하면 렌더링, 아니면 ul 생성.
    const ul = document.createElement("ul");
    div.appendChild(ul);

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
    event.target.querySelector("input").value = "";
    const toPutCardCount = event.target.parentElement.id;
    newTodoObj = {
        text: newTodo,
        parent: toPutCardCount,
        id: Date.now()
    }
    let gotchaCard = cards.filter(card => card.id === parseInt(toPutCardCount))[0];
    gotchaCard.todo[gotchaCard.todo.length] = newTodoObj;
    paintTodo(newTodoObj);
    saveCard(cards);
}

const deleteTodo = (event) => {
    const toDeleteTodo = event.target.parentElement;
    console.log(toDeleteTodo);
    const toDeleteCardId = toDeleteTodo.parentElement.parentElement.id;
    console.log(toDeleteCardId);
    //1. 해당 부모 card 선택
    let toDeleteTodoCard = cards.filter(card => card.id === parseInt(toDeleteCardId))[0];
    toDeleteTodo.remove(); 
    //2. 부모 card에서 해당 todo 지우기
    toDeleteTodoCard.todo = toDeleteTodoCard.todo.filter(todo => todo.id !== parseInt(toDeleteTodo.id));
    //3. 지운 부모 card를 id 통해 cards로 갱신
    const cardIndex = cards.findIndex((card => card.id === parseInt(toDeleteTodoCard.id)));
    cards[cardIndex] = toDeleteTodoCard;

    saveCard(cards);
}

const paintTodo = (newTodoObj) => {
    const parentCard = document.getElementById(newTodoObj.parent);
    const cardUl = parentCard.children[2];
    const li = document.createElement("li");
    li.id = newTodoObj.id;
    const span = document.createElement("span");
    const button = document.createElement("button");

    button.innerText = "🗑"
    button.addEventListener("click", deleteTodo);
    span.innerText = newTodoObj.text;

    li.appendChild(span);
    li.appendChild(button);
    cardUl.appendChild(li);
}

toAddCard.addEventListener("click", makeCard);
/* Load Cards & count */
const savedCards = localStorage.getItem(CARDS_KEY);
const savedCount = localStorage.getItem(COUNT_KEY);

if(savedCount !== null) {
    parsedCount = JSON.parse(savedCount);
    count = parsedCount;
};
if (savedCards !== null) {
    parsedCard = JSON.parse(savedCards);
    cards = parsedCard;
    cards.forEach(paintCard);
}