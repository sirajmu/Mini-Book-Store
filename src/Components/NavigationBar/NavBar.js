import { Link } from "react-router-dom";
const Navbar = () => {

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light p-3">
      <div className="container">
        <Link className="navbar-brand" to="/">BookStore</Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/login">Login</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/admin/add-book">Add Book</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

