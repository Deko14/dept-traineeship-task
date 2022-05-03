const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

exports.getMovie = async (req, res) => {
  const id = req.query.id;
  const movieUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.TMDB_API_KEY}`;
  const trailerUrl = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${process.env.TMDB_API_KEY}`;
  const options = {
    method: "GET",
  };

  const trailerData = await fetch(trailerUrl, options)
    .then((res) => res.json())
    .then((data) => data.results);

  const movieResponse = await fetch(movieUrl, options)
    .then((res) => res.json())
    .then((data) => data);

  const response = {
    movieInfo: movieResponse,
    movieTrailers: trailerData,
  };

  console.log("RESPONSE: ", response);
  res.json(response);
};

exports.searchMovies = async (req, res) => {
  const searchString = req.query.search;
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.TMDB_API_KEY}&query=${searchString}`;
  const options = {
    method: "GET",
  };

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const response = await fetch(url, options)
    .then((res) => res.json())
    .then((data) => {
      const results = {
        movies: data.results.slice(startIndex, endIndex),
      };

      if (endIndex < data.results.length) {
        results.next = {
          page: page + 1,
          limit: limit,
        };
      }

      if (startIndex > 0) {
        results.previous = {
          page: page + 1,
          limit: limit,
        };
      }

      return results;
    })
    .catch((e) => {
      console.error({
        message: "Error occurred!",
        error: e,
      });
    });

  console.log("RESULTS: ", response);
  res.json(response);
};
