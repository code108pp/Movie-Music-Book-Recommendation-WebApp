import React, { useEffect, useState } from 'react'
import { Typography } from '@material-ui/core'
import BookPageCarousel from './BookPageCarousel'
import BookPageCard from './BookPageCard'
import axios from 'axios'
import "./menu.css";


export default function BookPage() {
  const [bookList, setBookList] = useState([])

  const books = async () => await axios.get('https://www.googleapis.com/books/v1/volumes?q=best+seller:keyes&key=AIzaSyCB5WxDZV3N4SanfMg3opjJGa3Gs-9RpEQ')

  const getBooks = async () => {
    await books().then(response => {
      setBookList(response.data.items)
      console.log(response.data.items)
    });
  }

  useEffect(() => {
    getBooks();
  }, []);

  return (
    <>
      {/* <Typography
        variant="h4"
        style={{ flexGrow: 1, textDecoration: "none", color: "white" }}
      >
        Books
      </Typography> */}
      <div className="bookpage">
        {bookList.length == 0 ? <div>No books found</div> :
          // <BookPageCarousel menuList={bookList}/>

          (
            bookList.map(e => (
              <BookPageCard
                key={e.id}
                name={e.volumeInfo.title}
                authors={e.volumeInfo.authors}
                publisher={e.volumeInfo.publisher}
              // image={e.volumeInfo.imageLinks.smallThumbnail}
              // price={menuItem.price}
              />
            ))
          )

        }
      </div>
    </>
  )
}