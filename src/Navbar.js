import React from "react";
import "./Navbar.css";
function Navbar() {
  return (
    <div className="Navbar">
      <div className="header_container">
        <div className="hamburger">
          <div className="stick"></div>
          <div className="stick"></div>
          <div className="stick"></div>
        </div>
        <div className="header_container_left">
          <a
            className="passive_link"
            href="https://www.codingninjas.com/"
            target="_blank"
            rel="noreferrer"
          >
            <img
              className="header_image"
              src="https://www.codingninjas.com/assets-landing/images/CNLOGO.svg"
              alt="fd"
            />
          </a>
          <ul className="menu_items">
            <li>Home</li>
            <li className="courses">
              <div>Courses</div>
              <div className="dropdown_arrow_courses">
                <img
                  src="https://files.codingninjas.in/angle-down-solid-5030.svg"
                  alt="down-arrow"
                />
              </div>
            </li>
            <li className="practice">
              <div className="practice_first">
                <div>Practice</div>
                <div className="practice_first_img">
                  <img
                    src="https://www.codingninjas.com/assets-landing/images/new-tag.svg"
                    alt="new"
                  />
                </div>
              </div>
              <div className="dropdown_arrow_practice">
                <img
                  src="https://files.codingninjas.in/angle-down-solid-5030.svg"
                  alt="down-arrow"
                />
              </div>
            </li>
            <li>Events</li>
            <li>Campus Ninjas</li>
            <li>Blog</li>
            <li className="camp">
              <img
                src="https://files.codingninjas.in/cc-desktop-2-5363.svg"
                alt="Ninjas Carrer Camp"
              />
            </li>
          </ul>

          <div className="header_container_left_elements"></div>
        </div>
        <div className="header_container_right">
          <div style={{ display: "flex" }}>
            <div className="classroom">
              <a
                className="passive_link"
                href="https://classroom.codingninjas.com/app/classroom"
                target="_blank"
                rel="noreferrer"
              >
                <div className="classroom_button">My Classroom</div>
              </a>
            </div>
          </div>
          <div>
            <div className="login_button">Login</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
