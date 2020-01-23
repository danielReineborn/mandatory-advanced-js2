import React from "react";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";
import { Close } from "@material-ui/icons";


class DeleteMovie extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({

        })
        this.deleteMovie = this.deleteMovie.bind(this);
    }

    deleteMovie() {
        axios.delete(`http://3.120.96.16:3001/movies/${this.props.id}`)
            .then(this.props.deleteDone)

    }

    render() {
        return (
            <Close className="delete" onClick={this.deleteMovie}>Delete</Close>
        )
    }
}

export default DeleteMovie;