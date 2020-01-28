import React from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { Helmet } from "react-helmet";
import Navigation from "./Navigation";

class EditMovie extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            description: "",
            director: "",
            rating: "",
            redirect: false,
            invalidFormat: false,
        }
    }

    componentDidMount() {
        console.log("this happens")
        axios.get(`http://3.120.96.16:3001/movies/${this.props.match.params.id}`)
            .then((response) => {
                console.log(response.data);
                response = response.data;
                this.setState({
                    title: response.title,
                    description: response.description,
                    director: response.director,
                    rating: response.rating,
                })
            })
            .catch((err) => { //Testa dessa!
                if (err.response.status === 404) {
                    alert("Error 404, movie does not exist.");
                    this.setState({
                        redirect: true,
                    })
                }
            })


    }

    onSubmit = (e) => {
        e.preventDefault();
        let newMovie = {
            title: this.state.title,
            description: this.state.description,
            director: this.state.director,
            rating: this.state.rating,
        }
        axios.put(`http://3.120.96.16:3001/movies/${this.props.match.params.id}`, newMovie)
            .then(() => {
                this.setState({
                    redirect: true,
                })
            })
            .catch((err) => {
                console.log(err.response);
                if (err.response.status === 400) {
                    this.setState({
                        invalidFormat: true,
                    })

                } else if (err.response.status === 404) {
                    alert("Error 404: Movie does not exist.");
                    this.setState({
                        redirect: true,
                    })
                }
            })
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }



    //Kolla upp lite om validering! Frontend vali.
    render() {
        if (this.state.redirect) {
            return <Redirect to="/movies" />
        }

        let invalidForm = null;
        if (this.state.invalidFormat) {
            invalidForm = <div className="invalinfo-cont">
                <h1>Error</h1>
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
                    <title>Edit movie</title>
                </Helmet>
                <Navigation></Navigation>
                <div className="form-cont">
                    <h3 className="font">Edit movie:</h3>
                    <form className="form font" onSubmit={this.onSubmit}>
                        <label htmlFor="title" >Insert title:</label><br />
                        <input required maxLength="40" value={this.state.title} onChange={this.onChange} type="text" name="title" id="title" /><br />
                        <label htmlFor="director">Name of director:</label><br />
                        <input required maxLength="40" value={this.state.director} onChange={this.onChange} type="text" name="director" id="director" /><br />
                        <label htmlFor="rating" step="any">Rate the movie:</label><br />
                        <input required min="1" max="5" value={this.state.rating} onChange={this.onChange} name="rating" type="number" /><br />
                        <label htmlFor="description">Short description of the movie:</label><br />
                        <textarea required maxLength="300" value={this.state.description} onChange={this.onChange} type="text" name="description" id="description" rows="5" cols="30"></textarea><br />
                        <input className="btn-standard" onSubmit={this.onSubmit} type="submit" value="Update details" />
                    </form>

                    {invalidForm}
                </div>


            </section>
        )
    }
}

export default EditMovie;