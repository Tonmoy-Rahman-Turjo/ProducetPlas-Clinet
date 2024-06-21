import { useQuery } from "@tanstack/react-query";
import UseAuth from "./UseAuth";
import UseAxios from "./UseAxios";


const Member = () => {
    const { user, lodding } = UseAuth();
  const axiosSecure = UseAxios();
  const { data: isMember, isPending: isMemberLoading} = useQuery({
    queryKey: [user?.email, "isMember"],
    enabled: !!user && !lodding,
    queryFn: async () => {
      const res = await axiosSecure.get(`/alluser/member/${user.email}`);
      console.log(res.data);
      return res.data?.member;
    },
  });
  return [isMember, isMemberLoading];
};

export default Member;