$(function () {
  console.log("ready for combat!");
  var client_id = "9542dc8a70234519895a0f6c2eaa7086";
  var redirect_uri = "http://127.0.0.1:5500/index.html";
  var response_type = "code";
  var code = null;
  var client_secret = "ddc51eb033ac4996ae105ca6894a4844";
  var scope = "user-read-private user-read-email";
  var access_token = null;
  var artist = null;
  var id = "4iJLPqClelZOBCBifm8Fzv";

  displayArtist = () => {
    $(".artist-card").addClass("cursor-pointer");
    console.log(artist);
    console.log(artist.images[1].url);
    $(".artist-image").css({
      "background-image": `url("${artist.images[1].url}")`,
    });
    $(".Artist").text(`${artist.name}`);
    $(".Popularity").text(`${artist.popularity}`);
    $(".Followers").text(`${artist.followers.total}`);
    $(".Genre").text(`${artist.genres[0]}, ${artist.genres[1]}`);
  };

  $(".artist-card").click(function () {
    if (artist) location.replace(`${artist.external_urls.spotify}`);
  });

  $(".click").click(function () {
    // $.ajax({
    //   url: `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=${response_type}&redirect_uri=${redirect_uri}&scope=${scope}`,
    //   method: "GET",
    //   success: (data) => {
    //     console.log(JSON.parse(data));
    //     console.log("HAHA!");
    //   },

    //   error: (data) => {
    //     alert("didn't work!");
    //   },
    // });
    location.replace(
      `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=${response_type}&redirect_uri=${redirect_uri}&scope=${scope}`
    );
  });

  $(".url").click(function () {
    const url = new URL(window.location.href);
    code = url.searchParams.get("code");
    console.log("Success!");
  });

  $(".access").click(function () {
    $.ajax({
      url: `https://accounts.spotify.com/api/token`,
      method: "POST",
      data: {
        code: code,
        redirect_uri: redirect_uri,
        grant_type: "authorization_code",
      },
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        Authorization: "Basic " + btoa(client_id + ":" + client_secret),
      },

      success: (data) => {
        access_token = data.access_token;
        console.log("Success!");
      },

      error: (data) => {
        alert("didn't work!");
      },
    });
  });

  $(".artist").click(function () {
    $.ajax({
      url: `https://api.spotify.com/v1/artists/${id}`,
      method: "GET",
      headers: {
        Authorization: "Bearer " + access_token,
      },

      success: (data) => {
        artist = data;
        displayArtist();
      },

      error: (data) => {
        alert("didn't work!");
      },
    });
  });
});
