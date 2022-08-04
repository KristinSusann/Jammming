import React from "react";
import "./SearchBar.css";

export class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = { term: "" };

    this.search = this.search.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this);
  }
  search() {
    console.log("onSearch :" + this.state.term + this.props.onSearch);
    this.props.onSearch(this.state.term);
  }

  handleTermChange(e) {
    //this.search(e.target.value);

    this.setState({ term: e.target.value });
  }

  render() {
    return (
      <div className="SearchBar">
        <input
          placeholder="Enter A Song, Album, or Artist"
          onChange={this.handleTermChange}
        />
        <button className="SearchButton" onClick={this.search}>
          SEARCH
        </button>
      </div>
    );
  }
}
