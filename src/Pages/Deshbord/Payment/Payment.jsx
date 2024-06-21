import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import ChackOut from "./ChackOut";

// import { useNavigate } from "react-router-dom";
// import useAuth from "../../../UseHook/UseAuth";
// import useAuthe from "../../../UseHook/useAuthe";
import { AuthContext } from "../../../AuthProvider/Authprovider";
// import UseAuth from "../../../UseHook/UseAuth";
import { useContext } from "react";
// import UseAxios from "../../../UseHook/UseAxios";


const Payment = () => {
    
    const{user} = useContext(AuthContext)
     console.log(user)

  const handlePaymentSuccess = async () => {
  
      }
 
    const stripeProsime = loadStripe(import.meta.env.VITE_PAYMENT_GATWAY)
    return (
            
            
        <div className="bg-[#51bcee] ">
            
            <div>
             
            <Elements stripe={stripeProsime}>
            <h2 className="text-xl pt-4 mb-4  text-center font-bold text-red-700"><span className="text-white">Subscription Amount: </span>$ 100</h2>
        <ChackOut onSuccess={handlePaymentSuccess}></ChackOut>
       </Elements>
            </div>
        </div>
       
    );
};

export default Payment;