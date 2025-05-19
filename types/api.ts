// Definiciones de tipos para la API de Rick & Morty

export interface Character {
  id: number;
  name: string;
  status: "Alive" | "Dead" | "unknown";
  species: string;
  type: string;
  gender: "Female" | "Male" | "Genderless" | "unknown";
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string; // url to character's image
  episode: string[]; // array of episode urls
  url: string;
  created: string; // Date string
}

export interface Location {
  id: number;
  name: string;
  type: string;
  dimension: string;
  residents: string[]; // array of character urls
  url: string;
  created: string; // Date string
}

export interface Episode {
  id: number;
  name: string;
  air_date: string;
  episode: string; // e.g. "S01E01"
  characters: string[]; // array of character urls
  url: string;
  created: string; // Date string
}

export interface ApiResponseInfo {
  count: number;
  pages: number;
  next: string | null; // url to the next page
  prev: string | null; // url to the previous page
}

export interface ApiResponse<T> {
  info: ApiResponseInfo;
  results: T[];
}
