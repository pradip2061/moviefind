import React, { useEffect, useState } from 'react'
import {  NavLink, useLocation, useNavigate } from 'react-router-dom'
import Card from '../components/Card'
import axios from 'axios'
import img from '../assets/no-video.png'
import { FaSearch } from "react-icons/fa";
import Scroll from '../components/Scroll'
import {toast} from "react-toastify"
import img1 from "../assets/witcher.png"
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css";

import 'swiper/css';
import 'swiper/css/effect-fade';
function Content() {
  const navigate = useNavigate()
const [movie,setMovie]=useState([])
const[trend,setTrend]=useState([])
const[show,setShow]=useState(false)
useEffect(()=>{
const get = async()=>{
await axios.get('https://moviefind-902o.onrender.com/movie/get')
.then((response)=>{
  setMovie(response.data.data)
})
}
get()

},[])

const logout = ()=>{
 localStorage.removeItem('token') 
 toast.success("logout successfully",{className:'toast'});
   navigate('/')
}

const[filter,setFilter]=useState([])
const[input,setInput]=useState('')

 
const render =(e)=>{
  e.preventDefault()
  const movies= movie.filter(item =>item.moviename.toLowerCase().includes(input.toLowerCase()))
  setFilter(movies);
}
useEffect(()=>{
setFilter(movie)
},[!input])
useEffect(()=>{
  setFilter(movie)
},[movie])

useEffect(()=>{
  const gettrend = async()=>{
await axios.get('https://moviefind-902o.onrender.com/movie/gettrend')
.then((response)=>{
setTrend(response.data.data)
})
  }
  gettrend()
},[])

  useEffect(()=>{
setTimeout(() => {
  const messege = localStorage.getItem('messege')
  if(messege){
    console.log('user already set profile')
  }else{
    navigate('/profile')
  }
  
}, 4000);
  },[])
  
  return (
    <div className='show-content'>
    <div className='contentnav'>
        <div  className='lefts'>
        <div  className='titles'>
          <span>MOVIE</span>HUB
        </div>
        </div>
        <div className='search'>
        <form onSubmit={render}>
          <input type='text' value={input} onChange={(e)=>setInput(e.target.value)} placeholder='search movies here'  name='search' required/>
          <FaSearch  className='searchicon' onClick={render}/>
          {
            input ?
            <div className='searchbackup'>
            <h1>hello</h1>
          </div>:null
          }
          </form>
        </div>
        <div className='rights'>
        <button className='create' onClick={()=>navigate('/create')}>Create</button>
       <button className='signups' onClick={logout}>Logout</button>
        </div>
    </div>
    <div className='scrollsection'>
    <Scroll className='scroll-bar'/>
    <div className='popular'>
    { 
      !input?<>
      <h1>Trending Movies</h1>
    <div className='hot'>
    {
      trend.map((item)=>(
        <Swiper className="swipper" key={item._id}>
        <SwiperSlide>
        <button className='hotbutton'>Hot</button>
        <img src={item.image} className='trend-image'/>
        </SwiperSlide>
      </Swiper>
      ))
    }
    </div></>:null
    }
   
  <div className='wrap'>
    <h1 style={{marginTop:40}}>All Movies</h1>
    <div className="app">
    {filter.length > 0 ? 
          filter.map((item) => (
         <Card key={item._id} data={item} />
        )) 
         :
          <div className='error'>
          <img src={img} className='novideo'/>
          <h1>No Videos Found</h1>
          </div> 
        }
    </div>
    </div>
    </div>
    </div>
    </div>
  )
}

export default Content
