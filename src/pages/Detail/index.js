import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import services from "services/movies";
import Loading from "components/loading";
import "styles/detailMovie.css";

function Detail() {
  const { imdbID } = useParams();
  const [loading, setLoading] = useState(false);
  const [detail, setDetail] = useState({
    Title: "",
    Year: "",
    Rated: "",
    Released: "",
    Runtime: "",
    Genre: "",
    Director: "",
    Writer: "",
    Actors: "",
    Plot: "",
    Language: "",
    Country: "",
    Awards: "",
    Poster: "",
    Ratings: [],
    Metascore: "",
    imdbRating: "",
    imdbVotes: "",
    imdbID: "",
    Type: "",
    DVD: "",
    BoxOffice: "",
    Production: "",
    Website: "",
    Response: "",
  });

  const getDetail = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await services.getDetailMovie({ i: imdbID });
      setDetail({ ...data });
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  }, [imdbID]);

  useEffect(() => {
    getDetail();
  }, [getDetail]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className='detailMovieContainer'>
      <h1>{detail.Title}</h1>
      <div className='detailMovieContent'>
        <img src={detail.Poster} alt={detail.Title} />
        <div>
          <h2 className='m0'>IMDB Data</h2>
          <p>
            <b>Metascore:</b> {detail.Metascore}
          </p>
          <p>
            <b>imdbRating:</b> {detail.imdbRating}
          </p>
          <p>
            <b>imdbVotes:</b> {detail.imdbVotes}
          </p>
          <p>
            <b>imdbID:</b> {detail.imdbID}
          </p>
          <h2>User Rating</h2>
          {detail.Ratings.map((rating, index) => (
            <p key={index}>
              <b>{rating.Source}</b>: {rating.Value}
            </p>
          ))}
          <br />
          <h2>Detail</h2>
          <p>
            <b>Title:</b> {detail.Title}
          </p>
          <p>
            <b>Year:</b> {detail.Year}
          </p>
          <p>
            <b>Type:</b> {detail.Type}
          </p>
          <p>
            <b>Rated:</b> {detail.Rated}
          </p>
          <p>
            <b>Released:</b> {detail.Released}
          </p>
          <p>
            <b>Runtime:</b> {detail.Runtime}
          </p>
          <p>
            <b>Genre:</b> {detail.Genre}
          </p>
          <p>
            <b>Director:</b> {detail.Director}
          </p>
          <p>
            <b>Writer:</b> {detail.Writer}
          </p>
          <p>
            <b>Actors:</b> {detail.Actors}
          </p>

          <p>
            <b>Language:</b> {detail.Language}
          </p>
          <p>
            <b>Country:</b> {detail.Country}
          </p>

          <p>
            <b>DVD:</b> {detail.DVD}
          </p>
          <p>
            <b>BoxOffice:</b> {detail.BoxOffice}
          </p>
          <p>
            <b>Production:</b> {detail.Production}
          </p>
          <p>
            <b>Website:</b> {detail.Website}
          </p>
        </div>
      </div>
      <h2>Plot</h2>
      <p className="moviePlot">{detail.Plot}</p>
      <br />
      <h2>Awards</h2>
      <p className="moviePlot">{detail.Awards}</p>
    </div>
  );
}

export default Detail;
