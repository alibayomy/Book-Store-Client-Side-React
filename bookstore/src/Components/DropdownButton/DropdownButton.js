import React, { useState, useEffect, useRef, useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faSignOut } from "@fortawesome/free-solid-svg-icons";
import "./DropdownButton.css";

function DropdownButton({ title, links }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const { logoutUser } = useContext(AuthContext);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = () => {
    setIsOpen(false); // Close the dropdown menu when an item is clicked
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false); // Close the dropdown menu when clicking outside of it
      }
    }

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div ref={dropdownRef} className="dropdown">
      <button
        className="outline-button-nav dropdown-toggle"
        onClick={toggleDropdown}
      >
        <FontAwesomeIcon icon={faUser} />
        {title}
      </button>
      <div
        className={`dropdown-menu bg-body-tertiary p-3 ${isOpen ? "show" : ""}`}
      >
        <Link
          className="nav-link dropdown-item d-block mb-3 drop-items"
          to="/profile"
        >
          <FontAwesomeIcon className="me-2" icon={faUser} size="sm" />
          <span>My Profile</span>
        </Link>
        <Link
          className="nav-link dropdown-item d-block drop-items"
          onClick={logoutUser}
          to="/login"
        >
          <FontAwesomeIcon className="me-2" icon={faSignOut} size="sm" />
          <span>Logout</span>
        </Link>
      </div>
    </div>
  );
}

export default DropdownButton;
