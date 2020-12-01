let myLibrary = [];
let id=0;
const formContainer=document.getElementById("formContainer");
const form=formContainer.querySelector("form");
/*console.log(form.elements);*/

form.addEventListener('submit', event => {
  event.preventDefault();
  let addBook=new Book();
  addBook.id=id;
  addBook.author=form.elements["author"].value;
  addBook.title=form.elements["bookName"].value;
  addBook.pages=form.elements["pages"].value;
  addBook.read=form.elements["read"].checked;
  myLibrary.push(addBook);
  addBookToLibrary(addBook);
  closePopUp();
  id++;
  console.log('Form submission cancelled.');
  console.log(myLibrary);
});
const container=document.getElementById("cardContainer");
const card=container.childNodes[1];
/*const xButtonPopUp=formContainer.getElementById("closePopUp");*/



function Book(author,title,pages,read){
    this.author=author
    this.title=title
    this.pages=pages
    this.read=read
}

function addBookToLibrary(book) {
  let newCard=card.cloneNode(true);
  let childNodes=newCard.children;
  newCard.id=id;
  container.appendChild(newCard);
  for(let i=0;i<childNodes.length;i++){
    switch(childNodes[i].id){
      case "cardTitle":
        childNodes[i].innerHTML=book.title;
        break;
      case "cardAuthor":
        childNodes[i].innerHTML=book.author;
        break;
      case "cardPages":
        childNodes[i].innerHTML=book.pages+ " pages";
        break;
      case "deleteButton":
        childNodes[i].addEventListener("click",function() {deleteBook(newCard.id)} );
        break;
    }
  }
  container.appendChild(newCard);
  /*console.log(newCard);*/

}

function deleteBook(id){
document.getElementById(id).remove();
console.log(id);


}


function closePopUp(){
  formContainer.style.display="none";
  console.log("close pop up");
}

function showPopUp(){
  formContainer.style.display="flex";
}