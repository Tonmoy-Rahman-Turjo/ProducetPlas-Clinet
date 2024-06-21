import { useContext } from "react";
import { AuthContext } from "../AuthProvider/Authprovider";


const useAuthe = () => {
    const all = useContext(AuthContext)
    return all
};

export default useAuthe;
