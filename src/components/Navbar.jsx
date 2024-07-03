import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../store/AuthContext'; // Import AuthContext
import '../style/Navbar.css'; // Import custom CSS file

const NavBar = () => {
    const navigate = useNavigate();
    const { isLoggedIn, logout } = useAuth(); // Use isLoggedIn and logout from AuthContext

    const handleLoginClick = () => {
        navigate("/login");
    };

    const handleLogoutClick = () => {
        // Implement logout functionality
        logout();
        navigate("/login"); // Example: navigate to login page after logout
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm" style={{ height: '125%' }}>
            <div className="container">
                <NavLink to="/" className="navbar-brand fs-5"> {/* fs-5 for font-size */}
                    SLIP GENERATOR
                </NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-center" id="navbarSupportedContent">
                    <ul className="navbar-nav mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink exact to="/" className="nav-link" activeClassName="active">
                                Home
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/save-slip" className="nav-link" activeClassName="active">
                                SAVE SLIP
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/slip-history" className="nav-link" activeClassName="active">
                                SLIP HISTORY
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/slip-details" className="nav-link" activeClassName="active">
                                SLIP DETAILS
                            </NavLink>
                        </li>
                    </ul>
                </div>
                <div className="d-flex align-items-center">
                    {isLoggedIn ? (
                        <button className="btn btn-outline-dark me-2" onClick={handleLogoutClick}>Logout</button>
                    ) : (
                        <button className="btn btn-outline-dark me-2" onClick={handleLoginClick}>Login</button>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
