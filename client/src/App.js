import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import { Header } from './components/Header'
import { Home } from './components/Home'
import Scroller from './components/Scroller'
import { Utils } from './components/Utils'

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      authentication: false
    }
  }

  componentWillMount(){
    if (window.location.search){
      let searchParams = new URLSearchParams(window.location.search.slice(1));
      let token = searchParams.get('token');
      localStorage.setItem('token', token);
      window.location.href = window.location.href.split('?')[0];
    }
    if(localStorage.getItem('token')){
      this.setState({authentication: true})
    }
  }

  logOut(event) {
    this.setState({ authentication: false })
    window.localStorage.clear();
  }

  render() {
    return (
      <div className="App">
        <Header token={this.state.authentication} button={this.logOut.bind(this)}/>
        {this.state.authentication ? (
          <div>
            <Utils />
            <Scroller signout={this.logOut.bind(this)}/>
          </div>
        ):(
          <Home />
        )}
      </div>
    );
  }
}

export default App;
