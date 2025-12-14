import { useQuery } from "@tanstack/react-query";
import { api } from "../api";
export const useGetArtists = () => {
  return useQuery({
    queryKey: ["artists"],
    queryFn: async () => {
      const response = await api.get("/artists");
      return response.data.data;
    },
  });
};

export const useGetArtistById = (artistId) => {
  return useQuery({
    queryKey: ["artist", artistId],
    queryFn: async () =>
      await api.get("/artists/" + artistId).then((res) => res.data.data),
  });
};
