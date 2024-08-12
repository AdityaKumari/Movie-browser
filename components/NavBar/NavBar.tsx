import { useRouter } from "next/router";

const NavBar = () =>{
    const router = useRouter();
    return    <div
    className={
      ' sticky mb-10 border-b border-amber-700  z-[20] top-0 left-0 flex items-center right-0 bottom-0 h-[60px] md:h-navbar bg-[#242222]'
    }
  >
        <div className={'container h-full flex justify-between items-center '}>
            
       <div className="md:text-3xl text-xl text-white font-bold underline underline-offset-2 cursor-pointer"
       onClick={() => router.push('/movie-browser')}
       >
        Movie Browser
       </div>
<div className="flex flex-row gap-2">
<div className=" cursor-pointer text-amber-700  font-normal bg-white items-center justify-center gap-2 flex px-4 rounded-md py-2 hover:underline underline-offset-2" 
  onClick={() => router.push('/movie-browser/favrouties')}>  
          Favourites
        </div>
</div>
        </div>
    </div>
}

export default NavBar;