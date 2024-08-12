import { useEffect, useState } from "react";
import MovieCard from "../MovieCard/MovieCard";
import { MovieCardType } from "../MovieCard/MovieCardType";
import { getMovieByTitle } from "@/pages/api/movies-api";

const SearchResults = ({results, movieTitle}:{
    results: MovieCardType[];
    movieTitle: string;
}) =>{
    const [movieList, setMovieList] = useState<MovieCardType[]>(results);
    const [page, setPage] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(false);

  const fetchMovies = async (override = false) => {
    setLoading(true);
    const props = {
      page: override ? 1 : page + 1,
      query: movieTitle
    };
    const response = await getMovieByTitle(props);
    setMovieList(prevMovies => override ? response.results : [...prevMovies, ...response?.results]);
    if (!override) {
      setPage(prevPage => prevPage + 1);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (movieTitle) {
      setPage(1); 
      fetchMovies(true); 
    }
  }, [movieTitle]);

    return <div className="container">
      <h1 className="text-4xl font-extrabold py-10 text-gray-200">Showing Results for <span className="text-amber-600"> {movieTitle}....</span> </h1>
     
       <div className="flex flex-row items-center flex-wrap gap-7">
       {movieList && !loading && movieList.map((movie) => <MovieCard movie={movie} key={movie.id} />)}
       </div>
   
    </div>
}

export default SearchResults;

