import React from 'react';
import './App.css';
import Main from "./Components/Main";
import AddMovie from "./Components/AddMovie";
import EditMovie from "./Components/EditMovie";
import MovieDetail from "./Components/MovieDetail";
import { BrowserRouter as Router, Route } from "react-router-dom";


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      value: "",
    })
  }

  render() {
    return (

      <div className="main">
        <Router>

          <Route exact path="/" component={Main}></Route>

          <Route exact path="/movies" component={Main}></Route>
          <Route exact path="/movies/addmovie" component={AddMovie}></Route>
          <Route path="/movies/editmovie/:id" component={EditMovie}></Route>
          <Route path="/movies/moviedetail/:id" component={MovieDetail}></Route>

        </Router>

      </div >

    );

  }
}

export default App;
