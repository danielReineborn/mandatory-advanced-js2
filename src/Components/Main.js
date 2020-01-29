import React from "react";
import axios from "axios";
import DeleteMovie from "./DeleteMovie";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import Navigation from "./Navigation";
import Filter from "./Filter";

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({
            movies: [],
            isDeleted: false,
            value: "",
        })
        this.getMovies = this.getMovies.bind(this);
    }

    componentDidMount() {
        this.getMovies();
    }

    filterVal = (value) => {
        this.setState({
            value,
        })

    }

    getMovies() {
        axios.get("http://3.120.96.16:3001/movies")
            .then((response) => {
                response = response.data;
                return response;
            })
            .then((response) => {
                this.setState({
                    movies: response,
                })

            })
            .catch((err) => {
                console.error(err)
            });
    }


    deleteDone = () => {
        this.getMovies();
    }

    filteredMovies = () => {
        let value = this.state.value;
        return this.state.movies.filter((x) => {
            return x.title.toUpperCase().includes(value.toUpperCase()) ||
                x.director.toUpperCase().includes(value.toUpperCase());

        })
    }

    showQuote = () => {
        let quotes = ["E.T. phone home. - E.T the Extra-Terrestrial",
            `"You had me at hello. - Jerry Maguire"`,
            `"To infinity and beyond! - Toy Story"`,
            `"Houston, we have a problem - Apollo 13"`,
            `"Shaken, not stirred - Goldfinger"`,
            `"I'm the king of the World. - Titanic"`,
            `"Mama says, stupid is as stupid does. - Forrest Gump"`,
            `"Just keep swimming. - Finding Nemo"`,
            `"I'm having an old friend for dinner. - The Silence of the Lambs"`];

        let random = Math.floor(Math.random() * quotes.length);
        let quote = quotes[random];
        return quote;

    }

    render() {
        return (
            <div className="bg-main">
                <Helmet>
                    <title>Home - movielibrary</title>
                </Helmet>
                <Navigation>
                </Navigation>
                <div className="table-cont">
                    <Filter filterVal={this.filterVal} movies={this.state.movies}></Filter>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Title:</th>
                                <th>Director:</th>
                                <th>Rating:</th>
                                <th></th>
                                <th></th>
                                <th></th>

                            </tr>
                        </thead>
                        <tbody>
                            {this.filteredMovies().map((x) => {
                                return <tr key={x.id}>
                                    <td>{x.title}</td>
                                    <td>{x.director}</td>
                                    <td>{x.rating}</td>
                                    <td>{<Link className="btn-link" to={`/movies/editmovie/${x.id}`}>[EDIT]</Link>}</td>
                                    <td>{<Link className="btn-link" to={`/movies/moviedetail/${x.id}`}>[DETAIL]</Link>}</td>
                                    <td>{<DeleteMovie deleteDone={this.deleteDone} id={x.id}></DeleteMovie>}</td>
                                </tr>
                            })}
                        </tbody>
                    </table>

                    <p className="quote">{this.showQuote()}</p>
                </div>

            </div>
        )
    }
}


export default Main;