import React from "react";
import { Search } from "@material-ui/icons";

// Lyft state till main och map ut svaren från sökningen.
class Filter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: "",
            clicked: false,
        }
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.setState({
            clicked: false,
        })
    }

    onChange = (e) => {
        this.setState({
            value: e.target.value
        })
    }

    search = () => {
        this.props.filterVal(this.state.value);
    }

    onClick = () => {
        this.setState({
            clicked: true,
        })
    }

    render() {

        let input = null;
        if (this.state.clicked) {
            input = <form autoComplete="off" onSubmit={this.onSubmit}><input value={this.state.value} onChange={this.onChange} onKeyUp={this.search} className="search-input" type="search" placeholder="Search..." name="search" id="search" /></form>
        }
        return (
            <div className="filter">
                <div>
                    <Search style={{ color: "white", }} onClick={this.onClick} className="btn-search"></Search>
                </div>
                {input}
            </div>
        )
    }
}

export default Filter;