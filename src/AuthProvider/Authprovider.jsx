/* eslint-disable react/prop-types */
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import auth from "../../public/firebase.config";
import { GoogleAuthProvider } from "firebase/auth";

 export const AuthContext =  createContext(null)
 const providers = new GoogleAuthProvider()
const Authprovider = ({children}) => {
      const [lodding, setLodding] = useState(false)
    const [user, setUser] = useState()
      const creatUser = (email, password)=>{
     return   createUserWithEmailAndPassword(auth, email ,password)

      }


      const signIn = (email, password)=>{
           setLodding(true)
          return signInWithEmailAndPassword(auth, email, password)
        }
        const signOut= () =>{
              setUser(null)
             setLodding(true)
              return signOut(auth)
              
            }

            const googleLogin =()=>{
                  setLodding(true)
                  return signInWithPopup(auth, providers)
                }
    const authUserinfo={user, creatUser, signIn, signOut, googleLogin, lodding}
    
    useEffect(()=>{
     const unsubcribe = onAuthStateChanged( auth, (user) =>{
    //   setUser(creatUser)
             if(user){
                setUser(user)
                setLodding(false)
              
            }
    //  setLodding(false)
  })
   return() =>{
    return unsubcribe
   }

    },[])
    return (
       <AuthContext.Provider value={authUserinfo}>
             {children}
       </AuthContext.Provider>
    );
};

export default Authprovider;