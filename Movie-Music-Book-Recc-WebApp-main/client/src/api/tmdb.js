import axios from "axios";

export const fetchMovies = ( genre) => axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=f20575175c2deae7974eb547727d1ace&language=en-US&page=1&with_genres=${genre}`);