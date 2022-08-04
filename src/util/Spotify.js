let accessToken;
const clientId = "710fcbb3206b41a1884ce89e249ab3e2";
const redirectURI = "http://kristins-jammm.surge.sh";

export const Spotify = {
  getAccessToken() {
    console.log("getting access token");
    if (accessToken) {
      console.log("access token already there" + accessToken);
      return accessToken;
    }

    alert(window.location);
    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

    if (accessTokenMatch && expiresInMatch) {
      console.log("accessToken Match" + accessTokenMatch + expiresInMatch);
      accessToken = accessTokenMatch[1];
      const expiresIn = Number(expiresInMatch[1]);

      console.log(
        "accessToken: " + accessToken + "   expires in:  " + expiresIn
      );
      window.setTimeout(() => (accessToken = ""), expiresIn * 1000);
      window.history.pushState("Access Token", null, "/");
      return accessToken;
    } else {
      const accessURL = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
      window.location = accessURL;
      console.log("new accessUrl" + accessURL);

      console.log("new accessUrl" + accessURL);
    }
  },

  savePlaylist(playlistName, tracks) {
    console.log("saving Playlist" + playlistName + tracks);
    if (!playlistName || !tracks) {
      console.log("saving aborted");
      return;
    }
    const accessToken = this.getAccessToken();
    const header = { Authorization: `Bearer ${accessToken}` };

    let userId;

    return fetch("https://api.spotify.com/v1/me", { headers: header })
      .then((response) => response.json())
      .then((data) => {
        userId = data.id;
        console.log("userID: " + userId);
        fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
          headers: header,
          method: "POST",
          body: JSON.stringify({ name: playlistName }),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            const playlistId = data.id;

            fetch(
              `https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`,
              {
                headers: header,
                method: "POST",
                body: JSON.stringify({ uris: tracks }),
              }
            ).then((response) => console.log(response));
          });
      });
  },

  search(searchTerm) {
    console.log("searching");
    const accessToken = Spotify.getAccessToken();
    console.log("access token arrived in search" + accessToken);
    console.log("access token arrived in search" + accessToken);
    const header = {
      headers: { Authorization: `Bearer ${accessToken}` },
    };
    console.log(JSON.stringify(header));

    return fetch(
      `https://api.spotify.com/v1/search?type=track&q=${searchTerm}`,
      header
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(JSON.stringify(data));
        if (!data) {
          return [];
        }

        return data.tracks.items.map((track) => ({
          id: track.id,
          name: track.name,
          artist: track.artists[0].name,
          album: track.album.name,
          uri: track.uri,
        }));

        // console.log("TRACKS" + tracks);
        //return tracks;
      });
  },
};
