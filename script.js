class Book1{
  #title;
  #author;
  #pages;
  constructor(title, author, pages, read){
    this.#title = title;
    this.#author = author;
    this.#pages = pages;
    this.read = read;
  }

  get readYet(){
    return (this.read == "yes" ? "Read" : "Not Read")
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
  
  get info(){
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.readYet}`
  }
}

class Library1{
  #myLibrary;
  constructor(){
    this.#myLibrary = [];
  }

  addBookToLibrary(book){
    this.#myLibrary.push(book)
  }

  removeFromLibraryByIndex(index){
    this.#myLibrary.splice(index, 1);
  }
  get access(){
    return this.#myLibrary;
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
      this.read.checked ? this.read.value : "no"
    ]
  }

  #displayBook(newBook, library){
    let newBookCard = new bookCard(newBook, library)
    let cardContainer = newBookCard.element
    document.querySelector(".library-container").appendChild(cardContainer);
  }

  addBook(library){
    let title, author, pages, read;
    [title, author, pages, read] = this.#getFormInputs();
    let newBook = new Book1(title, author, pages, read)
    library.addBookToLibrary(newBook);
    this.#displayBook(newBook, library)
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

class bookCard{
  #indexDiv; #titleDiv; #authorDiv; #pagesDiv; #removeDiv;
  constructor(book, library){
    this.book = book;
    this.library = library;
    this.cardContainer = document.createElement("div");
    this.#indexDiv = document.createElement('div');
    this.#titleDiv = document.createElement("div");
    this.#authorDiv = document.createElement("div");
    this.#pagesDiv = document.createElement("div");
    this.readDiv = document.createElement("button");
    this.#removeDiv = document.createElement("button");
  }

  get #bookDivs(){
    return [
      this.#indexDiv,
      this.#titleDiv,
      this.#authorDiv,
      this.#pagesDiv,
      this.readDiv,
      this.#removeDiv
    ]
  }

  get #classes(){
    return ["index", "title", "author", "pages", "read", "remove"]
  }

  get #divText(){
    return[
      this.library.access.indexOf(this.book),
      this.book.title,
      this.book.author,
      this.book.pages + " pages",
      this.book.readYet,
      "Remove"
    ]
  }

  #applyClass(){
    this.#bookDivs.map((bookDiv, i) => bookDiv.classList.add(this.#classes[i]))
  }

  #insertText(){
    this.#bookDivs.map((bookDiv, i) => bookDiv.innerHTML = this.#divText[i])
  }

  #fillDivs(){
    this.#applyClass();
    this.#insertText();
  }

  #readButton(){
    this.book.read == "yes" ? this.book.read = 'no' : this.book.read = 'yes';
    this.readDiv.innerHTML = this.book.readYet
  }

  #remove(event){
    let index = parseInt(event.currentTarget.parentNode.querySelector('.index').innerHTML)
    this.library.removeFromLibraryByIndex(index);
    this.cardContainer.remove();
  }

  #createContainer(){
    this.cardContainer.classList.add("card-container");
    this.#fillDivs();
    this.#bookDivs.forEach(bookDiv => this.cardContainer.appendChild(bookDiv));
    this.readDiv.addEventListener("click", () => {this.#readButton()});
    this.#removeDiv.addEventListener("click", (event) => {this.#remove(event)});
  }

  get element(){
    this.#createContainer();
    return this.cardContainer;
  }
}

const main = (() => {
  let userLibrary = new Library1();
  let userBookForm = new bookForm();
  const addBookBtn = document.querySelector(".show-book-form");
  const closeFormBtn =  document.querySelector(".close-form");
  const addButton = document.querySelector(".add-book");
  const clearButton = document.querySelector(".clear-form");

  const run = () => {
    addBookBtn.addEventListener("click", () => {userBookForm.showBookForm()})
    closeFormBtn.addEventListener("click", () => {userBookForm.closeBookForm()})
    addButton.addEventListener('click', () => {userBookForm.addBook(userLibrary)})
    clearButton.addEventListener('click', () => {userBookForm.clearFormInputs()});
  }
  return {run}
})();

main.run();