const apiKey = process.env.NEXT_PUBLIC_API_KEY;

export async function getMoviesData(props?: any)
  {
    const url = 'https://api.themoviedb.org/3/discover/movie?';
    const params = new URLSearchParams({
      accept: 'application/json',
      api_key: apiKey || '',
      ...props
    });    
    const response = await fetch(url+ params);
    const movies = await response.json();
    return movies
  }

  export async function getGenre(){
        const response = await fetch(
          `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
     return data
  };

  export async function getMovieByTitle(props: {}){
    const params = new URLSearchParams({
        accept: 'application/json',
        api_key: apiKey || '',
        ...props
      });  
    const response = await fetch('https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1' + params)
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
   return data
  }