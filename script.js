
class Book {
    #title;
    get title() {
        return this.#title;
    }
    #author;
    get author() {
        return this.#author;
    }
    #pages;
    get pages() {
        return this.#pages;
    }
    #read = false;
    get read() {
        return this.#read;
    }
    set read(value) {
        this.#read = value;
    }
    constructor(title, author, pages, read) {
        this.#title = title;
        this.#author = author;
        this.#pages = pages;
        this.#read = read;

    }
    equals(book) {
        if(this.title === book.title && this.author === book.author && this.pages === book.pages) {
            return true;
        }
        else {
            return false;
        }     
    }
}

const library = [];
function addBookToLibrary(book) {
    library.push(book);
    createCards(library);
}
function removeBook(event) {
    const parent = event.target.parentElement;
    const title = parent.querySelector(".title").textContent;
    const author = parent.querySelector(".author").textContent;
    const pages = parent.querySelector(".pages").textContent;
    const book = new Book(title, author, pages);

    const toRemove = library.findIndex((element)=>{
        return element.equals(book);
    });
    library.splice(toRemove, 1);
    createCards(library);
}
function setStatus(book, statusBtn) {
    if(book.read === true) {
        statusBtn.textContent = "Read";
        statusBtn.classList.add("read");
    }
    else {
        statusBtn.textContent = "Not Read";
        statusBtn.classList.remove("read");
    }
}
function changeStatus(event) {
    const parent = event.target.parentElement;
    const title = parent.querySelector(".title").textContent;
    const author = parent.querySelector(".author").textContent;
    const pages = parent.querySelector(".pages").textContent;
    const book = new Book(title, author, pages);

    const toChange = library.findIndex((element)=>{
        return element.equals(book);
    });
    library[toChange].read = !library[toChange].read;
    setStatus(library[toChange], event.target);

}
function createCards(library) {
    books.textContent = "";
    library.forEach((element)=>{
        const card = document.createElement("div");
        card.classList.add("card");

        const titleArea = document.createElement("div");
        titleArea.classList.add("title");
        titleArea.textContent = element.title;
        card.appendChild(titleArea);

        const authorArea = document.createElement("div");
        authorArea.classList.add("author");
        authorArea.textContent = element.author;
        card.appendChild(authorArea);

        const pagesArea = document.createElement("div");
        pagesArea.classList.add("pages");
        pagesArea.textContent = element.pages;
        card.appendChild(pagesArea);

        const statusBtn = document.createElement("button");
        statusBtn.setAttribute("id", "status");
        setStatus(element, statusBtn);
        statusBtn.addEventListener("click", changeStatus)
        card.appendChild(statusBtn);

        const removeBtn = document.createElement("button");
        removeBtn.textContent = "Remove";
        removeBtn.setAttribute("id", "removeBtn");
        removeBtn.addEventListener("click", removeBook);
        card.appendChild(removeBtn);

        books.appendChild(card);

    })
}
function submitBook(event) {
    event.preventDefault();
    if(title.reportValidity() && author.reportValidity() && pages.reportValidity()) {
        const book = new Book(title.value, author.value, pages.value, read.checked);
        addBookToLibrary(book);
        console.log(library);
        read.checked = false;
        title.value = "";
        author.value = "";
        pages.value = "";
        closeContainer()
    }
}

const formContainer = document.querySelector(".form-container");
const addBookBtn = document.querySelector(".add-book button");
const form = document.querySelector("form");
const submitFormBtn = form.querySelector("button");

const title = form.querySelector("#titleInput");
const author = form.querySelector("#authorInput");
const pages = form.querySelector("#pagesInput");
const read = form.querySelector("#readInput");

const books = document.querySelector(".books");
function openContainer() {
    formContainer.classList.add("active");
}
function closeContainer() {
    //if(event.target === formContainer) {
    formContainer.classList.remove("active");
    title.value="";
    author.value="";
    pages.value="";
    read.checked = false;

}
addBookBtn.addEventListener("click", openContainer);
formContainer.addEventListener("click", closeContainer);
form.addEventListener("click", function(event) {event.stopPropagation();});
submitFormBtn.addEventListener("click", submitBook);