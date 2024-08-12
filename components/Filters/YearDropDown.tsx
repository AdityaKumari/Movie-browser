import { useEffect, useRef, useState } from "react";

type Year = {
    lte: number | null;
    gte: number | null;
    name: string | '';
  };
const YearDropDown = ({setSelectedYear, selectedYear}:{
    setSelectedYear: ((arg0: Year) => void);
    selectedYear: Year ;
}) =>{
    const year = [
        { lte: 1995, gte: 1990, name: '1990-1995' },
        { lte: 2000, gte: 1995, name: '1995-2000' },
        { lte: 2005, gte: 2000, name: '2000-2005' },
        { lte: 2010, gte: 2005, name: '2005-2010' },
        { lte: 2015, gte: 2010, name: '2010-2015' },
        { lte: 2020, gte: 2015, name: '2015-2020' },
        { lte: 2025, gte: 2020, name: '2020-2025' }
    ];
    const [showDropDown, setShowDropDown] =useState(false)
    const cardRef = useRef<HTMLDivElement>(null);

    const handleSelectedYear = (el: Year) =>{
        if(el.name === selectedYear?.name)
        setSelectedYear({lte: null, gte: null , name:""})
        else
        setSelectedYear(el)
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
            Year  
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
</svg>

        </div>
        {showDropDown && <div className=" absolute z-10  py-4 rounded-b-md  bg-amber-700 shadow-2xl w-full gap-2 px-2  items-center justify-center flex flex-col  ">
{
    year.map((el)=> {
        const active = el.name == selectedYear?.name
        return <div className={`cursor-pointer whitespace-nowrap    ${active ? 'text-black font-bold':'text-white'}`} onClick={() => handleSelectedYear(el)} > 
         {el.name} 
         </div>
    }
    )
}
    </div>}
    </div>
}

export default YearDropDown;
