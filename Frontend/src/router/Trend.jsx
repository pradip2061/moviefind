import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import {toast} from 'react-toastify'
function Trend() {
    const {id}=useParams()
    const navigate=useNavigate()
    const deletes= async()=>{
await axios.delete(`http://localhost:3000/movie/deletetrend/${id}`)
.then((response)=>{
if(response.status==200){
    toast.success('delete successfully')
navigate('/admin')
} else{
    console.log('error something')
}
})
}
  return (
    <div className='skip'>
    <h2>Confirm Deletion</h2>
    <h3>Are you sure want to delete this movie?</h3>
    <div className='delete'>
        <button className='deletes' onClick={deletes}>Yes , Delete</button>
        <button className='cancel' onClick={()=>navigate('/admin')}>Cancel</button>
    </div>
</div>
  )
}

export default Trend



  