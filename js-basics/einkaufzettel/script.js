// Elemente HTML

const inputArtikel =  document.querySelector("#item-input");
const addButton = document.querySelector("#add-button");
const shoppingList = document.querySelector("#shopping-list");
const statusText = document.querySelector("#status-text");
const filterList = document.querySelector("#category-select");


console.log(inputArtikel, addButton, shoppingList, statusText);
updateStatus();
//addButton logik

addButton.addEventListener("click", function(){
    inputArtikel.style.border = "1px solid grey";
    const Artikel = inputArtikel.value;
    const filter = filterList.value;

    if(Artikel.trim() === ""){
        inputArtikel.style.border = "1px solid red";
        statusText.textContent = "Pleas fill the form";
       // updateStatus();
        return;
    }

    // li als const...
    //text nehmen von Input
    //an shopping-list mit appendchild
    const li = document.createElement("li");
    li.textContent = `Name artikel: ${Artikel} category:${filter}`;
    const eraseButton = document.createElement("button");
    eraseButton.textContent = "x";
    eraseButton.classList.add("delete-btn");
    eraseButton.addEventListener("click", function(){
        li.remove();
        // aktualisierung updateStatus
        updateStatus();
    })
    li.appendChild(eraseButton)
    shoppingList.appendChild(li);
    inputArtikel.value = "";
    updateStatus();
    
})

function updateStatus(){
    const count = shoppingList.children.length
    if(count === 0){
        statusText.textContent = "Die Einkaufliste ist leer";
    }else{
        statusText.textContent = count +  " Artikel auf der Liste"
    }
}