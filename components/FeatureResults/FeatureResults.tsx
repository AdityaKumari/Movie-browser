import { getMoviesData } from "@/pages/api/movies-api";
import { useEffect, useRef, useState } from "react";
import MovieCard from "../MovieCard/MovieCard";
import GenreTab from "../Filters/GenreTab";
import YearDropDown from "../Filters/YearDropDown";
import RatingDropDown from "../Filters/RatingsDropDown";
import { MovieCardType } from "../MovieCard/MovieCardType";

type Genre = { id: string; name: string };
type Year = { lte: number | null; gte: number | null; name: string };
type Rating = { gte: number | null; name: string };



const FeatureResults = ({ results }: {results: MovieCardType[]}) => {
    const [movieList, setMovieList] = useState<MovieCardType[]>(results);
    const [page, setPage] = useState<number>(1);
    const loaderRef = useRef<HTMLDivElement | null>(null);
    const [selectedGenres, setSelectedGenres] = useState<Genre[]>([]);
    const [selectedYear, setSelectedYear] = useState<Year>({ lte: null, gte: null, name: '' });
    const [selectedRating, setSelectedRating] = useState<Rating>({ gte: null, name: '' });
    const [loading, setLoading] = useState<boolean>(false);

  const fetchMovies = async (override = false) => {
    setLoading(true);
    const props = {
      page: override ? 1 : page + 1,
      'with_genres': selectedGenres.join(','),
      'release_date.lte': selectedYear.lte ? `${selectedYear.lte}-12-31` : undefined,
      'release_date.gte': selectedYear.gte ? `${selectedYear.gte}-12-31` : undefined,
      'vote_average.gte': selectedRating.gte,
    };
    const response = await getMoviesData(props);
    setMovieList(prevMovies => override ? response.results : [...prevMovies, ...response?.results]);
    if (!override) {
      setPage(prevPage => prevPage + 1);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (selectedGenres.length || selectedYear.name || selectedRating.name) {
      setPage(1); 
      fetchMovies(true); 
    }
  }, [selectedGenres, selectedYear, selectedRating]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !loading ) {
        fetchMovies();
      }
    }, { threshold: 1.0 });

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [loaderRef, loading, selectedGenres, selectedYear, selectedRating]);

  return (<div className="container">
       <div className=" flex flex-row justify-between gap-4 md:flex-nowrap flex-wrap w-full pt-4">
       <GenreTab selectedGenres={selectedGenres} setSelectedGenres={setSelectedGenres} />
       <div className=" flex flex-row gap-2">
         <YearDropDown setSelectedYear={setSelectedYear} selectedYear={selectedYear} />
         <RatingDropDown setSelectedRating={setSelectedRating} selectedRating={selectedRating} />
          </div>
       </div>
        <h1 className="text-4xl font-extrabold py-10 text-gray-200">
          Featured <span className="text-amber-600">Movie</span>
        </h1>

        <div className="flex flex-row items-center  flex-wrap gap-7">
          {movieList?.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
        <div ref={loaderRef} style={{ height: '20px', backgroundColor: 'transparent' }} />
        {loading && <div />}
      </div>
  );
};

export default FeatureResults;
