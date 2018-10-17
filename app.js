//Getting access to the different inputs
let groceryLists = document.getElementById('groceryLists');
let btnAddNew = document.getElementById('addNew');
let newShopTextBox = document.getElementById('newShopBox');
let newItemTextBox = document.getElementById('newItemBox');
let list = document.createElement('li')

//Creating an instance of firebase realtime database
const database = firebase.database();
//Create a node under the rootNode and call its Items
const shoppingRef = database.ref();

let groceries = [] //An empty array to hold all the grocery lists

btnAddNew.addEventListener('click',function(){

    let newShop = newShopTextBox.value 
    let newItem = newItemTextBox.value
    // list.appendChild(newItem)

    //create a grocery list value
    let groceryList = {Shop: newShop, Item : newItem};

    addNewGroceries(groceryList);

});

function addNewGroceries(groceryList){
    
    let shopRef = shoppingRef.child(groceryList.Shop)
    shopRef.set({
        name : groceryList.Shop, 
        items : [groceryList.Item]
    })

    //database.ref(groceryList.Shop).set(groceryList.Item)

};
