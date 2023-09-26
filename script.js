import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, remove, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

let inputEl = document.getElementById("input-el")
let buttonEL = document.getElementById("button-el")
let ulEl = document.getElementById("ul-el")


//initialise app
let appSettings = {
    databaseURL: "https://check-reader-b24d1-default-rtdb.asia-southeast1.firebasedatabase.app/"
}
const app = initializeApp(appSettings)
let database = getDatabase(app)
let booksInDb = ref(database, "books")

buttonEL.addEventListener("click", function(){
    
    let inputVal = inputEl.value

    push(booksInDb, inputVal)
    inputEl.value = ""
})

onValue(booksInDb, function(snapshot){
    if (snapshot.exists()) {
        let booksArray = Object.entries(snapshot.val())

        clearContent()
    
        for (let i = 0; i < booksArray.length; i++){
            let currentShelf = booksArray[i]
            let bookId = currentShelf[0]
            let bookValue = currentShelf[1]

            renderBooks(currentShelf)
            console.log(booksArray[i])
        }
    }else {
        ulEl.innerHTML = "Nothing here yet ..."
    }
  
   



})


function renderBooks(array) {
    let itemID = array[0]
    let itemValue = array[1] 

    let li = document.createElement("li")
    li.textContent = itemValue
    ulEl.append(li)

    li.addEventListener("click", function(){
        let itemToRemove = ref(database, `books/${itemID}`)
        remove(itemToRemove)
    })
}

function clearContent(){
    ulEl.innerHTML = " "
}



















































/*onValue(booksInDb, function(snapshot){
    let booksArray = Object.entries(snapshot.val())

    for (let i = 0; i < booksArray.length(); i++) {
        let currentBook = booksArray[i]
        let bookID = currentBook[0]
        let bookValue = currentBook[1]

        let li = document.createElement("li")
        li.textContent = bookValue
        ulEl.append(li)

        li.addEventListener("click", function()
        {
            let bookToBeRemovedInDb = ref(database, `books/${bookID}`)
        })
        


    }
})
*/
