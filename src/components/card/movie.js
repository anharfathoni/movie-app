import React from "react";
import PropTypes from "prop-types";
import { sliceText, handleImageUrl } from "utils/helpers";

function MovieCard({
  Poster = "",
  Title = "",
  Year = "",
  Type = "",
  onClickImage = () => {},
  onClickDetail = () => {},
}) {
  return (
    <div className='cardContainer'>
      <div
        className='cardImgContainer pointer'
        onClick={onClickImage}
        data-testid='btn-click-image'
      >
        <img src={handleImageUrl(Poster)} alt={Title} className='cardImg' />
      </div>
      <p
        className='cardTitle mb05 pointer'
        onClick={onClickDetail}
        data-testid='btn-click-detail'
      >
        {sliceText(Title, 20)}
      </p>
      <div className='flexRowBetween'>
        <p className='cardDescription' data-testid='card-movie-year'>{Year}</p>
        <p className='cardDescription' data-testid='card-movie-type'>{Type}</p>
      </div>
    </div>
  );
}

MovieCard.propTypes = {
  Poster: PropTypes.string,
  Title: PropTypes.string,
  Year: PropTypes.string,
  Type: PropTypes.string,
  onClickImage: PropTypes.func,
  onClickDetail: PropTypes.func,
};

export default MovieCard;
