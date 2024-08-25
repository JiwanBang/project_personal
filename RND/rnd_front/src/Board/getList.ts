import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const ListQuery = () => {
  const { data, isPending, isFetching } = useQuery({
    queryKey: ["id", "title", "post"],
    queryFn: async () => {
      try {
        const getData = await axios.get("http://localhost:8080/board", {
          withCredentials: true,
        });
        return getData;
      } catch (err) {
        console.error(err);
      }
    },
  });
  return { data, isPending, isFetching };
};

export default ListQuery;
