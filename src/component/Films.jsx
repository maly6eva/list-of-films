import React, {useState} from 'react';

export const Films = ({resultFilms}) => {
    const [text, setText] = useState('')
    const [genre, setGenre] = useState('Драма')
    const [question, setQuestion] = useState('Посмотрен')

    function handleGenreChange(e){
        e.preventDefault()
        if(!text.trim()) return

        const newFilm = {
            id: Date.now(),
            text,
            genre,
            question,
            com: false
        }

        resultFilms(newFilm)
        setText('')
        setGenre('Драма')
        setQuestion('Посмотрен')

    }


    return (
        <form onSubmit={handleGenreChange}>
         <div>
             <label>
                 Название фильма
                 <input
                     type="text"
                     placeholder='Название фильма...'
                     value={text}
                     onChange={(e) => {setText(e.target.value)}}
                 />
             </label>
         </div>

         <div>
             <label>
                 Выбери жанр своего фильма
                 <select value={genre} onChange={(e) => {setGenre(e.target.value)}}>
                     <option value="Драма">Драма</option>
                     <option value="Комедия">Комедия</option>
                     <option value="Ужасы">Ужасы</option>
                     <option value="Фантастика">Фантастика</option>
                     <option value="Боевик">Боевик</option>
                 </select>
             </label>
         </div>

        <div>
            <label htmlFor="">
                Посмотрен фильм или нет?
                <select value={question} onChange={(e) => {setQuestion(e.target.value)}}>
                    <option value="Просмотрен">Просмотрен</option>
                    <option value="Не просмотрен">Не просмотрен</option>
                </select>
            </label>
        </div>
            <button>OK</button>
        </form>
    );
};

