import React from "react";
import "./NewsCard.css";

const NewsCard = ({ newsItem }) => {
  return (
    <div className="newsCard">
      <img
        alt={newsItem.title}
        src={
          newsItem.urlToImage
            ? newsItem.urlToImage
            : "https://1office.co/wp-content/uploads/2019/02/photodune-9262934-latest-news-blue-3d-realistic-paper-speech-bubble-s.jpg"
        }
        className="newsImage"
      />
      <div className="newsText">
        <div>
          <span className="title">{newsItem.title}</span>
          <br />
          <span className="author">
            <span className="muted">
              by {newsItem.author ? newsItem.author : "unknown"} / on{" "}
              {new Date(newsItem.publishedAt).toUTCString()}
            </span>
          </span>
        </div>
        <div className="lowerNewsText">
          <div className="description">{newsItem.description}</div>
          <span className="readmore">
            <a href={newsItem.url} target="__blank" className="source">
              <b>read more at {newsItem.source.name}</b>
            </a>
          </span>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
