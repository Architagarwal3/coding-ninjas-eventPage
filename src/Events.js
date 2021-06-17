import React, { useState, useEffect, useRef } from "react";
import "./Events.css";
import axios from "./axios.js";
import Card from "./Card.js";
const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop);

function Events() {
  const myRef = useRef(null);
  const executeScroll = () => scrollToRef(myRef);
  const [activeCatagory, setActiveCatagory] = useState("ALL_EVENTS");
  const [activeSubCatagory, setActiveSubCatagory] = useState("Upcoming");
  const [showTag, setShowTag] = useState(true);
  const [firsttags, setFirstTags] = useState(null);
  const [secondtags, setSecondTags] = useState(null);
  const [selectedTags, setSelectedTags] = useState([]);
  const [data, setData] = useState(null);
  const [pageCount, setPageCount] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(
        `events?event_category=${activeCatagory}&event_sub_category=${activeSubCatagory}&tag_list=${
          selectedTags === [] ? "" : selectedTags
        }&offset=${offset}`
      );
      setData(request.data.data.events);
      setPageCount(request.data.data.page_count);

      return request;
    }
    fetchData();
  }, [activeCatagory, activeSubCatagory, selectedTags, pageCount, offset]);
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get("event_tags");
      let temp = request.data.data.tags;
      setFirstTags(temp.slice(0, 12));
      setSecondTags(temp.slice(12, 23));
      return request;
    }
    fetchData();
  }, []);
  const updatePage = (e) => {
    setCurrentPage(e.target.value);
  };
  const updateSelectedTag = (current) => {
    setOffset(0);
    setCurrentPage(1);
    let temp = selectedTags;
    if (temp.includes(current)) {
      let i = temp.indexOf(current);
      temp.splice(i, 1);
      temp = (prev) => [...prev];
    } else {
      temp = (prev) => [...prev, current];
    }
    setSelectedTags(temp);
  };
  const tagdisplay = () => {
    setShowTag(false);
  };
  const updateCatagory = (i) => {
    setActiveCatagory(i);
    setSelectedTags([]);
    setActiveSubCatagory("Upcoming");
    setCurrentPage(1);
    setOffset(0);
  };
  const updateSubCatagory = (i) => {
    setActiveSubCatagory(i);
    setSelectedTags([]);
    setCurrentPage(1);
    setOffset(0);
  };

  return (
    <div className="Events" ref={myRef}>
      <div className="Events_wrapper">
        <div className="Events_catagories">
          <div
            className={
              activeCatagory === "ALL_EVENTS"
                ? "catagories active"
                : "catagories"
            }
            onClick={() => updateCatagory("ALL_EVENTS")}
          >
            <img
              src={`https://www.codingninjas.com/assets-landing/images/all-events-${
                activeCatagory === "ALL_EVENTS" ? "selected" : "unselected"
              }.svg`}
              alt=""
            />
            All Events
          </div>
          <div
            className={
              activeCatagory === "WEBINAR" ? "catagories active" : "catagories"
            }
            onClick={() => updateCatagory("WEBINAR")}
          >
            <img
              alt=""
              src={`https://www.codingninjas.com/assets-landing/images/webinar-${
                activeCatagory === "WEBINAR" ? "selected" : "unselected"
              }.svg`}
            />
            Webinars
          </div>
          <div
            className={
              activeCatagory === "CODING_EVENT"
                ? "catagories active"
                : "catagories"
            }
            onClick={() => updateCatagory("CODING_EVENT")}
          >
            <img
              alt=""
              src={`https://www.codingninjas.com/assets-landing/images/coding-events-${
                activeCatagory === "CODING_EVENT" ? "selected" : "unselected"
              }.svg`}
            />
            Coding Events
          </div>
          <div
            className={
              activeCatagory === "BOOTCAMP_EVENT"
                ? "catagories active"
                : "catagories"
            }
            onClick={() => updateCatagory("BOOTCAMP_EVENT")}
          >
            <img
              alt=""
              src={`https://files.codingninjas.in/bootcamp_events_${
                activeCatagory === "BOOTCAMP_EVENT"
                  ? "selected-5398.png"
                  : "unselected-5397.png"
              }`}
            />
            Bootcamp Events
          </div>
          <div
            className={
              activeCatagory === "WORKSHOP" ? "catagories active" : "catagories"
            }
            onClick={() => updateCatagory("WORKSHOP")}
          >
            <img
              alt=""
              src={`https://files.codingninjas.in/workshop_${
                activeCatagory === "WORKSHOP"
                  ? "selected-5396.png"
                  : "unselected-5395.png"
              }`}
            />
            Workshop
          </div>
        </div>
        <div className="Events_subcatagories">
          <div
            className={
              activeSubCatagory === "Upcoming"
                ? "subcatagories active"
                : "subcatagories"
            }
            onClick={() => updateSubCatagory("Upcoming")}
          >
            Upcoming
          </div>
          <div
            className={
              activeSubCatagory === "Archived"
                ? "subcatagories active"
                : "subcatagories"
            }
            onClick={() => updateSubCatagory("Archived")}
          >
            Archived
          </div>
          <div
            className={
              activeSubCatagory === "All Time Favorites"
                ? "subcatagories active"
                : "subcatagories"
            }
            onClick={() => updateSubCatagory("All Time Favorites")}
          >
            All Time Favorites
          </div>
        </div>
        <div className="Events_body">
          <div className="cards_container">
            {data && data.length !== 0 && (
              <div className="events_container">
                {data &&
                  data.length !== 0 &&
                  data.map((c, index) => {
                    return <Card key={index} data={c} />;
                  })}
              </div>
            )}
            {(!data || data.length === 0) && (
              <p className="no_event"> No events found </p>
            )}

            {data && data.length !== 0 && (
              <div className="landing_page">
                <div
                  className={
                    currentPage > 1
                      ? "landing_page_arrow"
                      : "landing_page_arrow disabled"
                  }
                  onClick={() => {
                    executeScroll();
                    setCurrentPage(currentPage - 1);
                    setOffset((currentPage - 1) * 20);
                  }}
                >
                  <img
                    src="https://files.codingninjas.in/left-arrow-5581.svg"
                    alt="prev"
                  />
                </div>
                <div className="input_box">
                  Page
                  <input
                    type="number"
                    min="1"
                    value={currentPage}
                    onChange={updatePage}
                    onKeyPress={(event) => {
                      if (event.key === "Enter") {
                        executeScroll();
                        if (currentPage > pageCount) {
                          setCurrentPage(1);
                          setOffset(0);
                        } else setOffset((currentPage - 1) * 20);
                      }
                    }}
                  />
                  of {pageCount}
                </div>
                <div
                  className={
                    currentPage < pageCount
                      ? "landing_page_arrow"
                      : "landing_page_arrow disabled"
                  }
                  onClick={() => {
                    executeScroll();
                    setCurrentPage(currentPage + 1);
                    setOffset((currentPage - 1) * 20);
                  }}
                >
                  <img
                    src="https://files.codingninjas.in/right-arrow-5582.svg"
                    alt="next"
                  />
                </div>
              </div>
            )}
          </div>
          <div className="tags_container">
            <div className="heading">Tags</div>
            <div className="tags_wrapper">
              {firsttags &&
                firsttags.map((current) => {
                  return (
                    <div
                      className={`tags ${
                        selectedTags.includes(current) ? "selected" : ""
                      }`}
                      onClick={() => {
                        updateSelectedTag(current);
                      }}
                    >
                      <p>{current}</p>
                    </div>
                  );
                })}
              {!showTag &&
                selectedTags &&
                secondtags.map((current) => {
                  return (
                    <div
                      className={`tags ${
                        selectedTags.includes(current) ? "selected" : ""
                      }`}
                      onClick={() => {
                        updateSelectedTag(current);
                      }}
                    >
                      <p>{current}</p>
                    </div>
                  );
                })}
            </div>
            {showTag && (
              <div className="count" onClick={tagdisplay}>
                See 10 more tags
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Events;
