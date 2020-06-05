import React from 'react';

function BookForm( props ){
    return(
        <div>
            <form id={"form"}>
                <label>Input book name: </label>
                <input type={"text"} id={"bookName"}/>
                <button type={"button"} onClick={props.Submit}>Submit</button>
            </form>
        </div>
    );
}

export default BookForm;