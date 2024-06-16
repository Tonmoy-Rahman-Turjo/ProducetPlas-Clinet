

import { useContext } from "react";
import { AuthContext } from "../AuthProvider/Authprovider";


const UseAuth = () => {
    const all = useContext(AuthContext)
    return all
};

export default UseAuth;