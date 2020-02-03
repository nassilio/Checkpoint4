import React from "react";
import { Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import "./reset.css";
import MainPage from "./components/MainPage";
import Search from "./components/Search";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route exact path="/" component={MainPage} />
        <Route path="search" component={Search} />
      </Switch>
    </div>
  );
}

export default App;
