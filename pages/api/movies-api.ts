const apiKey = process.env.NEXT_PUBLIC_API_KEY;

export async function getMoviesData(props?: any) {
  if (!apiKey) {
    throw new Error('API key is missing');
  }

  const url = 'https://api.themoviedb.org/3/discover/movie';
  const params = new URLSearchParams({
    accept: 'application/json',
    api_key: apiKey,
    ...props
  });

  try {
    const response = await fetch(`${url}?${params.toString()}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const movies = await response.json();
    return movies;
  } catch (error) {
    console.error('Failed to fetch movies data:', error);
    throw error;
  }
}

export async function getGenre() {
  if (!apiKey) {
    throw new Error('API key is missing');
  }

  const url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch genre data:', error);
    throw error;
  }
}

export async function getMovieByTitle(props: {} = {}) {
  if (!apiKey) {
    throw new Error('API key is missing');
  }

  const url = 'https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1';
  const params = new URLSearchParams({
    accept: 'application/json',
    api_key: apiKey,
    ...props
  });

  try {
    const response = await fetch(`${url}&${params.toString()}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch movie by title:', error);
    throw error;
  }
}
