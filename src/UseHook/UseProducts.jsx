import { useQuery } from "@tanstack/react-query";
import useAxiosHook from "./UseAxiosHook";


const UseProducts = () => {
    const axiosPublic = useAxiosHook();

    const {
      data: acceptedProducts = [],
      isPending: loading,
      refetch,
    } = useQuery({
      queryKey: [" allProducts"],
      queryFn: async () => {
        const res = await axiosPublic.get("/productpage");
        return res.data;
      },
    });
  
    return [acceptedProducts, loading, refetch];
};

export default UseProducts;