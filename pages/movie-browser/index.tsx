import NavBar from "@/components/NavBar/NavBar";
import SearchBar from "@/components/Filters/SearchBar";
import {useState } from "react";
import SearchResults from "@/components/SearchResults/SearchResults";
import FeatureResults from "@/components/FeatureResults/FeatureResults";
import { MovieCardType } from "@/components/MovieCard/MovieCardType";
import { getMoviesData } from "../api/movies-api";
import Head from "next/head";

const Index = ({results}:{results:MovieCardType[]}) =>{  
    const [movieTitle, setMovieTitle] = useState<string>('')
return <>
   <Head>
        <title>Movie Browser</title>
        <meta name="description" content=" A web app to sow all the trending and their description" />
      </Head>
        <NavBar />
        <SearchBar setMovieTitle={setMovieTitle} />
        { results  && (movieTitle.length > 0 ? <SearchResults results={results} movieTitle={movieTitle}/> :  <FeatureResults results={results} /> )}
    </>
}

export default Index;

export async function getServerSideProps() {  
 const results = await getMoviesData();
 return  { props : results}
  }