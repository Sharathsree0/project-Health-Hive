import React, { createContext, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Authcontext=createContext();
export default function AuthProvider({children}) {
const[isLogged,setisLogged]=useState(false);
const[user,setUser]=useState(null);
const navigate=useNavigate();

useEffect(()=>{
    const storedUserId=localStorage.getItem('userid');
    const storedName=localStorage.getItem('name');
if(storedUserId && storedName){
    setUser({id:storedUserId,name:storedName});
    setisLogged(true);
}
},[]);

const login=(userdata)=>{
    localStorage.setItem('userid',userdata.id);
    localStorage.setItem('name',userdata.name);
    setUser(userdata);
    setisLogged(true);
    navigate('/')
}
const logout=()=>{
    localStorage.removeItem('id');
    localStorage.removeItem('name');
    setUser(null);
    setisLogged(false);
    navigate('/login')
}
const value ={isLogged,user,login,logout};

  return (
    <>
    <Authcontext.Provider value={value} >
        {children}
    </Authcontext.Provider>
    
    </>
  )
};
export const useAuth=()=>{
    return useContext(Authcontext);
}
