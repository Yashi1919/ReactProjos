import React, { useEffect } from "react";
import Main from "./components/Main";
import SideBar from "./components/SideBar";
import Footer from "./components/Footer";
import { useState } from "react";

export default function App(){
  

  const [showModel,setShowModel]=useState(false)
  const [data,setData]=useState(null)
  const[loading,setLoading]=useState(false)

useEffect(()=>{
  async function fetchAPIData(){
    const NASA_KEY='bZgXnAydSz1SrFyoFgUpP2SZAmGreGsMfo0gToh1'
    const url='https://api.nasa.gov/planetary/apod'+
    `?api_key=${NASA_KEY}`
    try{
      const res=await fetch(url)
      const apidata=await res.json()
console.log(apidata)
      setData(apidata)
    }catch(error){
      console.log(error.message)
    }
  }
  fetchAPIData()
},[])

  function handleToggleModal(){
    setShowModel(!showModel)
  }
  return(
    <>
    
    {data ?<Main data={data}/>:(<div className="loadingState"><i class="fa-solid fa-gear"></i></div>)}
    {showModel?<SideBar data={data}showModel={showModel} handleToggleModal={handleToggleModal}></SideBar>:<></>}
    {data &&<Footer data={data} showModel={showModel} handleToggleModal={handleToggleModal}/>}
    
    </>
  )
}

