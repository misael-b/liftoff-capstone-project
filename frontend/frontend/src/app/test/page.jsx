"use client";
import React, {useEffect} from 'react'
import RealTimeProductSearch from './RealTimeProductSearch'
const page = () => {
    

    useEffect(() => {
        const loadData = async () => {
            const realTimeProductSearch = RealTimeProductSearch('Nintendo Switch');
        }
        
        loadData();
    })
  return (
    <div></div>
  )
}

export default page