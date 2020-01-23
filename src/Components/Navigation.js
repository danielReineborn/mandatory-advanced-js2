import React from 'react';
import { Router, Link } from 'react-router-dom';

class Navigation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        return (
            <nav className="navbar">

                <div className="nav-links">
                    <p className="link-cont">

                        <Link className="link" to="/movies">HOME</Link>
                    </p>
                    <p className="link-cont">
                        <Link className="link" to="/movies/addmovie">ADD</Link>

                    </p>


                </div>



            </nav>
        )
    }
}

export default Navigation;