import axios from "axios";
import { useEffect, useState } from "react";
import MoviePanel from "../components/movie_panel";
import "./HomeStyles.css";

function Home() {
  const [score, setScore] = useState(0);
  const [movies, setMovies] = useState();
  const [currMovie1, setCurrMovie1] = useState();
  const [currMovie2, setCurrMovie2] = useState();
  const [nextMovie, setNextMovie] = useState();

  const styles = {
    section: {
      fontFamily: "-apple-system",
      fontSize: "1rem",
      fontWeight: 1.5,
      lineHeight: 1.5,
      color: "#292b2c",
      backgroundColor: "#fff",
      padding: "0 2em",
    },
    carousel: {
      position: "relative",
    },
    slide: {
      position: "absolute",
      inset: 0,
      opacity: 0.5,
    },
  };

  const getAll = () => {
    axios.get("http://localhost:3001/api/getAll").then((response) => {
      setMovies(response.data);
    });
  };

  useEffect(() => {
    getAll();
  }, []);

  const consoleLog = () => {
    console.log(movies);
    console.log(currMovie1);
    console.log(currMovie2);
    console.log(nextMovie);
  };

  const initGame = () => {
    getAll()
    const movie1 = movies[Math.floor(Math.random() * movies?.length)];
    const movie2 = movies[Math.floor(Math.random() * movies?.length)];
    const movie3 = movies[Math.floor(Math.random() * movies?.length)];

    setCurrMovie1(movie1);
    setCurrMovie2(movie2);
    setNextMovie(movie3);

    setMovies(
      movies?.filter(
        (element) =>
          element !== movie1 && element !== movie2 && element !== movie3
      )
    );
  };

  const next = () => {
    const element = document.getElementById("all");

    element.animate(
      [
        // keyframes
        { transform: "translateX(0px)" },
        { transform: "translateX(-650px)" },
      ],
      {
        // timing options
        duration: 650,
        iterations: 1,
      }
    );

    setTimeout(() => {
      const newMovie = movies[Math.floor(Math.random() * movies?.length)];
      setCurrMovie1(currMovie2);
      setCurrMovie2(nextMovie);
      setNextMovie(newMovie);
      setMovies(movies?.filter((element) => element !== newMovie));
    }, 650);
  };

  const resolve = (ans) => {
    const corrAns = currMovie1.IMDB_rating >= currMovie2.IMDB_rating ? 0 : 1;

    if (ans === corrAns || currMovie1.IMDB_rating === currMovie2.IMDB_rating) {
      setScore(score + 1);
      next();
    } else {
      setScore(0);
      setCurrMovie1();
      setCurrMovie2();
      setNextMovie();
      window.alert("Final Score: " + score);
    }
  };
  return (
    <div>
      <h2>Welcome to HigherOrLower!</h2>
      <h2>Score: {score}</h2>

      {currMovie1 ? (
        <>
          <ul className="carousel" id="all">
            <li className="slide" id="1" data-1>
              <MoviePanel data={currMovie1} />
              <h2>Rating: {currMovie1?.IMDB_rating}</h2>
            </li>
            <li className="slide" id="2" data-2>
              <MoviePanel data={currMovie2} />
            </li>
            <li className="slide" id="3">
              <MoviePanel data={nextMovie} />
            </li>
          </ul>
          <div>
            <button
              className="carousel-button next"
              type="button"
              onClick={() => {
                resolve(1);
              }}
            >
              Higher
            </button>
            <button
              className="carousel-button next"
              type="button"
              onClick={() => {
                resolve(0);
              }}
            >
              Lower
            </button>
          </div>
        </>
      ) : (
        <>
          <button type="button" onClick={consoleLog}>
            Console Log
          </button>
          <button type="button" onClick={initGame}>
            Start
          </button>
        </>
      )}
    </div>
  );
}

export default Home;
