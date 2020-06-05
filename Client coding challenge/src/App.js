import React from 'react';
import './App.css';
import Book from './Book';
import BookForm from './BookForm';

class App extends React.Component{

  constructor( props ){
    super( props );
    this.state = {
      /*
        Your code goes here
      */
      books : []
    }
  }

  /* 
    Your code goes here
  */
  Submit = () => {
    let name = document.getElementById("bookName").value;

    if(name === ""){
      window.confirm("Please provide a name to search");
    }
    else{
      let url = "https://www.googleapis.com/books/v1/volumes?q="+name+"+intitle";
      let settings = {
        method: 'GET'
      };
      fetch(url, settings)
          .then(res => {
            if(res.status === 200){
              return res.json();
            }
            else throw new Error("error in search");
          })
          .then(list => {
            list.items.forEach(item =>{
              let newBook = {
                title: item.volumeInfo.title,
                thumbnail: item.volumeInfo.imageLinks.thumbnail,
                author: item.volumeInfo.author[0],
                snippet: item.volumeInfo.description
              };
              this.state.books.push(newBook);
            });
          })
          .catch(err => {
            console.log("Error, "+err);
          })
    }
  };

  render(){
    return(
      <div>
        {/*
          Your code goes here
        */
        BookForm},
        {Book}
      </div>
    )
  }

}

export default App;
