import React from "react";
import StarRatings from "react-star-ratings";
export default function Comment(props) {
  const { name, description, rating } = props.comment;
  return (
    <>
      <h4>{name}</h4>
      <p>{description}</p>
      <div>
        <StarRatings
          starRatedColor="#FFCC00"
          starDimension="25px"
          rating={rating}
          numberOfStars={5}
        />
      </div>
    </>
  );
}
