import { useEffect, useRef, useState } from 'react';
import styles from './MovieCard.module.css'
import MovieCardPopUp from './MovieCardPopup';
import { MovieCardType } from './MovieCardType';

const MovieCard = ({movie} :{movie: MovieCardType}) =>{
    const [isHovered, setIsHovered] = useState (false)
    const [showPopup, setShowPopUp] = useState(false)
    const [isFavourite, setIsFavroutie] = useState(false)
    useEffect(() =>{
        const storedFavourites = localStorage?.getItem('favourites');
        const favourites = storedFavourites ? JSON.parse(storedFavourites) : [];
        const res = favourites.some((favMovie: { id: any; }) => favMovie.id === movie.id);
        setIsFavroutie(res)
    })
   
    const cardRef = useRef<HTMLDivElement>(null);
    const handleOutsideClick = (event : MouseEvent) => {
        if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
            setShowPopUp(false)
        }
      };
      const handleFavrouties = () => {
        const storedFavourites = localStorage?.getItem('favourites');
        const favourites = storedFavourites ? JSON.parse(storedFavourites) : [];
        if (isFavourite) {
          const updatedFavourites = favourites.filter((favMovie: { id: any; }) => favMovie.id !== movie.id);
          localStorage.setItem('favourites', JSON.stringify(updatedFavourites));
          setIsFavroutie(false)
        } else {
          favourites.push(movie);
          localStorage.setItem('favourites', JSON.stringify(favourites));
          setIsFavroutie(true)
        }
      }
      useEffect(() => {
        document.addEventListener('click', handleOutsideClick);
        return () => {
          document.removeEventListener('click', handleOutsideClick);
        };
      }, []);
return <div
className={` md:w-[200px] w-full h-[300px] p-[1px] rounded-xl bg-gradient-to-b from-amber-800 to-black ${styles.boxshadow}` }>
<div
  className="bg-black w-full h-full rounded-xl p-1 space-y-3 relative"
  style={{
    backgroundImage: movie?.poster_path ? `url(https://image.tmdb.org/t/p/w300/${movie?.poster_path})` : 'url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv6-eKRYlAl3He_tW4yfQsqeck1PV5NpTsHA&s)',
    backgroundSize: 'cover', 
    backgroundPosition: 'center', 
  }}
  onMouseEnter={() => setIsHovered(true)}
  onMouseLeave={() => setIsHovered(false)}
  ref={cardRef}
>
{isHovered && (
    <div
      className={`absolute p-6 w-full flex items-center  justify-between left-0 z-10 gap-2 transition-transform  border-opacity-70 duration-1000 delay-500 ease-in-out ${
        isHovered ? 'translate-y-0 bottom-0 z-10' : 'translate-y-full bottom-[-100%] z-[-10]' 
      }`}
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}
    >
   <div className='text-white underline underline-offset-2 line-clamp-2 font-semibold text-lg'   onClick={() => setShowPopUp(true)}>
   {movie?.title}
    </div>
  <div onClick={handleFavrouties}>
  <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 min-w-6"
        fill={`${isFavourite ? 'red' :'none'}`}
        viewBox="0 0 24 24"
        stroke="#d97706"
      >
        <path
          d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
        />
      </svg>
    </div>
    </div>
  )}
    </div>
   {showPopup &&  <MovieCardPopUp movie={movie} handleFavrouties={handleFavrouties} isFavourite={isFavourite} />}
    </div>
}

export default MovieCard;