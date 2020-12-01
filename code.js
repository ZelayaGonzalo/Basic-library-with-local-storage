const container=document.getElementById("cardContainer");
const card=container.childNodes[1];
const formContainer=document.getElementById("formContainer");
const form=formContainer.querySelector("form");
const addCard=container.querySelector("#addButton");


function Book(author,title,pages,read){
  this.author=author
  this.title=title
  this.pages=pages
  this.read=read
}
let id=localStorage.getItem("currentID");
let myLibrary=localStorage.getItem("bookLibrary");
console.log(myLibrary);

if(id==null){
  id=0;
}
else{
  id=parseInt(id)+1;
}

if(myLibrary==null){
    myLibrary=[];
}
else{
  myLibrary=JSON.parse(myLibrary);
  AddBooksfromStorage(myLibrary);
}

updateLocalStorage();
/*localStorage.setItem("bookLibrary",JSON.stringify(myLibrary));
localStorage.setItem("currentID",id);*/

form.addEventListener('submit', event => {
  event.preventDefault();
  let addBook=new Book();
  addBook.id=id;
  addBook.author=form.elements["author"].value;
  addBook.title=form.elements["bookName"].value;
  addBook.pages=form.elements["pages"].value;
  addBook.read=form.elements["read"].checked;
  myLibrary.push(addBook);
  addBookToLibrary(addBook,id);
  updateLocalStorage();
  closePopUp();
  id++;
  console.log('Form submission cancelled.');
  console.log(myLibrary);
});


function addBookToLibrary(book,oldID,) {
  let newCard=card.cloneNode(true);
  let childNodes=newCard.children;
  newCard.id=oldID;
  newCard.addEventListener("click",function(){changeRead(newCard,newCard.id)});
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
        case "readPage":
          if(!book.read){
            childNodes[i].innerHTML="Unread"
            newCard.classList.remove("card");
            newCard.classList.add("unreadCard");
          }
          break;
      case "deleteButton":
        childNodes[i].addEventListener("click",function() {deleteBook(newCard.id)} );
        break;
    }
  }
  

  console.log(book.read)
  container.appendChild(newCard);
  container.appendChild(addCard);

}

function deleteBook(deleteID){
  if(myLibrary.length>1){
    for(let i=0;i<myLibrary.length;i++){
      if(myLibrary[i].id==deleteID){
        myLibrary.splice(i,1);
        console.log("delete "+deleteID);
        } 
     }
    }
  else{
    myLibrary=[];
  }
  console.log(deleteID);
  document.getElementById(deleteID).remove();
  updateLocalStorage();
}


function closePopUp(){
  formContainer.style.display="none";
}

function showPopUp(){
  formContainer.style.display="flex";
}

function updateLocalStorage(){
  localStorage.setItem("bookLibrary",JSON.stringify(myLibrary));
  localStorage.setItem("currentID",id.toString());
}

function AddBooksfromStorage(library){
  for(let i=0;i<library.length;i++){
    addBookToLibrary(library[i],library[i].id);
  }
}


function changeRead(card,bookId){

  for(let i=0;i<myLibrary.length;i++){
    if(myLibrary[i].id==bookId){
      myLibrary[i].read= !myLibrary[i].read;
    }
  }
  if(card.classList.contains("card")){
    card.classList.remove("card");
    card.classList.add("unreadCard");
    card.querySelector("#readPage").innerHTML="Unread";
  }
  else{
    card.classList.remove("unreadCard");
    card.classList.add("card");
    card.querySelector("#readPage").innerHTML="Read";
  }
  
  updateLocalStorage();

}