import React, {useEffect, useState} from 'react';
import {Films} from "./Films.jsx";

export const List = () => {

            const [films, setFilms] = useState(() => {
            const saved = localStorage.getItem('films')
            return saved ? JSON.parse(saved) : []
        })

            useEffect(() => {
            localStorage.setItem('films', JSON.stringify(films))
        }, [films])

            const [selectedGenre, setSelectedGenre] = useState('Все')
            const [selectedStatus, setSelectedStatus] = useState('Все')

            const filteredFilm =  films.filter(film => {
            const genreOk = selectedGenre === 'Все' || film.genre === selectedGenre;
            const statusOk = selectedStatus === 'Все' || film.question === selectedStatus;
            return genreOk && statusOk
        })


            const resultFilms = (newFilm) => {
            setFilms((prevFilms) => [...prevFilms, newFilm]);
        }

            function deleteFilm(id) {
            setFilms((film) => film.filter((f) => f.id !== id))
        }


            return (
            <>
                <h1>🧾 Список фильмов</h1>
                <Films  resultFilms={resultFilms}/>

                <div>
                    <ul>
                        {filteredFilm.map((f) => {
                            return (


                                <li key={f.id}>
                                    {f.text} - {f.genre} - {f.question}
                                    <button onClick={() => deleteFilm(f.id)}>❌</button>

                                </li>
                            )
                        })}
                    </ul>
                    <div>
                        <label>Фильтр по жанру: </label>
                        <select value={selectedGenre} onChange={(e) => setSelectedGenre(e.target.value)}>
                            <option value="Все">Все</option>
                            <option value="Драма">Драма</option>
                            <option value="Комедия">Комедия</option>
                            <option value="Ужасы">Ужасы</option>
                            <option value="Фантастика">Фантастика</option>
                            <option value="Боевик">Боевик</option>
                        </select>

                        <label>Фильтр по статусу:</label>
                        <select value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)}>
                            <option value="Все">Все</option>
                            <option value="Просмотрен">Просмотрен</option>
                            <option value="Не просмотрен">Не просмотрен</option>
                        </select>
                    </div>
                </div>
            </>
    );
};

