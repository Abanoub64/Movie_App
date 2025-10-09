import { IMovieDetails } from '@shared/interface/interfaces';

export const MOCK_MOVIE_DETAILS: IMovieDetails = {
  adult: false,
  backdrop_path: "/2va32apQP97gvUxaMnL5wYt4CRB.jpg",
  belongs_to_collection: {
    id: 120794,
    name: "Batman Collection",
    poster_path: "/31SwN5tZuJNsWTLx6DNNyQSAXdx.jpg",
    backdrop_path: "/4UHZWw5lV3ZoadTjXuVOakdH32L.jpg"
  },
  budget: 35000000,
  genres: [
    { id: 14, name: "Fantasy" },
    { id: 28, name: "Action" },
    { id: 80, name: "Crime" }
  ],
  homepage: "",
  id: 268,
  imdb_id: "tt0096895",
  origin_country: ["US"],
  original_language: "en",
  original_title: "Batman",
  overview: "Having witnessed his parents' brutal murder as a child, millionaire philanthropist Bruce Wayne fights crime in Gotham City disguised as Batman, a costumed hero who strikes fear into the hearts of villains...",
  popularity: 8.1778,
  poster_path: "/cij4dd21v2Rk2YtUQbV5kW69WB2.jpg",
  production_companies: [
    { id: 174, logo_path: "/kgJaIcKZZK4lTazer55XrgWDEvp.png", name: "Warner Bros. Pictures", origin_country: "US" },
    { id: 67889, logo_path: "/rgEZCUJeQFyVyOdXdSLSa9BsEq4.png", name: "Polygram Pictures", origin_country: "US" },
    { id: 276, logo_path: null, name: "The Guber-Peters Company", origin_country: "US" }
  ],
  production_countries: [
    { iso_3166_1: "US", name: "United States of America" }
  ],
  release_date: "1989-06-21",
  revenue: 411348924,
  runtime: 126,
  spoken_languages: [
    { english_name: "English", iso_639_1: "en", name: "English" },
    { english_name: "French",  iso_639_1: "fr", name: "Français" }
  ],
  status: "Released",
  tagline: "",
  title: "Batman",
  video: false,
  vote_average: 7.235,
  vote_count: 8217
};
