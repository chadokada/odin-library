class Book1{
  #title;
  #author;
  #pages;
  #read;
  constructor(title, author, pages, read){
    this.#title = title;
    this.#author = author;
    this.#pages = pages;
    this.#read = read;
  }
  get readYet(){
    return (this._read == "yes" ? "Read" : "Not Read")
  }
  get title(){
    return this.#title;
  }
  get author(){
    return this.#author;
  }
  get pages(){
    return this.#pages;
  }
  get read(){
    return this.#read;
  }
  get info(){
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.readYet}`
  }
}

class Library1{
  constructor(){
    this.myLibrary = [];
  }

  addBookToLibrary(book){
    this.myLibrary.push(book)
  }

  removeFromLibraryByIndex(index){
    myLibrary.splice(index, 1);
  }
}

class bookForm{
  constructor(){
    this.bookForm = document.querySelector('.new-book-form');
    this.overlay = document.querySelector('.overlay');
    this.title = document.querySelector('input[name="title"]');
    this.author = document.querySelector('input[name="author"]');
    this.pages = document.querySelector('input[name="pages"]');
    this.read = document.querySelector('input[name="read"]');
  }
  showBookForm(){
    this.bookForm.style.display = "grid";
    this.overlay.style.display = "block";
  }
  closeBookForm(){
    this.bookForm.style.display = "none";
    this.overlay.style.display = "none";
  }
  #getFormInputs(){
    return [
      this.title.value, 
      this.author.value, 
      this.pages.value, 
      this.read.checked? this.read.value : "no"
    ]
  }
  addBook(library){
    let title, author, pages, read;
    [title, author, pages, read] = this.#getFormInputs();
    let newBook = new Book1(title, author, pages, read)
    library.addBookToLibrary(newBook);
    displayController.displayBook(newBook);
    this.clearFormInputs();
    this.closeBookForm();
  }
  clearFormInputs(){
    this.title.value = "";
    this.author.value = "";
    this.pages.value = "";
    this.read.checked ? this.read.checked = false : null;
  }
}


const displayController = (() => {
  const displayBook = (book) => {
    let bookCard = document.createElement("div");
    bookCard.classList.add("book-card");

    let index = document.createElement('div');
    let title = document.createElement("div");
    let author = document.createElement("div");
    let pages = document.createElement("div");
    let read = document.createElement("button");
    let remove = document.createElement("button");

    let bookDivs = [index, title, author, pages, read, remove];

    let classes = ["index", "title", "author", "pages", 
      'read', "remove"];

    let divText = [myLibrary.indexOf(book),
                  book.title, 
                  book.author, 
                  book.pages + " pages", 
                  book.readYet,
                  "Remove"];

    i = 0
    for (let bookDiv of bookDivs){
      bookDiv.classList.add(classes[i]);
      bookDiv.innerHTML = divText[i];
      bookCard.appendChild(bookDiv);
      i = i + 1;
    }
    document.querySelector(".library-container").appendChild(bookCard);
  }
  return {
    displayBook
  }
})();


let userLibrary = new Library1();


const addBookBtn = document.querySelector(".show-book-form");
const closeFormBtn =  document.querySelector(".close-form");
const addButton = document.querySelector(".add-book");
const clearButton = document.querySelector(".clear-form");

let userBookForm = new bookForm()

addBookBtn.addEventListener("click", () => {userBookForm.showBookForm()})
closeFormBtn.addEventListener("click", () => {userBookForm.closeBookForm()})
addButton.addEventListener('click', () => {userBookForm.addBook(userLibrary)})
clearButton.addEventListener('click', () => {userBookForm.clearFormInputs()});




//
// ==========================================================================
// OLD CODE
//

function Book(title, author, pages, read){
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.readYet = function(){
  return (this.read == "yes" ? "Read" : "Not Read")
};

Book.prototype.info = function(){
  return `${this.title} by ${this.author}, ${this.pages} pages, ${this.readYet()}`
};



/* Sample Books
  new Book("The Hobbit", "J.R.R. Tolkien", "295", "no");
  new Book("The Grapes of Wrath", "John Steinbeck", "464", "yes");
  new Book("Understanding Power: The Indispensable Chomsky", "Noam Chomsky","435", "yes");
  new Book("Neuromancer", "William Gibson", "292", "no");
*/

//
// Library  Functions
//

let myLibrary = [];

function addBookToLibrary(book){
  myLibrary.push(book)
}

function removeFromLibraryByIndex(index){
  myLibrary.splice(index, 1);
}



function hideLibrary(){ //Put in a display object?
  libContainer = document.querySelector(".library-container");
  while (libContainer.firstChild){
    libContainer.removeChild(libContainer.firstChild);
  }
}

function displayLibrary(){
  hideLibrary();
  for (let book of myLibrary){
    displayBook(book);
  }
  removeBtnListener() // To activate event listener for book Remove buttons
  readBtnListner() // To activate event listner for book Read/Unrerad buttons
}

function displayBook(book){
  let bookCard = document.createElement("div");
  bookCard.classList.add("book-card");

  let index = document.createElement('div');
  let title = document.createElement("div");
  let author = document.createElement("div");
  let pages = document.createElement("div");
  let read = document.createElement("button");
  let remove = document.createElement("button");

  let bookDivs = [index, title, author, pages, read, remove];

  let classes = ["index", "title", "author", "pages", 
    'read', "remove"];

  let divText = [myLibrary.indexOf(book),book.title, book.author, book.pages + " pages", book.readYet(),
    "Remove"];

  i = 0
  for (let bookDiv of bookDivs){
    bookDiv.classList.add(classes[i]);
    bookDiv.innerHTML = divText[i];
    bookCard.appendChild(bookDiv);
    i = i + 1;
  }
  document.querySelector(".library-container").appendChild(bookCard);
}

//function getFormInputs(){
//  return [document.querySelector('input[name="title"]').value,
//          document.querySelector('input[name="author"]').value,
//          document.querySelector('input[name="pages"]').value,
//          (document.querySelector('input[name="read"]:checked') ?
//            document.querySelector('input[name="read"]:checked').value:
//            "no"
//            )
//        ]
//}

//function clearFormInputs(){
//  document.querySelector('input[name="title"]').value = "";
//  document.querySelector('input[name="author"]').value = "";
//  document.querySelector('input[name="pages"]').value = "";
//  if (document.querySelector('input[name="read"]:checked')){
//    document.querySelector('input[name="read"]:checked').checked = false 
//  } 
//}

//
// To pop up Add a Book form
//

//const showBookFormBtn = document.querySelector(".show-book-form");
//const bookForm = document.querySelector('.new-book-form');
//const overlay = document.querySelector('.overlay');

/*
showBookFormBtn.addEventListener('click', () => {
  bookForm.style.display = "grid";
  overlay.style.display = "block";
})
*/

//
// Functionality for Add a Book form
//


//function closeBookForm(){ //
//  bookForm.style.display = "none";
//  overlay.style.display = "none";
//}

//const addButton = document.querySelector(".add-book");

/**********************
addButton.addEventListener('click', () => {
  [title, author, pages, read] = getFormInputs();
  let newBook = new Book(title, author, pages, read);
  addBookToLibrary(newBook);
  clearFormInputs();
  closeBookForm();
  displayLibrary();
});
****************************/

//const clearButton = document.querySelector(".clear-form");
//clearButton.addEventListener('click', () => {
//  clearFormInputs();
//});

//const closeForm =  document.querySelector(".close-form"); //
//closeForm.addEventListener('click', () => {
//  closeBookForm()
//})




//
// Functionality for Book card
//

function removeBtnListener(){
  if (document.querySelectorAll(".remove")){
    let removeButtons = document.querySelectorAll(".remove");
    removeButtons.forEach(removeButton =>
      removeButton.addEventListener('click', (event) => {
        index = parseInt(
            event.currentTarget.parentNode.querySelector('.index').innerHTML
        );
        removeFromLibraryByIndex(index);
        displayLibrary();
      })
    )
  }
}

function readBtnListner(){
  if (document.querySelectorAll(".read")){
    let readButtons = document.querySelectorAll(".read");
    readButtons.forEach(readButton => 
      readButton.addEventListener('click', (event) => {
        index = parseInt(
          event.currentTarget.parentNode.querySelector('.index').innerHTML
          )
        myLibrary[index].read == 'yes' ? 
          myLibrary[index].read = "no" : 
          myLibrary[index].read = "yes";
        displayLibrary();
        }
      )
    )
  }
}