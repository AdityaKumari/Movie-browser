import { useState } from 'react';
import styles from './MovieCard.module.css'
import MovieCard from './MovieCard';
import { MovieCardType } from './MovieCardType';
const MovieCardPopUp = ({ movie, isFavourite, handleFavrouties }:{movie:MovieCardType, isFavourite: boolean, handleFavrouties:() => void}) => {
    return <div
        className={`fixed top-[50%] left-[50%] max-h-[90%] overflow-scroll scrol translate-x-[-50%] translate-y-[-50%] container md:w-[50%] w-[90%] z-20   p-[1px] rounded-xl bg-gradient-to-b from-amber-800 to-black ${styles.boxshadow}`}>
        <div
            className="bg-black w-full h-full rounded-xl p-1 space-y-3 "
        >
            <img src={movie?.poster_path ? `https://image.tmdb.org/t/p/w300/${movie?.poster_path}` : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv6-eKRYlAl3He_tW4yfQsqeck1PV5NpTsHA&s'}
                className='h-[300px] w-full rounded-xl' />
            <div className='py-6 flex md:flex-row gap-6 justify-between flex-col px-8'>
                <div className='flex flex-col gap-2'>
                    <div className='text-3xl font-bold text-white  '>
                        {movie?.title}
                    </div>
                    <div className=' font-light text-white  '>
                        {movie?.overview}
                    </div>
                    <div className='flex flex-col gap-1 pt-10'>
                        <div className="font-extralight text-gray-200">
                            lamguage: <span className=' font-normal text-white'> {movie?.original_language}
                            </span>
                        </div>
                        <div className="font-extralight text-gray-200">
                            Release Date: <span className=' font-normal text-white '> {movie?.release_date}
                            </span>
                        </div>
                        <div className="font-extralight text-gray-200">
                            Popularity: <span className=' font-normal text-white '> {movie?.vote_average}
                            </span>
                        </div>
                    </div>
                </div>
                <button className='bg-green-600 my-4 text-white text-lg font-semibold rounded-md px-2 hover:bg-green-700 hover:underline underline-offset-2  whitespace-nowrap h-[50px]' onClick={handleFavrouties}>
{isFavourite ? 'Remove from Favrouite': ' Add to Favrouites'}
                </button>
            </div>
        </div>
    </div>
}

export default MovieCardPopUp