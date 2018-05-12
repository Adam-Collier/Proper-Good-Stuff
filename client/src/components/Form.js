import React, { Component } from "react";

export default class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      siteTitle: "",
      siteUrl: ""
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    let localS = localStorage.getItem("token");
    // alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
    console.log(this.props.fData());

    let siteUrl =
      this.state.siteUrl.includes("http") === true
        ? this.state.siteUrl
        : `https://${this.state.siteUrl}`;

    let self = this;

    let errorStrip = errorText => {
      return `
<div class="error">${errorText}</div>
`;
    };

    fetch(siteUrl, {
      method: "get",
      headers: new Headers({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }),
      mode: "no-cors"
    })
      .then(function(response) {
        let info = { url: self.state.siteUrl, title: self.state.siteTitle };
        self.props.loaderInfo(info);
        self.props.fData();

        fetch("/api", {
          method: "POST",
          body: JSON.stringify({
            website: self.state.siteUrl,
            title: self.state.siteTitle
          }),
          headers: new Headers({
            "Content-Type": "application/json",
            jwt: localS
          })
        })
          .then(response => {
            return response.json();
          })
          .then(data => {
            let updatedInfo = {
              url: self.state.siteUrl,
              title: self.state.siteTitle,
              desktop: data.info.desktop,
              mobile: data.info.mobile,
              author: data.author
            };
            // self.props.loader();
            self.props.loaderInfo(updatedInfo);
            self.props.fData();
            // document.querySelector(".loader").classList.add("loaded");
          });
        self.setState({ siteTitle: "", siteUrl: "" });
      })
      .catch(function(err) {
        console.log(err);
        if (err) {
          document
            .querySelector("form")
            .insertAdjacentHTML(
              "beforeEnd",
              errorStrip("please enter a valid URL")
            );
          setTimeout(() => {
            document.querySelector(".error").remove();
          }, 2000);
          self.setState({ siteTitle: "", siteUrl: "" });
          return;
        }
      });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          placeholder="title"
          name="siteTitle"
          value={this.state.siteTitle}
          onChange={this.handleInputChange}
        />
        <input
          type="text"
          placeholder="url"
          name="siteUrl"
          value={this.state.siteUrl}
          onChange={this.handleInputChange}
        />
        <input type="submit" value="Add site" />
      </form>
    );
  }
}
