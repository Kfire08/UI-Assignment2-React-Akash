import axios from "axios";
import "./App.css";
import { useEffect, useState } from "react";
import Search from "./components/Search/Search.js";
import CardsContainer from "./components/CardsContainer/CardsContainer.js";
import { useSearchParams } from "react-router-dom";

function App() {
  const [useSearchParam, setUseSearchParam] = useSearchParams();
  const [seconds, setSeconds] = useState(30);
  const [loader, setLoader] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(2);
  const [refreshButton, setRefreshButton] = useState(false);
  const [noResultFound, setNoResultFound] = useState(false);
  const [newsArray, setNewsArray] = useState([]);
  const [searchQuery, setSearchQuery] = useState(useSearchParam.get("q") || "");

  useEffect(() => {
    const loading = document.querySelector(".loading");
    if (loader) {
      loading.style.setProperty("display", `block`);
    } else {
      loading.style.setProperty("display", `none`);
    }
  }, [loader]);

  var timer;
  useEffect(() => {
    timer = setInterval(() => {
      setSeconds(seconds - 1);
      if (seconds === 1) {
        setSeconds(30);
        clearInterval(timer);
        setRefreshButton(true);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [seconds, searchQuery, refreshButton]);

  useEffect(() => {
    clearInterval(timer);
  }, [noResultFound]);

  function removeDuplicates(arr) {
    return arr.filter((item, index) => arr.indexOf(item) === index);
  }

  const fetchNews = async () => {
    setLoader(true);
    const url = {
      method: "GET",
      url: "https://api.newscatcherapi.com/v2/search",
      params: {
        q: searchQuery,
        lang: "en",
        page: 1,
        page_size: 10,
      },
      headers: {
        "x-api-key": "2Oyrx9SUpd7Y-FGI7tNpUlLcArXM8ws_btDtJB9ou0w",
      },
    };
    await axios(url)
      .then((result) => {
        setNewsArray(result.data.articles);
        setNoResultFound(Object.keys(result.data.articles).length === 0);
        setTotalPages(result.data.total_pages);
        setLoader(false);
        setPageNumber(2);
        setRefreshButton(false);
        if (!noResultFound) {
          setSeconds(30);
          console.log();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchMoreNews = async () => {
    if (pageNumber < totalPages && pageNumber !== 1) {
      setLoader(true);
      setPageNumber(pageNumber + 1);
      console.log(pageNumber);
      const url = {
        method: "GET",
        url: "https://api.newscatcherapi.com/v2/search",
        params: {
          q: searchQuery,
          lang: "en",
          page: pageNumber,
          page_size: 10,
        },
        headers: {
          "x-api-key": "2Oyrx9SUpd7Y-FGI7tNpUlLcArXM8ws_btDtJB9ou0w",
        },
      };
      await axios(url)
        .then((result) => {
          setNewsArray((prevNews) => {
            return removeDuplicates([...prevNews, ...result.data.articles]);
          });
          setLoader(false);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  useEffect(() => {
    setRefreshButton(false);
    setNoResultFound(false);
    setNewsArray([]);
    if (searchQuery !== "") fetchNews();
  }, [searchQuery]);

  function refresh() {
    setRefreshButton(false);
    setNewsArray([]);
    if (searchQuery !== "") fetchNews();
  }

  const handleScroll = (e) => {
    const bottom =
      e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    if (bottom) {
      fetchMoreNews();
    }
  };
  return (
    <div className="App">
      <header>
        <div id="heading">Latest News Search</div>
      </header>
      <div id="container">
        <p className="timertext">
          {refreshButton && (
            <button
              id="refreshbtn"
              type="button"
              onClick={() => {
                refresh();
              }}
            >
              Refresh News
            </button>
          )}
          {!refreshButton && (
            <>
              Auto refresh in <span className="seconds">{seconds}</span> seconds
            </>
          )}
        </p>
        <Search
          setSearchQuery={setSearchQuery}
          setUseSearchParam={setUseSearchParam}
          useSearchParam={useSearchParam}
        />
        {noResultFound && <div className="no-result">No Result Found</div>}
        <CardsContainer handleScroll={handleScroll} newsArray={newsArray} />
        <div className="loading"></div>
      </div>
    </div>
  );
}

export default App;
