import { useQuery } from "@tanstack/react-query";
import UseAuth from "./UseAuth";
// import useAxiosHook from "./UseAxiosHook";
// import UseAxios from "./UseAxios";
// import useAxiosHook from "./UseAxiosHook";
import UseAxios from "./UseAxios";


const Admin = () => {
    const aixiosdmin = UseAxios()
    // const aixiosdmin = useAxiosHook()
    const{user} = UseAuth()
    const {data: isAdmin, isPending: isAdminlode }= useQuery({
        queryKey:[user?.email, 'isAdmin' ],
        queryFn: async ()=>{
            const res = await aixiosdmin.get(`/alluser/admin/${user.email}`)
            // console.log(res.data)
            return res.data?.admin;
            
        }
    })
    return [isAdmin, isAdminlode]
};

export default Admin;
