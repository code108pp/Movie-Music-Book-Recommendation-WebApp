import React from "react";
import "./menu.css";


function BookPageCard({  name, authors, publisher }) {
  // console.log(image,name)
  return (
    <div className="menuItem">
      <article className="information [ card ]">
        <span className="tag">Top Book</span>
        <h2 className="title">{name}</h2>
        <p className="name">{authors}</p>
        <p className="name">{publisher}</p>
        <button className="button">
          <span>Add to Read</span>
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="none">
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path d="M16.01 11H4v2h12.01v3L20 12l-3.99-4v3z" fill="currentColor" />
          </svg>
        </button>
      </article>
    </div>
  );
}

export default BookPageCard;