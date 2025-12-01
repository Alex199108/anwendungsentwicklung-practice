// Elemente HTML

const inputArtikel =  document.querySelector("#item-input");
const addButton = document.querySelector("#add-button");
const shoppingList = document.querySelector("#shopping-list");
const statusText = document.querySelector("#status-text");
const filterList = document.querySelector("#category-select");
const map = {
    food: 0,
    hygiene:1,
    clothing:2,
    electro:3
};


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
    //li.textContent = `Name artikel: ${Artikel} category:${filter}`;                   try to improve layout on li for category
    const artikelName = document.createElement ("span");
    artikelName.classList.add("item-name");
    const artikelCategory = document.createElement("span");
    artikelCategory.classList.add("item-category"); 
    const eraseButton = document.createElement("button");
    artikelName.textContent = Artikel;
    artikelCategory.textContent = filter;
    eraseButton.textContent = "x";
    eraseButton.classList.add("delete-btn");
    eraseButton.addEventListener("click", function(){
        li.remove();
        // aktualisierung updateStatus
        updateStatus(); 
   
    })
     li.appendChild(artikelName);
    li.appendChild(artikelCategory);
    li.appendChild(eraseButton);
    for(let i = 0;i<shoppingList.children.length;i++){
        const existinLi = shoppingList.children[i];
        const existingCategoryText = existinLi.querySelector(".item-category").textContent;
        const existingCategory =existingCategoryText.toLowerCase();
       if(map[existingCategory]>map[filter]){
        shoppingList.insertBefore(li, existinLi);
        return;
       }
        
    }

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