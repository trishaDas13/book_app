let aside = document.querySelector('aside');
let bookContainer = document.querySelector('.bookCotainer');
let catagoryName = document.getElementById('catagory-name');
let mydialog = document.querySelector('.mydialog');
let modal = document.querySelector('.modal');

//todo --------- Fetching API ---------
async function fetchingAPI(){
    let data = await fetch('https://books-backend.p.goit.global/books/top-books');
    let res = await data.json();
    append(res);
}
fetchingAPI();
//todo --------- Append Catagories ---------
function append(arr){
    for(let i=0; i<arr.length; i++){
        let item = document.createElement('p');
        item.classList.add("categories");
        item.innerHTML = `
             ${arr[i].list_name}
        `
        aside.appendChild(item);
    }
    let links = aside.getElementsByClassName("categories"); 
    activateLinks(links);
}
function activateLinks(links){
   for(let i = 0; i < links.length; i++){
    links[i].addEventListener("click", showBooks);
   }
}
//todo --------- Show Books ---------
function showBooks(e){
    if(e.target.innerText == "ALL CATEGORIES"){

    }
    else{
        fetchBooks(e.target.innerText);
    }
}
//todo --------- Fetching Books' API ---------
async function fetchBooks(text){
    let data = await fetch(`https://books-backend.p.goit.global/books/category?category=${text}`);
    let res = await data.json();
    createObject(res);
}
//todo --------- Create new object---------
function createObject(res){
    let bookArray = res.map((item) =>{
        return {
            image : item.book_image,
            bookName : item.title,
            author : item.author,
            description : item.description,
            links : [item.buy_links[0].url , item.buy_links[1].url, item.buy_links[2].url],
            listName : item.list_name,
        }
    });
    appendBooks(bookArray);
}
//todo --------- Append all books---------
function appendBooks(bookArray){
    let arr = bookArray[0].listName.split(" ");
    catagoryName.setAttribute("data-text", `${arr[arr.length-1]}`);

    bookContainer.innerHTML = "";
    catagoryName.innerHTML = `${bookArray[0].listName}`

    for(let i = 0; i < bookArray.length; i++){
        let books = document.createElement('div');
       
        books.classList.add('book');
        books.innerHTML = `
            <img src="${bookArray[i].image}" alt="error" onclick= 'openDetails("${bookArray[i].image}", "${bookArray[i].bookName}","${bookArray[i].author}", "${bookArray[i].description}", "${bookArray[i].links[0]}","${bookArray[i].links[1]}","${bookArray[i].links[2]}")' class="bookImage">
            <p class="bookTitle">${bookArray[i].bookName}</p>
            <p class="bookAuthor">${bookArray[i].author}</p>
        `
        bookContainer.appendChild(books);
    }
}
//todo --------- Show dialog box---------
function openDetails(img, title, author, description, link1, link2, link3){
    if(description == ""){
        description = "there is no description of this book";
    }
    mydialog.show();
    modal.innerHTML = `
    <div class="modalContent">
        <div class="img">
            <img src="${img}" alt="">
        </div>
        <div class="content">
            <div class="bookIntro">
            <h1>${title}</h1>
            <p class="contentAuthor">${author}</p>
            </div>
            <div class="bookdescription">
                <p class="contentDescription">${description}</p>
            <div class="links">
                <a href="${link1}" target="_blank"><i class="fa-brands fa-amazon"></i></a>
                <a href="${link2}" target="_blank"><i class="fa-solid fa-book-open"></i></a>
                <a href="${link3}" target="_blank"><i class="fa-solid fa-book"></i></a>
            </div>
            </div>
        </div>
    </div>
    <button> ADD TO SHOPPING LIST</button>
    <svg width="24" height="24" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" class="close" onclick="closeDetails()">
    <path fill="#8b5cf6" fill-rule="evenodd" d="M4.28 3.22a.75.75 0 0 0-1.06 1.06L6.94 8l-3.72 3.72a.75.75 0 1 0 1.06 1.06L8 9.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L9.06 8l3.72-3.72a.75.75 0 0 0-1.06-1.06L8 6.94L4.28 3.22Z" clip-rule="evenodd"/>
</svg>
    `
}
//todo --------- Close dialog box---------
function closeDetails() {
    mydialog.close();
}