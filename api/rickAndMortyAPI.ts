const API_BASE_URL = "https://rickandmortyapi.com/api";

export const getCharacters = (page: number = 1, name: string = ""): string => {
  let url = `${API_BASE_URL}/character/?page=${page}`;
  if (name) {
    url += `&name=${encodeURIComponent(name)}`;
  }
  return url;
};

export const getCharacterById = (id: number): string => {
  return `${API_BASE_URL}/character/${id}`;
};

export const getEpisodesByIds = (ids: number[]): string => {
  if (ids.length === 0) {
    return ""; // Return empty string or handle as needed by the hook
  }
  return `${API_BASE_URL}/episode/${ids.join(",")}`;
};

// Helper function to extract episode IDs from URLs
export const extractEpisodeIdsFromUrls = (urls: string[]): number[] => {
  return urls
    .map((url) => {
      const parts = url.split("/");
      return parseInt(parts[parts.length - 1], 10);
    })
    .filter((id) => !isNaN(id)); // Filter out any NaN results
};

// Note: The actual fetching logic will be handled by the useApiData hook.
// These functions just provide the correct URLs.
