import { useState } from "react";
import { Link } from "react-router-dom";
import '../css/Header.css';
import Capgemini_Logo from "../img/Capgemini_Logo.png";



//make it resuable
function Header() {
  const [isNavbarVisible, setIsNavbarVisible] = useState(false);

  const handleNavbarCollapse = () => {
    setIsNavbarVisible(!isNavbarVisible);
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg ">
        <div className="container-fluid">
        <Link className="navbar-brand" href="/">

<img

  src={Capgemini_Logo}

  alt="Capgemini Logo"

  style={{ width: "135px" }}

/>{" "}

| Hire

</Link>
          <button
            className="navbar-toggler"
            type="button"
            onClick={handleNavbarCollapse}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className={`navbar-collapse flex-grow-0 ${
              isNavbarVisible ? "text-start" : "collapse"
            }`}
            id="navbarNav"
          >
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/home">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/Profile">
                  Profile
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/list">
                  List
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/users">
                  {"User Name"}
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/">
                  {"Logout"}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;
