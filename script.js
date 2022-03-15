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
  title.classList.add("title");
  title.innerHTML = book.title;
  let author = document.createElement("div");
  author.classList.add("author");
  author.innerHTML = book.author;
  let pages = document.createElement("div");
  pages.classList.add("pages");
  pages.innerHTML = book.pages + " pages";
  let read = document.createElement("button");
  book.readYet() == "read" ? read.classList.add("read") : read.classList.add("not-read")
  read.innerHTML = book.readYet();
  let remove = document.createElement("button");
  remove.classList.add("remove");
  remove.innerHTML  = "Remove";
  [title, author, pages, read, remove].forEach(element => bookCard.appendChild(element));
  let libraryContainer = document.querySelector(".library-container");
  libraryContainer.appendChild(bookCard);
}

function displayBookNew(book){
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

  for (i = 0; i < 5; i ++){
    bookDivs[i].classList.add(classes[i]);
    bookDivs[i].innerHTML = divText[i];
    bookCard.appendChild(bookDivs[i]);
  }

  document.querySelector(".library-container").appendChild(bookCard);
}

myLibrary.forEach(book => displayBookNew(book));