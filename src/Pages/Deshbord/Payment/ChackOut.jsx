

import  { useEffect, useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import UseAxios from "../../../UseHook/UseAxios";
import Swal from "sweetalert2";
import UseAuth from "../../../UseHook/UseAuth";
import { useNavigate } from "react-router-dom";

const CheckOut = () => {
    const {user} = UseAuth();
    console.log(user, 'payment user')
  const navigates = useNavigate();
    const [error, setError] = useState('')
    const [clientSecret, setClientSecret] = useState("");
    const [transactionId, setTransactionId] = useState("");
    const stripe = useStripe();
    const elements = useElements();
    const aixosSecure = UseAxios()
  useEffect(()=>{
           aixosSecure.post('/create-payment-intent',{ price: 100 })
           .then((res) => {
            console.log(res.data.clientSecret);
            setClientSecret(res.data.clientSecret);
          });
  },[aixosSecure])
    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);

        if (card === null) {
            return;
        }
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card,
          });
          if (error) {
            console.log("Payment Error", error);
            setError(error.message);
          } else {
            console.log("Payment Method", paymentMethod);
            setError("");
          }
      
          const { paymentIntent, error: confirmError } =
          await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
              card: card,
              billing_details: {
                email: user?.email || "anonymous",
                name: user?.displayName || "anonymous",
              },
            },
          });
          if (confirmError) {
            console.log("confirm error");
          } else {
            console.log("payment intent", paymentIntent);
            if (paymentIntent.status === "succeeded") {
              console.log("transaction id", paymentIntent.id);
              setTransactionId(paymentIntent.id);
              const payment = {
                email: user.email,
           
                price: 1000,
                transactionId: paymentIntent.id,
                date: new Date(), 
                status: "PAID",
              };
             
              const res = await aixosSecure.post(`/user/payments/${user?.email}`, payment);
              console.log("payment saved", res.data);
              
              if (res.data?.modifiedCount) {
                Swal.fire({
                  position: "top-end",
                  icon: "success",
                  title: "Thank you for the payment",
                  showConfirmButton: false,
                  timer: 1500,
                });
               navigates('/deshbord/myprofile');
              }
            }
          }
       
   
    };

    return (
        <div className="bg-[#51bcee]  h-screen">
            <form className="sm:w-96 m-auto bg-[#fff] rounded  shadow-[#a19f9f] shadow-2xl p-5" onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <div className="flex justify-center">
                <button className="mt-5 bg-[#3feb56] p-2 px-6 rounded" type="submit" disabled={!stripe || !clientSecret}>
                    Pay
                </button>
                </div>
                <p className=" text-red-900 font-bold">{error}</p>
                {transactionId && (
        <p className="text-green-600"> Your transaction id: {transactionId}</p>
      )}
            </form>
        </div>
    );
};

export default CheckOut;



