import React from "react";
import PropTypes from "prop-types";
import { sliceText } from "utils/helpers";

function SearchCard({
  onClick = () => {},
  Poster = "",
  Title = "",
  Year = "",
  Type = "",
}) {
  return (
    <div
      data-testid='card-search-div'
      className='cardSearch pointer'
      onClick={onClick}
    >
      <img src={Poster} alt={Title} height='60px' width='40px' />
      <div className='ml1'>
        <p className='m0' data-testid='card-search-title'>
          {sliceText(Title, 30)}
        </p>
        <p className='m0' data-testid='card-search-year'>
          {Year}
        </p>
        <p className='m0' data-testid='card-search-type'>
          {Type}
        </p>
      </div>
    </div>
  );
}

SearchCard.propTypes = {
  Poster: PropTypes.string,
  Title: PropTypes.string,
  Year: PropTypes.string,
  Type: PropTypes.string,
  onClick: PropTypes.func,
};

export default SearchCard;
