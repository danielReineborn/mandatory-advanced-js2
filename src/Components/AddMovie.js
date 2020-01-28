import React from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { Helmet } from "react-helmet";
import Navigation from "./Navigation";


class AddMovie extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({
            title: "",
            description: "",
            director: "",
            rating: "",
            redirect: false,
            invalidFormat: false,
        })
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

    }

    onSubmit(e) {
        e.preventDefault();
        let newMovie = {
            title: this.state.title,
            description: this.state.description,
            director: this.state.director,
            rating: this.state.rating,
        }

        axios.post("http://3.120.96.16:3001/movies", newMovie)
            .then(() => {
                this.setState({
                    title: "",
                    description: "",
                    director: "",
                    rating: "",
                    redirect: true,
                })

            })
            .catch((err) => {
                console.error(err)
                this.setState({
                    invalidFormat: true,
                })
            })


    }
    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    render() {
        console.log(this.state);
        if (this.state.redirect) {
            return <Redirect to="/movies" />

        }
        let invalidForm = null;
        if (this.state.invalidFormat) {
            invalidForm = <div className="invalinfo-cont">
                <h1>Error:</h1>
                <p>Invalid formatting:</p>
                <ul>
                    <li>Title: 1-40 characters.</li>
                    <li>Director: 1-40 characters.</li>
                    <li>Rating: number between 0.0-5.0.</li>
                    <li>Description: 1-300 characters.</li>
                </ul>
            </div>
        }
        return (
            <section className="bg-main">
                <Helmet>
                    <title>Add movie</title>
                </Helmet>
                <Navigation></Navigation>
                <div className="form-cont">
                    <h3 className="font">Add new movie:</h3>

                    <form className="form font" onSubmit={this.onSubmit}>
                        <label htmlFor="title" >Insert title:</label><br />
                        <input required maxLength="40" value={this.state.title} onChange={this.onChange} type="text" name="title" id="title" /><br />
                        <label htmlFor="director">Name of director:</label><br />
                        <input required maxLength="40" value={this.state.director} onChange={this.onChange} type="text" name="director" id="director" /><br />
                        <label htmlFor="rating">Rate the movie:</label><br />
                        <input required min="0.0" max="5.0" value={this.state.rating} onChange={this.onChange} name="rating" type="number" step="0.1" /><br />
                        <label htmlFor="description">Short description of the movie:</label><br />
                        <textarea required maxLength="300" value={this.state.description} onChange={this.onChange} type="text" name="description" id="description" rows="5" cols="30"></textarea><br />
                        <input className="btn-standard" onSubmit={this.onSubmit} type="submit" value="Add movie" />
                    </form>

                    {invalidForm}
                </div>
            </section>

        )
    }
}

export default AddMovie;