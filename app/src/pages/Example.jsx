import axios from "axios";
import { useEffect, useState } from "react";
import HLPage from "../components/higher_lower_page";
import "./HomeStyles.css";

function Example() {
  const [score, setScore] = useState(0);
  const [movies, setMovies] = useState();
  const [nextMovie, setNextMovie] = useState();
  const [data1, setData1] = useState();
  const [data2, setData2] = useState();

  const getAll = () => {
    axios.get("http://localhost:3001/api/getAll").then((response) => {
      setMovies(response.data);
    });
  };

  useEffect(() => {
    getAll();
  }, []);

  const initGame = () => {
    getAll();
    const movie1 = movies[Math.floor(Math.random() * movies?.length)];
    const movie2 = movies[Math.floor(Math.random() * movies?.length)];
    const movie3 = movies[Math.floor(Math.random() * movies?.length)];

    setData1(movie1);
    setData2(movie2);
    setNextMovie(movie3);

    setMovies(
      movies?.filter(
        (element) =>
          element !== movie1 && element !== movie2 && element !== movie3
      )
    );
  };

  const next = () => {
    document.getElementById("hidden").setAttribute("width", "100%")
    const element = document.getElementById("flexbox");

    element.animate(
      [
        // keyframes
        { transform: "translateX(-50%)" },
        
      ],
      {
        // timing options
        duration: 1000,
        iterations: 1,
      }
    );

    setTimeout(() => {
      setData1(data2);
      setData2(nextMovie);
      const newMovie = movies[Math.floor(Math.random() * movies?.length)];

      setNextMovie(newMovie);
      setMovies(movies?.filter((element) => element !== newMovie));
    }, 1000);
  };

  const resolve = (ans) => {
    const corrAns = data1.IMDB_rating >= data2.IMDB_rating ? 0 : 1;

    if (ans === corrAns || data1.IMDB_rating === data2.IMDB_rating) {
      setScore(score + 1);
      next();
    } else {
      window.alert("Score: " + score);
      setScore(0);
      setData1();
      setData2();
      setNextMovie();
    }
  };

  let poster_link1 = data1?.poster_link;
  const index1 = poster_link1?.indexOf("._V1");
  poster_link1 = poster_link1?.substring(0, index1)?.concat("._V1_SX900.jpg");

  let poster_link2 = data2?.poster_link;
  const index2 = poster_link2?.indexOf("._V1");
  poster_link2 = poster_link2?.substring(0, index2)?.concat("._V1_SX900.jpg");

  let poster_link3 = nextMovie?.poster_link;
  const index3 = poster_link3?.indexOf("._V1");
  poster_link3 = poster_link3?.substring(0, index3)?.concat("._V1_SX900.jpg");

  const objectFit = {
    objectFit: "cover"
  }
  return (
    <div>
      {data1 ? (
        <div id="flexbox" className="wrapper">
          <div className="img">
            <img
              src={poster_link1}
              alt="Movie Poster"
              width="100%"
              height="100%"
            />
            <div className="infobox">
              <HLPage data={data1} resolve={resolve} />
            </div>
          </div>
          <div className="img">
            <img
              src={poster_link2}
              alt="Movie Poster"
              width="100%"
              height="100%"
            />
            <div className="infobox second">
              <HLPage data={data2} resolve={resolve} buttons />
            </div>
          </div>
          <div id="hidden" className="img">
            <img
              src={poster_link3}
              alt="Movie Poster"
              width="100%"
              height="100%"
            />
          </div>
        </div>
      ) : (
        <button onClick={initGame}>Start</button>
      )}
    </div>
  );
}

export default Example;
