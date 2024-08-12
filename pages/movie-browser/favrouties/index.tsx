import MovieCard from "@/components/MovieCard/MovieCard";
import NavBar from "@/components/NavBar/NavBar";
import { useEffect, useState } from "react";


const Index = () =>{  
    const [movieList, setMovieList] = useState([])
    useEffect(() =>{
        const storedMovies = localStorage.getItem('favourites');
        const movies = storedMovies ? JSON.parse(storedMovies) : [];
        setMovieList(movies);
    },[])
return <>
        <NavBar />
        <div className="container">
                  <h1 className="text-4xl font-extrabold py-10 text-gray-200">
                    Favourite <span className="text-amber-600"> Movie</span>
                     </h1>
                     <div className="flex flex-row items-center flex-wrap gap-7">
       {movieList && movieList.map((movie) =>  <MovieCard movie={movie}/> )}
       </div>
        </div>
      
    </>
}

export default Index;
