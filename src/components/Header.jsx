import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
class Header extends Component {
    state = {}
    render() {
        return (
            <nav className="navbar-default navbar-static-top hr" style={{ marginBottom: '10px' }}>
                <div className="container-fluid">
                    <NavLink className="nav-item nav-link navbar-brand" to="/">
                        OgidiPharm
                    </NavLink>

                    <ul className="nav navbar-nav navbar-right pull-right">
                        <li>
                            <NavLink className="nav-item nav-link" to="/admin">
                                Admin
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </nav>

        );
    }
}

export default Header;