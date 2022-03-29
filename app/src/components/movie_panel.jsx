const movie_panel = ({ data }) => {
  let poster_link = data?.poster_link
  const index = poster_link?.indexOf('._V1')
  poster_link = poster_link?.substring(0, index)?.concat('._V1_SX900.jpg')
  return (
    <div>
      <h2>{data?.series_title}</h2>
      
        <img
          src={poster_link}
          alt="Movie Poster"
          width="600"
          height="889"
        ></img>
    </div>
  );
};

export default movie_panel;
