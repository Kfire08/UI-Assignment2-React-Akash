import React from "react";
import "./NewsCard.css";

const NewsCard = ({ newsItem }) => {
  return (
    <div className="newsCard">
      <img
        alt={newsItem.title}
        src={
          newsItem.media
            ? newsItem.media
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
              {newsItem.published_date}
            </span>
          </span>
        </div>
        <div className="lowerNewsText">
          <div className="description">{newsItem.summary}</div>
          <span className="readmore">
            <a href={newsItem.link} target="__blank" className="source">
              <b>read more at {newsItem.rights}</b>
            </a>
          </span>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
