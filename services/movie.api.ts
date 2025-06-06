import { TMDB_CONFIG } from "./api.config";


export const searchMedia = async ({ query }: { query: string }): Promise<MediaListResponse> => {
  if (!query) {
    return {
      page: 1,
      results: [],
      total_pages: 0,
      total_results: 0
    };
  }

  const endPoint = `${TMDB_CONFIG.BASE_URL}/search/multi?query=${encodeURIComponent(query)}`;

  const response = await fetch(endPoint, {
    method: "GET",
    headers: TMDB_CONFIG.headers,
  });

  if (!response.ok) {
    throw new Error(`Failed to search: ${response.statusText}`);
  }

  const data = await response.json();

  // Filter out non-movie/tv results (e.g., people)
  const filteredResults = data.results.filter(
    (item: any) => item.media_type === "movie" || item.media_type === "tv"
  );

  return {
    ...data,
    results: filteredResults,
  };
};

export const fetchDiscoverMulti = async (): Promise<MediaItem[]> => {
  const [moviesRes, tvRes] = await Promise.all([
    fetch(`${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc`, {
      headers: TMDB_CONFIG.headers,
    }),
    fetch(`${TMDB_CONFIG.BASE_URL}/discover/tv?sort_by=popularity.desc`, {
      headers: TMDB_CONFIG.headers,
    }),
  ]);

  const moviesData = await moviesRes.json();
  const tvData = await tvRes.json();

  const movies = moviesData.results.map((m: any) => ({
    ...m,
    media_type: "movie",
  }));

  const tvShows = tvData.results.map((t: any) => ({
    ...t,
    media_type: "tv",
  }));

  return [...movies, ...tvShows].sort((a, b) => b.popularity - a.popularity);
};

// Fetch details for a movie
export const fetchMovieDetails = async (movieId: string): Promise<MovieDetails> => {
  const url = `${TMDB_CONFIG.BASE_URL}/movie/${movieId}?api_key=${TMDB_CONFIG.API_KEY}`;

  const response = await fetch(url, {
    method: "GET",
    headers: TMDB_CONFIG.headers,
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch movie details: ${response.statusText}`);
  }

  return await response.json();
};

// Fetch details for a TV show
export const fetchTVDetails = async (tvId: string): Promise<TVShowDetails> => {
  const url = `${TMDB_CONFIG.BASE_URL}/tv/${tvId}?api_key=${TMDB_CONFIG.API_KEY}`;

  const response = await fetch(url, {
    method: "GET",
    headers: TMDB_CONFIG.headers,
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch TV show details: ${response.statusText}`);
  }

  return await response.json();
};
