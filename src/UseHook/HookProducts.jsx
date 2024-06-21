
import { useQuery } from "@tanstack/react-query";
import useAxiosHook from "./UseAxiosHook";
const HookProducts = () => {
    const axioshooks = useAxiosHook();

    const {
      data: products = [],
      isPending: loding,
      refetch,
    } = useQuery({
      queryKey: ["products"],
      queryFn: async () => {
        const res = await axioshooks.get("/allproduct");
        return res.data;
        
      },
    });
    //    console.log(products)
    return [products, loding, refetch];
  };


export default HookProducts;
