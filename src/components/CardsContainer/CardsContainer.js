import React from "react";
import NewsCard from "../NewsCard/NewsCard";
import "./CardsContainer.css";

const CardsContainer = ({ handleScroll, newsArray }) => {
  return (
    <div onScroll={handleScroll} className="cardsContainer">
      {newsArray.map((newsItem) => (
        <NewsCard newsItem={newsItem} key={newsItem.title} />
      ))}
    </div>
  );
};

export default CardsContainer;
