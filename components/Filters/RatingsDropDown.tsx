import { useEffect, useRef, useState } from "react";

type Rating = {
    gte: number | null;
    name: string | '';
  };

const RatingDropDown = ({setSelectedRating, selectedRating} :{
    setSelectedRating: ((arg0: Rating) => void);
    selectedRating: Rating ;
}) =>{
    const rating = [
        { gte: 1, name: '1' },
        { gte: 2, name: '2' },
        { gte: 3, name: '3' },
        { gte: 4, name: '4' },
        { gte: 5, name: '5' },
        { gte: 6, name: '6' },
        { gte: 7, name: '7' },
        { gte: 8, name: '8' },
        { gte: 9, name: '9' },
        { gte: 10, name: '10' }
    ];
    const [showDropDown, setShowDropDown] =useState(false)
  const cardRef = useRef<HTMLDivElement>(null);

  const handleSelectedRating = (el: Rating) =>{
    if (el.name === selectedRating?.name)
    setSelectedRating({gte: null, name:''})
    else
    setSelectedRating(el)
}
const handleOutsideClick = (event : MouseEvent) => {
    if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
        setShowDropDown(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);
    return <div className="relative" ref={cardRef} onClick = { () => setShowDropDown(true)} >
        <div className="bg-amber-700  text-white font-semibold items-center justify-center gap-2 flex px-4 rounded-md md:py-2 py-1 hover:underline underline-offset-2" >
            Ratings  
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
</svg>

        </div>
        {showDropDown && <div className=" absolute z-10  py-4 rounded-b-md  bg-amber-700 shadow-2xl w-full gap-2 px-2  flex flex-col  ">
{
    rating.map((el)=> {
        const active = el.name == selectedRating?.name
        return <div className={`cursor-pointer   ${active ? 'text-black font-bold':'text-white'}`} onClick={() => handleSelectedRating(el)} > 
         {el.name} 
         </div>
    }
    )
}
    </div>}
    </div>
}

export default RatingDropDown;
