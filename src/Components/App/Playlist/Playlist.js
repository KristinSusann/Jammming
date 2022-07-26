import React from "react";
import "./Playlist.css";
import { Tracklist } from "../Tracklist/Tracklist";
export class Playlist extends React.Component {
  constructor(props) {
    super(props);
    this.handleNameChange = this.handleNameChange.bind(this);
  }

  handleNameChange(e) {
    this.props.onNameChange(e.target.value);
  }
  render() {
    return (
      <div className="Playlist">
        <input defaultValue={"NewPlaylist"} onChange={this.handleNameChange} />
        <Tracklist
          tracks={this.props.playlistTracks}
          onRemove={this.props.onRemove}
          isRemoval={true}
        />
        <button class="Playlist-save">SAVE TO SPOTIFY</button>
      </div>
    );
  }
}
