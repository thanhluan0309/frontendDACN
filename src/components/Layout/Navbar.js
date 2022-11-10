import { useNavigate } from "react-router-dom";
import * as Icon from "react-bootstrap-icons";
export const Navbar = () => {
  let username = localStorage.getItem("username");
  let nav = useNavigate();
  const Logout = () => {
    localStorage.clear();
    nav("/login");
    window.location.reload();
  };
  return (
    <>
      <nav className="navbar border navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <span className="navbar-brand" href="#">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3209/3209265.png"
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt=""
            />
            Smart-note
          </span>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item dropdown">
                <span
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  User account
                </span>
                <ul className="dropdown-menu " aria-labelledby="navbarDropdown">
                  <li className="dropdown-item" style={{ cursor: "pointer" }}>
                    <Icon.Gear></Icon.Gear> Setting account
                  </li>
                  <li
                    onClick={Logout}
                    className="dropdown-item"
                    style={{ cursor: "pointer" }}
                  >
                    <Icon.BoxArrowDownLeft></Icon.BoxArrowDownLeft> Log out
                  </li>
                </ul>
              </li>
              <li className="nav-item disabled">
                <span className="nav-link disabled" aria-disabled="true">
                  Well come back {username}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};
