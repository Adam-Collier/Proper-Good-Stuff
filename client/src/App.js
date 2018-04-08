import React, { Component } from "react";
import MediaQuery from "react-responsive";

// import logo from './logo.svg';
import "./App.css";
import { Header } from "./components/Header";
import { Home } from "./components/Home";
import Profile from "./components/Profile";
import Scroller from "./components/Scroller";
import Utils from "./components/Utils";
import Loader from "./components/Loader";
import { Route, Switch, withRouter } from "react-router-dom";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authentication: false,
      data: [],
      user: "",
      id: "",
      active: false,
      searchString: "",
      isYourSite: true,
      device: "desktop"
    };
  }

  componentWillMount() {
    if (window.location.search) {
      let searchParams = new URLSearchParams(window.location.search.slice(1));
      let token = searchParams.get("token");
      localStorage.setItem("token", token);
      // window.location.href = window.location.href.split('?')[0];
    }
    if (localStorage.getItem("token")) {
      this.setState({ authentication: true });
      this.fetchData();
    }
  }

  fetchData(event) {
    let localS = localStorage.getItem("token");
    return fetch("/api", {
      headers: new Headers({
        jwt: localS
      })
    })
      .then(response => {
        this.setState({
          user: response.headers.get("user"),
          id: response.headers.get("id")
        });
        return response.json();
      })
      .then(fetchedData => {
        if (fetchedData.error) {
          this.logOut();
        } else {
          this.setState({ data: fetchedData });
          return fetchedData;
        }
      });
  }

  switchView = sites => {
    this.setState({ isYourSite: sites });
  };

  logOut(event) {
    this.props.history.push("/");
    this.setState({ authentication: false });
    window.localStorage.clear();
  }

  deviceSwitch = device => {
    console.log("switching bruv");
    device === "desktop"
      ? this.setState({ device: "mobile" })
      : this.setState({ device: "desktop" });
  };

  render() {
    let searchContent = this.state.data.filter(sites => {
      console.log(sites.website);
      return sites.website
        .toLowerCase()
        .includes(this.state.searchString.toLowerCase());
    });
    return (
      <div className="App">
        <MediaQuery query="(min-width: 768px)">
          {console.log("this is desktop width")}
          <Header
            token={this.state.authentication}
            button={this.logOut.bind(this)}
            fData={this.fetchData.bind(this)}
            loader={() => this.setState(prev => ({ active: !prev.active }))}
          />
          <Loader active={this.state.active} />
          {this.state.authentication === false ? null : (
            <Utils
              onTextChange={text => {
                this.setState({ searchString: text });
                console.log(text);
              }}
              device={this.state.device}
              switchView={this.switchView.bind(this)}
              deviceSwitch={this.deviceSwitch.bind(this)}
            />
          )}
          <Switch>
            <Route
              exact
              path="/"
              render={() => {
                return this.state.authentication ? (
                  <div>
                    <Scroller
                      deviceSwitch={this.state.device}
                      signout={this.logOut.bind(this)}
                      fData={searchContent}
                    />
                  </div>
                ) : (
                  <Home />
                );
              }}
            />
            <Route
              render={() => (
                <div>
                  {console.log(this.props)}
                  <Profile
                    switchView={this.state.isYourSite}
                    signout={() => this.logOut()}
                    fData={searchContent}
                    refetchData={this.fetchData.bind(this)}
                    user={this.state.user}
                    id={this.state.id}
                    initialSwitch={this.switchView}
                    deviceSwitch="desktop"
                  />
                </div>
              )}
            />
          </Switch>
        </MediaQuery>
        <MediaQuery query="(max-width: 767px)">
          {console.log("this is desktop width")}
          <Header
            token={this.state.authentication}
            button={this.logOut.bind(this)}
            fData={this.fetchData.bind(this)}
            loader={() => this.setState(prev => ({ active: !prev.active }))}
          />
          <Loader active={this.state.active} />
          {this.state.authentication === false ? null : (
            <Utils
              onTextChange={text => {
                this.setState({ searchString: text });
                console.log(text);
              }}
              device={this.state.device}
              switchView={this.switchView.bind(this)}
              deviceSwitch={this.deviceSwitch.bind(this)}
            />
          )}
          <Switch>
            <Route
              exact
              path="/"
              render={() => {
                return this.state.authentication ? (
                  <div>
                    <Scroller
                      deviceSwitch="mobile"
                      signout={this.logOut.bind(this)}
                      fData={searchContent}
                    />
                  </div>
                ) : (
                  <Home />
                );
              }}
            />
            <Route
              render={() => (
                <div>
                  {console.log(this.props)}
                  <Profile
                    switchView={this.state.isYourSite}
                    signout={() => this.logOut()}
                    fData={searchContent}
                    refetchData={this.fetchData.bind(this)}
                    user={this.state.user}
                    id={this.state.id}
                    initialSwitch={this.switchView}
                    deviceSwitch="mobile"
                  />
                </div>
              )}
            />
          </Switch>
        </MediaQuery>
      </div>
    );
  }
}

export default withRouter(App);
