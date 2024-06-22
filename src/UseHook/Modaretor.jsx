import { useQuery } from "@tanstack/react-query";
import UseAxios from "./UseAxios";
import UseAuth from "./UseAuth";




const Modaretor = () => {
   
        const {user} = UseAuth();
  const aixioxmodaretor = UseAxios();
  const { data: isModerator, isPending: isModeratorLoading } = useQuery({
    queryKey: [user?.email, "isModerator"],
  
    queryFn: async () => {
        const res = await aixioxmodaretor.get(`/alluser/moderator/${user.email}`)
      console.log(res.data);
      return res.data?.moderator;
    },
  });
  return [isModerator, isModeratorLoading];




  
};

export default Modaretor;