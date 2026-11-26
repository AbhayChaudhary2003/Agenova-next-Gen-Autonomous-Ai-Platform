import {signInWithPopup} from 'firebase/auth'
import React from 'react'
import { auth, googleProvider } from '../utils/firebase'
import api from '../utils/axios'

const App = () => {
  const handleLogin = async (token) => {
    try {
      const {data} = await api.post("/auth/login",token)
    }catch(error){
      console.log(error)
    }
    
  }


  const googleLogin = async()=>{
    
    const data = await signInWithPopup(auth, googleProvider)
    const token = data.user.getIdToken()
    console.log(token)
    await handleLogin(token)
    console.log(data)
  }
  return (
    <div className="flex items-center justify-center h-screen bg-gray-500" >
      <button onClick={googleLogin} className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">continue with google</button>
    </div>
  )
}

export default App
