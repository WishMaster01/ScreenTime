import axios from "axios";
import https from "https";

const agent = new https.Agent({ keepAlive: true });

export const getNowPlayingMovies = async (req, res) => {
  try {
    const { data } = await axios.get(
      "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
      {
        headers: {
          Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
          Accept: "application/json",
        },
        timeout: 30000,
        httpsAgent: agent,
        family: 4,
      }
    );

    res.json({ success: true, movies: data.results });
  } catch (error) {
    console.error("Axios error on Vercel:", error.message);
    res
      .status(500)
      .json({ success: false, message: "Error fetching movies from TMDB." });
  }
};
