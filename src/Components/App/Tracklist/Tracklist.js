import React from "react";
import "./Tracklist.css";
import { Track } from "../Track/Track";

export class Tracklist extends React.Component {
  render() {
    return (
      <div class="TrackList">
        {this.props.tracks.map((track) => {
          return (
            <Track
              track={track}
              key={track.id}
              name={track.name}
              album={track.album}
              artist={track.artist}
              onAdd={this.props.onAdd}
              onRemove={this.props.onRemove}
              isRemoval={this.props.isRemoval}
            />
          );
        })}
      </div>
    );
  }
}
