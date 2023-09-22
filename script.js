import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, remove, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.j"

let inputEl = document.getElementById("input-el")
let buttonEL = document.getElementById("button-el")
let ulEl = document.getElementById("ul-el")
let inputVal = ""
//initialise app
const app = initializeApp("https://books-mobile-app-default-rtdb.asia-southeast1.firebasedatabase.app/")
let database = getDatabase(app)
let booksInDb = ref(database, "books")

buttonEL.addEventListener("click", function(){
    inputEl.value = ""
    inputVal = inputEl.value

    push(booksInDb, inputVal)
    
})

onValue(booksInDb, function(snapshot){
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

