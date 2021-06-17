import React from "react";
import "./Card.css";
let startTime, currentTime, registrationTime;

function Card({ data }) {
  const getTime = () => {
    currentTime = new Date().getTime();
    if (currentTime > data.registration_end_time * 1000) {
      registrationTime = null;
    } else {
      var options = {
        month: "short",
        day: "numeric",
      };
      var options2 = {
        month: "short",
        day: "numeric",
        year: "numeric",
      };
      let d = new Date(data.registration_end_time * 1000);
      registrationTime = `${d.toLocaleString("en-US", options)}, ${
        d.getHours() > 12 || d.getHours() === 0
          ? Math.abs(d.getHours() - 12)
          : d.getHours()
      }:${d.getMinutes() === 0 ? "00" : d.getMinutes()} ${
        d.getHours() < 12 || d.getHours() === 24 ? "AM" : "PM"
      }`;
      let g = new Date(data.event_start_time * 1000);
      startTime = `${
        g.getHours() > 12 || g.getHours() === 0
          ? Math.abs(g.getHours() - 12)
          : g.getHours()
      }:${g.getMinutes() === 0 ? "00" : g.getMinutes()} ${
        g.getHours() < 12 || g.getHours() === 24 ? "AM" : "PM"
      }, ${g.toLocaleString("en-US", options2)}`;
    }
  };
  getTime();
  return (
    <div className="Card_outer">
      <div className="Card">
        <div className="header">
          <div className="glass">
            <div className="image_container" style={{ position: "relative" }}>
              <div className="glass_main"></div>
              <img className="header_img" src={data.cover_picture} alt="" />
            </div>
          </div>

          {data.event_sub_category === "Upcoming" && (
            <div className="event_status">
              <div className="event_status_container">
                {registrationTime && <div className="circle"></div>}
                {registrationTime ? (
                  <p>
                    Registrations <b>open</b> till <b>{registrationTime}</b>
                  </p>
                ) : (
                  <p>
                    {" "}
                    Registrations <b>closed</b>
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
        <div className="main">
          <p className="event_name">{data.name}</p>
          <div className="details">
            <div className="event_info_item">
              <p className="item_label">
                <b>Starts on</b>
              </p>
              <p className="item_value"> {startTime}</p>
            </div>
            <div className="event_info_item price">
              <p className="item_label">
                <b>Entry Fee</b>
              </p>
              <p className="item_value">
                {data.fees === 0 ? "Free" : `${data.currency} ${data.fees}`}
              </p>
            </div>
            <div className="event_info_item">
              <p className="item_label">
                <b>Venue</b>
              </p>
              <p className="item_value">{data.venue} </p>
            </div>
          </div>
          <div className="short_des">{data.short_desc}</div>
          <div className="tag_container">
            {data.card_tags &&
              data.card_tags.map((c) => {
                return <div className="tag">{c}</div>;
              })}
          </div>
        </div>
        <div className="footer">
          <div className="registered_users">
            <div className="profile_container">
              {data.registered_users.top_users &&
                data.registered_users.top_users.map((c) => {
                  return (
                    <div>
                      <img
                        src={
                          c.image_url && c.image_url !== ""
                            ? c.image_url
                            : "https://files.codingninjas.in/0000000000001270.png"
                        }
                        className="users_img"
                        alt=""
                      />
                    </div>
                  );
                })}
            </div>
            <p className="count_profile">
              {data.registered_users.show_users_count &&
                `and ${data.registered_users.other_users_count} others registered`}
            </p>
          </div>
          {registrationTime && (
            <div className="status">
              <img
                style={{ height: "30px" }}
                src="https://files.codingninjas.in/0000000000001272.png"
                alt="Register"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Card;
