import React from "react";
import BookPageCard from "./BookPageCard";
import { useState } from "react";
import "./menu.css";

function BookPageCarousel(menulist) {
  const [ml,setMl] = useState(menulist)
  console.log(menulist)
  return (
    <div className="menu">
      <h1 className="menuTitle">Our Menu</h1>
      <div className="menuList">
        {console.log(ml)} 
        {Array.isArray(ml) && ml.map(e => 
          (
            <BookPageCard
              key={e.id}
              name={e.volumeInfo.title}
              image={e.volumeInfo.imageLinks.smallThumbnail}
              // price={menuItem.price}
            />
          )
        )}
      </div>
    </div>
  );
}

export default BookPageCarousel;