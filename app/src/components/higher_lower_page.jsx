const HLPage = ({ data, resolve, buttons = false }) => {
  let poster_link = data?.poster_link;
  const index = poster_link?.indexOf("._V1");
  poster_link = poster_link?.substring(0, index)?.concat("._V1_SX900.jpg");

  const stars = data?.star_1
    ?.concat(", ")
    .concat(data?.star_2)
    .concat(", ")
    .concat(data?.star_3)
    .concat(", ")
    .concat(data?.star_4);

  const divStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    justifyContent: "space-between",
    height: "100%",
    margin: "20px",
  };

  const text = {
    margin: 0,
  };

  return (
    <div style={divStyle}>
      <h2 style={text}>{data?.series_title}</h2>
      <h3 style={text}>{data?.released_year}</h3>
      <h3 style={text}>{data?.genre}</h3>
      <h3 style={text}>{data?.overview}</h3>
      <h3 style={text}>{data?.director}</h3>
      <h3 style={text}>{stars}</h3>
      {!buttons ? (
        <h3 style={text}>Rating: {data?.IMDB_rating}</h3>
      ) : (
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
              resolve(0)
            }}
          >
            Lower
          </button>
        </div>
      )}
    </div>
  );
};

export default HLPage;
