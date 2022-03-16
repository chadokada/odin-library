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

let myLibrary = [];

function addBookToLibrary(book){
  myLibrary.push(book)
}

/* Manually added books to test code*/

let book1 = new Book("The Hobbit", "J.R.R. Tolkien", "295", "no");
let book2 = new Book("The Grapes of Wrath", "John Steinbeck", "464", "yes");
let book3 = new Book("Understanding Power: The Indispensable Chomsky", "Noam Chomsky",
  "435", "yes");
let book4 = new Book("Neuromancer", "William Gibson", "292", "no");

addBookToLibrary(book1);
addBookToLibrary(book2);
addBookToLibrary(book3);
addBookToLibrary(book4);

function displayBook(book){
  let bookCard = document.createElement("div");
  bookCard.classList.add("book-card");

  let title = document.createElement("div");
  let author = document.createElement("div");
  let pages = document.createElement("div");
  let read = document.createElement("button");
  let remove = document.createElement("button");

  let bookDivs = [title, author, pages, read, remove];

  let classes = ["title", "author", "pages", 
    book.readYet().toLowerCase().replace(" ", "-"), "remove"];

  let divText = [book.title, book.author, book.pages + " pages", book.readYet(),
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

//myLibrary.forEach(book => displayBookNew(book));

function displayLibrary(){
  for (let book of myLibrary){
    displayBook(book);
  }
}

function getFormInputs(){
  return [document.querySelector('input[name="title"]').value,
          document.querySelector('input[name="author"]').value,
          document.querySelector('input[name="pages"]').value,
          document.querySelector('input[name="read"]:checked').value
        ]
}

function clearFormInputs(){
  document.querySelector('input[name="title"]').value = "";
  document.querySelector('input[name="author"]').value = "";
  document.querySelector('input[name="pages"]').value = "";
  document.querySelector('input[name="read"]:checked').checked = false;
}

const addButton = document.querySelector(".add-book");

addButton.addEventListener('click', () => {
  [title, author, pages, read] = getFormInputs();
  let newBook = new Book(title, author, pages, read);
  addBookToLibrary(newBook);
  clearFormInputs();
});

const clearButton = document.querySelector(".clear-form");

clearButton.addEventListener('click', () => {
  clearFormInputs();
});