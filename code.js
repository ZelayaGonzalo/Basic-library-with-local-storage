const form=document.getElementById("formContainer");
const container=document.getElementById("cardContainer");
const card=container.childNodes[1];
/*const xButtonPopUp=form.getElementById("closePopUp");*/
let myLibrary = [];
let id=0;

function Book(author,title,pages,read){
    this.author=author
    this.title=title
    this.pages=pages
    this.read=read
}

function addBookToLibrary() {
  let newCard=card.cloneNode(true);
  let childNodes=newCard.children;
  newCard.id=++id;
  container.appendChild(newCard);
  /*myLibrary.push(book);*/
  for(let i=0;i<childNodes.length;i++){
    switch(childNodes[i].id){
      case "cardTitle":
        childNodes[i].innerHTML="nuevoTitulo";
        break;
      case "cardAuthor":
        childNodes[i].innerHTML="nuevoAuthor";
        break;
      case "cardPages":
        childNodes[i].innerHTML="nuevoPages";
        break;
      case "deleteButton":
        childNodes[i].addEventListener("click",function() {deleteBook(newCard.id)} );
        break;
    }
  }
  container.appendChild(newCard);
  console.log(newCard);

}

function deleteBook(id){
document.getElementById(id).remove();
console.log(id);


}


function closePopUp(){
  form.style.display="none";
  console.log("close pop up");
}

function showPopUp(){
  form.style.display="flex";
}