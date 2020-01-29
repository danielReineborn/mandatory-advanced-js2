import React from "react";
import axios from "axios";
import { Helmet } from "react-helmet";
import { Link, Redirect } from "react-router-dom";
import Navigation from "./Navigation";

class MovieDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            movie: {},
            redirect: false,
        }
    }

    componentDidMount() {
        axios.get(`http://3.120.96.16:3001/movies/${this.props.match.params.id}`)
            .then((response) => {
                response = response.data;
                return response;
            })
            .then((response) => {
                this.setState({
                    movie: response,
                })
            })
            .catch((err) => {
                console.error(err);
                if (err.response.status === 404) {
                    alert("Error 404, movie does not exist.");
                    this.setState({
                        redirect: true,
                    })
                }
            })
    }



    render() {

        if (this.state.redirect) {
            return <Redirect to="/movies" />
        }
        return (
            <div className="bg-main">
                <Helmet>
                    <title>Movie details</title>
                </Helmet>
                <Navigation></Navigation>

                <div className="form-cont">
                    <h1 className="font title">{this.state.movie.title}</h1>
                    <p className="font">Short description: {this.state.movie.description}</p>
                    <p className="font">Made by: {this.state.movie.director}</p>
                    <p className="font">Rating: {this.state.movie.rating}</p>
                    <Link to={`/movies/editmovie/${this.props.match.params.id}`}><button className="btn-standard" >Edit details</button></Link>

                </div>


            </div>
        )
    }
}

export default MovieDetail;