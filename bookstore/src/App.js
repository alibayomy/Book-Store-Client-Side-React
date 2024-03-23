import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavBar from "./Components/NavBar/NavBar";
import Home from "./Pages/Home/Home";
import Books from "./Pages/Books/Books";
import Cart from "./Pages/Cart/Cart";
import Checkout from "./Pages/Checkout/Checkout";
import ViewBook from "./Pages/ViewBook/ViewBook";
import Login from "./Pages/Login/Login";
import ClientSelectComponent from "./Pages/ClientSelect/ClientSelectComponent";
import RegitserComponent from "./Pages/Register/RegisterComponent";
import FilterBooks from "./Pages/FilterPage/FilterPage";
import FilterPrice from "./Pages/FilterPage/FilterPrice";
import PublisherOrderList from "./Pages/PublisherOrder/PunlisherOrderList";
import PublishABook from "./Pages/PublishABook/PublishABook";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Search from "./Pages/Search/Search";
import { AuthContext, AuthProvider } from "./Context/AuthContext";
import PrivateRoute from "./Network/PrivateRoute";
import test from "./Pages/Test/test";
import Profile from "./Pages/Profile/Profile";
import PublisherPrivateRoute from "./Network/PublisherPriavteRoute";
import UpdateABook from "./Pages/UpdateABook/UpdateABook";
import PublisherBooks from "./Pages/PublisherBooks/PublihserBooks";
import CheckoutPage from "./Pages/CheckoutPage/CheckoutPage";

const App = () => {
  // JWT Authen
  const [contextAuth, setContextAuth] = useState(null);

  return (
    <AuthProvider>
      <Router>
        <NavBar />
        <div className="container mt-4">
          <Switch>
            <PrivateRoute
              exact
              component={PublishABook}
              path={"/publisher/addbook"}
            ></PrivateRoute>
            <PrivateRoute exact component={test} path={"/test"}></PrivateRoute>
            <Route path="/" exact component={Home} />
            <PrivateRoute path="/profile/:user_id" exact component={Profile} />
            <Route path="/books" component={Books} />
            <Route path="/checkout" component={CheckoutPage} />
            <Route path="/viewbook/:id" component={ViewBook} />
            <Route exact path={"/filter"} component={FilterBooks} />
            <Route exact path={"/filterPrice"} component={FilterPrice} />
            <Route path="/cart" component={Cart} />
            <Route path="/checkout" component={Checkout} />
            <Route path="/login" component={Login} />
            <Route exact path={"/register"} component={ClientSelectComponent} />
            <Route
              exact
              path={"/register/:userType"}
              component={RegitserComponent}
            />
            <Route exact path="/search" component={Search} />
            <Route
              exact
              path={"/publisherorder"}
              component={PublisherOrderList}
            />
            <Route
              exact
              path={"/publisher/addbook"}
              component={PublishABook}
            ></Route>
            <PublisherPrivateRoute
              exact
              path="/dashboard"
              component={Dashboard}
            />
            <PublisherPrivateRoute
              exact
              path={"/publisher/updatebook/:id"}
              component={UpdateABook}
            />
            <PublisherPrivateRoute
              exact
              path={"/publisher/books"}
              component={PublisherBooks}
            />
            <Route exact path="/test" component={test}></Route>
          </Switch>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
