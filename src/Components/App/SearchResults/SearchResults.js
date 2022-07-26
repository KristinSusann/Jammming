import React from "react";
import ReactDOM from "react-dom";
import "./SearchResults.css";
import { Tracklist } from "../Tracklist/Tracklist";

export class SearchResults extends React.Component {
  render() {
    return (
      <div className="SearchResults">
        <h2>Results</h2>
        <Tracklist
          tracks={this.props.searchResults}
          onAdd={this.props.onAdd}
          isRemoval={false}
        />
      </div>
    );
  }
}
