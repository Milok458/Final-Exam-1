import React from 'react';

function Book( props ){
    return(
        <div>
            {props.books.forEach(book=>{
                return(<div className={"container"}>
                    <p>Title: {book.title}</p>
                    <img src={book.thumbnail} alt={"Thumbnail"}/>
                    <p>Author: {book.author}</p>
                    <p>Snippet: {book.snippet}</p>
                </div>)
            })}
        </div>
    );
}

export default Book;