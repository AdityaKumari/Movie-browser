import { getGenre } from "@/pages/api/movies-api";
import { useEffect, useState } from "react";

const GenreTab = ({selectedGenres, setSelectedGenres} :{
    selectedGenres:{id:string, name: string}[];
    setSelectedGenres: ((arg0: {id:string, name: string}[]) => void);
}) =>{
    const [ genre, setGenre] = useState([])
    const fetchGenres = async () => {
     const data = await getGenre();
     console.log('shreya', data)
            setGenre(data.genres);
      };

      const handleSelectedGenre = (el:{id:string, name: string}) =>{
        if (selectedGenres.includes(el)){
            const newGenre = selectedGenres.filter((i, _) => i !== el);
            setSelectedGenres(newGenre);
        }
        else{
            setSelectedGenres([...selectedGenres, el])
        }
      }
    useEffect(() =>{
        fetchGenres(); 
    }, [])
    return <div className=" shadow-2xl flex flex-row w-full overflow-x-scroll gap-4 scrollbar-hide">
{
    genre?.map((el:any)=> {
        const active = selectedGenres.includes(el.id) ;
        return     <div className={`cursor-pointer border  flex-row gap-2 border-amber-600 px-2 rounded-lg flex items-center justify-center whitespace-nowrap left-0 top-[100%]  ${active ? ' bg-amber-600 text-white':' text-amber-600'}`} onClick={() => handleSelectedGenre(el.id)} >  {el.name} {active && <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </svg>
      } </div>
    }
    )
}
    </div>
}

export default GenreTab;
