import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavBar from "./Components/NavBar/NavBar";
import Home from "./Pages/Home/Home";
import Books from "./Pages/Books/Books";
import Cart from "./Pages/Cart/Cart";
import ViewBook from "./Pages/ViewBook/ViewBook";
import Login from "./Pages/Login/Login";
import ClientSelectComponent from "./Pages/ClientSelect/ClientSelectComponent";
import RegitserComponent from "./Pages/Register/RegisterComponent";
import PublisherOrderList from "./Pages/PublisherOrder/PunlisherOrderList";
import PublishABook from "./Pages/PublishABook/PublishABook";
import Dashboard from "./Pages/Dashboard/Dashboard";



const App = () => {
  return (
    <Router>
      <NavBar />
      <div className="container mt-4">
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/books" component={Books} />
          <Route path="/cart" component={Cart} />
          <Route path="/viewbook" component={ViewBook} />
          <Route path="/login" component={Login} />
          <Route exact path={"/register"} component={ClientSelectComponent} />
          <Route
            exact
            path={"/register/:userType"}
            component={RegitserComponent}
          />
          <Route exact path={"/publisherorder"} component={PublisherOrderList} />
         
      
          <Route exact path="/" component={ViewBook} />
          <Route exact path={'/publisher/addbook'} component= {PublishABook}></Route>
          <Route path="/" component={ViewBook} />
         
          <Route exact path="/dashboard" component={Dashboard} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
