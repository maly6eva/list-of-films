import React, {useState} from 'react';


const books = [
    {id: 1, name: 'Мастер и Маргарита', autor: 'Михаил Булгаков ', age: 1855, composed: true},
    {id: 2, name: 'Евгений Онегин', autor: 'Александр Пушкин ', age: 1923, composed: false},
    {id: 3, name: 'Преступление и наказание', autor: 'Федор Достоевский', age: 1975, composed: true},
    {id: 4, name: 'Война и мир', autor: 'Лев Толстой', age: 1860, composed: false},
    {id: 5, name: 'Маленький принц', autor: 'Антуан де Сент-Экзюпери', age: 1966, composed: true}
]
export const Books = () => {
    const[book, setBook] = useState(books)
    const[newBook, setNewBook] = useState('')
    const [filter, setFilter] = useState('Все')

    function addNewBook(e) {
       e.preventDefault()
        if(!newBook.trim()) return

        const newBoo = {
            id: Date.now(),
            name: newBook.trim(),
            composed: false
        }
        setBook(r => [newBoo, ...r ])
        setNewBook('')
    }

   function deleteBooks(id) {
       setBook((prev) => prev.filter(book => book.id !== id) )
   }

   function bookCheckbox(id) {
        setBook((book) => book.map((b) => b.id === id ? {...b,  composed: !b.composed} : b))
   }

   const  filterBook = book.filter((b) => {
       return (
           (filter === 'Все') ||
           (filter === 'Прочитанные' && b.composed) ||
           (filter === 'Непрочитанные' && !b.composed)
       )
   })




    return (
        <div>
            <h1>🦋Книжная лавка.</h1>
          <ul>
              {filterBook.map(book => {
                  return (
                          <li key={book.id}>
                              <input type="checkbox" checked={book.composed} onChange={() => bookCheckbox(book.id)}/>
                              {book.name}, {book.autor}, {book.age}
                              <button onClick={() => deleteBooks(book.id)}>❌</button>
                          </li>

                  )
              })}
          </ul>
            <div>
                <input type="text" value={newBook} onChange={e => setNewBook(e.target.value)}/>
                <button onClick={addNewBook}> ✅ Добавить!</button>
            </div>
            <div>
                <button onClick={() =>  setFilter('Все')}>Все</button>
                <button onClick={() =>  setFilter('Прочитанные')}>Прочитанные</button>
                <button onClick={() =>  setFilter('Непрочитанные')}>Непрочитанные</button>
            </div>
        </div>
    );
};

