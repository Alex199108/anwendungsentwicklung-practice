// Elemente HTML

const inputArtikel =  document.querySelector("#item-input");
const addButton = document.querySelector("#add-button");
const shoppingList = document.querySelector("#shopping-list");
const statusText = document.querySelector("#status-text");
const filterList = document.querySelector("#category-select");
const deletedTitle = document.querySelector("#deleted-title");
const deletedList = document.querySelector("#geloeschte-artikel");
const map = {
    food: 0,
    hygiene:1,
    clothing:2,
    electro:3
};


console.log(inputArtikel, addButton, shoppingList, statusText);
updateStatus();
updateDeletedTitle();
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
    
    const artikelName = document.createElement ("span");
    artikelName.classList.add("item-name");
    const artikelCategory = document.createElement("span");
    artikelCategory.classList.add("item-category"); 
   //----("button"); checkbox stadt deletButton----
    const doneCheckbox = document.createElement("input");
    doneCheckbox.type = "checkbox";
    doneCheckbox.classList.add("done-checkbox");

    artikelName.textContent = Artikel;
    artikelCategory.textContent = filter;
  // Checbox fuer listen... checkbox on = 
    doneCheckbox.addEventListener("change", function(){
        const categoryText = li.querySelector(".item-category").textContent;
        if(doneCheckbox.checked){
            insertSorted(deletedList,li,categoryText);
        }else{
            insertSorted(shoppingList,li,categoryText);
        }
        updateStatus();
        updateDeletedTitle();
        
       
        // neue implementierung...sortierung 
   
    });
     li.appendChild(artikelName);
    li.appendChild(artikelCategory);
    li.appendChild(doneCheckbox);
   
   
    insertSorted(shoppingList,li,filter);
   
    
    inputArtikel.value = "";
    updateStatus();
    updateDeletedTitle();
    
});

function updateStatus(){
    const count = shoppingList.children.length
    if(count === 0){
        statusText.textContent = "Die Einkaufliste ist leer";
    }else{
        statusText.textContent = count +  " Artikel auf der Liste"
    }
}
function updateDeletedTitle(){
    if(deletedList.children.length === 0){
        deletedTitle.style.display = "none"
    }else{
        deletedTitle.style.display = "block"
    };
}
function insertSorted(targetList, li, category){
    const categoryLower = category.toLowerCase();
    const newRank = map[categoryLower];
    for(let i = 0;i<targetList.children.length;i++){
        const existinLi = targetList.children[i];
        const existingCategoryText = existinLi.querySelector(".item-category").textContent;
        const existingCategoryLower = existingCategoryText.toLowerCase();
        const existingRank = map[existingCategoryLower];
        if(existingRank>newRank){
        targetList.insertBefore(li, existinLi);
        return;
    }
    }
    
    targetList.appendChild(li);

};