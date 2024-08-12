import { ChangeEvent, useRef, useState } from "react"

const SearchBar = ({setMovieTitle}:{setMovieTitle: ((arg0: string) => void);})=> {

    const [textValue, setTextValue] = useState('')
    const searchRef = useRef<number>(0)
    const inputValueRef = useRef<string>('');
  
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      const searchVal = e.target.value
      setTextValue(searchVal)
      delayCall(searchVal)
      if (searchVal.trim().length >= 3) {
        inputValueRef.current = searchVal;
      } else {
        inputValueRef.current = ''
        setMovieTitle('')
      }
    }
  
    const delayCall = (val: string) => {
      clearTimeout(searchRef?.current)
      searchRef.current = window.setTimeout(() => {
        console.log(val)
        if (inputValueRef.current) handleText()
      }, 300)
    }
  
    const handleText = async () => {
        setMovieTitle(inputValueRef?.current)
    }
  

  
    return (
     <div className="container w-full flex flex-col items-center justify-center">
           <div className=" md:w-[60%] w-full flex flex-row items-center gap-2 justify-center border-2 border-amber-600 rounded-lg bg-transparent hover:bg-gray-200  px-2 py-3">   
        <svg
     xmlns="http://www.w3.org/2000/svg"
     fill="none"
     viewBox="0 0 24 24"
     stroke="#d97706"
     strokeWidth="2"
     width="24"
     height="24"
   >
     <path
       strokeLinecap="round"
       strokeLinejoin="round"
       d="M21 21l-4.35-4.35m1.55-3.7a7 7 0 1 0-10 0 7 7 0 0 0 10 0z"
     />
   </svg>   
             <input
               onChange={handleChange}
               type="text"
               placeholder="Search for movie title...."
               className="w-full text-black sm:text-base bg-transparent hover:bg-gray-200 border border-none outline-0 focus:ring-white"
               value={textValue}/>
           </div>
     </div>
    )
  }
  
  export default SearchBar;