import './App.css'
import {Films} from "./component/Films.jsx";
import {useState} from "react";

function App() {

    const [films, setFilms] = useState([])

    const resultFilms = (newFilm) => {
        setFilms((prevFilms) => [...prevFilms, newFilm]);
    }


  return (
    <>
      <h1>🧾 Список фильмов</h1>
        <Films  resultFilms={resultFilms}/>

        {films.map((f) => {
            return (
                <div>
                    <ul>
                        <li key={f.id}>
                            {f.text} - {f.genre} - {f.question}
                        </li>
                    </ul>
                </div>
            )
        })}
    </>
  )
}

export default App
