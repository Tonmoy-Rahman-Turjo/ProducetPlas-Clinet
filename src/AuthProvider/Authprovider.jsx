/* eslint-disable react/prop-types */
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import auth from "../../public/firebase.config";
import { GoogleAuthProvider } from "firebase/auth";
import useAxiosHook from "../UseHook/UseAxiosHook";

// import { useNavigate } from "react-router-dom";

export const AuthContext = createContext(null)
const providers = new GoogleAuthProvider()

const Authprovider = ({ children }) => {
  const aixiospublic = useAxiosHook()

  const [lodding, setLodding] = useState(true)
  const [user, setUser] = useState(null)
  const updateuserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, { displayName: name, photoURL: photo })
  }
  const creatUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password)

  }


  const signIn = (email, password) => {
    setLodding(true)

    return signInWithEmailAndPassword(auth, email, password)
  }
  const signOute = () => {
    setUser(null)

    setLodding(true)
    return signOut(auth)

  }


  const googleLogin = () => {
    setLodding(true)
    return signInWithPopup(auth, providers)
  }
  const authUserinfo = { user, creatUser, signIn, signOute, googleLogin, lodding, updateuserProfile }

  useEffect(() => {
    const unsubcribe = onAuthStateChanged(auth, creatUser => {
      setUser(creatUser)
      if (creatUser) {
        const userinfo = { email: creatUser.email }
        aixiospublic.post('/jwt', userinfo,)
          .then(res => {
            
            if (res.data.token) {
              localStorage.setItem('access-token', res.data.token)
              console.log(res.data.token)
            }
          })
      }
      else {
        localStorage.removeItem('access-token')
      }

      setLodding(false)


    })
    return () => {
      return unsubcribe
    }

  }, [aixiospublic])
  return (
    <AuthContext.Provider value={authUserinfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default Authprovider;



