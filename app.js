//Getting access to the different inputs
let groceryLists = document.getElementById('groceryLists');
let btnAddNew = document.getElementById('addNewShop');
let seeAllOrders = document.getElementById('seeAllOrders')
let newShopTextBox = document.getElementById('newShopBox');
let groceryList = document.getElementById('groceryList');


//Creating an instance of firebase realtime database
const database = firebase.database();
//Create a node under the rootNode and call its Items
const marketsRef = database.ref("markets");

let markets = [] //An empty array to hold all the grocery lists

btnAddNew.addEventListener('click',function(){
    let newShopTitle = newShopTextBox.value 
    let newShop = {title : newShopTitle}
    
    //create an object to hold the title
saveMarket(newShop)

});


function saveMarket(newShop){
    console.log("I am working")
    marketsRef.child(newShop.title).set(newShop)
};


function addNewGroceries(btn, new_shop) {

    let groceryItemTitle = btn.previousElementSibling.value
    
    let itemsRef = marketsRef.child(new_shop).child("items")
    itemsRef.child(groceryItemTitle).set({
        title: groceryItemTitle})
    };

function displayMarkets(){
    console.log("Hey cutie patuti")
    let liItems = markets.map(function(newShop){
        return `<li>
        <label>newShopTitle</label>
        <input type="text" placeholder = "Enter grocery item" />
        <button onclick="addNewGroceries(this),'${newShop.title}')">Save Grocery Item</button>
        </li>`
    })

   groceryList.innerHTML = liItems.join('');
};


function configureObservers(){
    console.log("Hellu cutie")
    marketsRef.on('value', function(snapshot){
        markets = []
        snapshot.forEach(function(childSnapshot){
            // console.log(childSnapshot.key)
            console.log(childSnapshot.val())
            console.log(groceryList)
        markets.push(childSnapshot.val())
        })

        //display categories on the screen
        displayMarkets()
    })
}

seeAllOrders.addEventListener('click',function() {
    configureObservers()
})


