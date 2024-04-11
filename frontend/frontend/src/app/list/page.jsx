"use client";
import React, {useEffect} from 'react'
import axios from 'axios';
import { useSearchParams } from 'next/navigation';

const page = () => {
    const searchParams = useSearchParams();

    const search = searchParams.get('searchTerm')
    
    try {
        useEffect(() => {
            const response = axios.get(
                'http://localhost8080/post/get/' + search,
                {
                    headers: {
                        accept: "*/*",
                        "Content-Type": "application/json",
                    }
                }
            )
            // return (
            //     <div>
            //         {response.data.map((item) => {
            //             <div>{item}</div>
            //         })}
            //     </div>
            // )
            console.log(response);
        })

        
    } catch (e) {
        console.log(e)
    }





  return (
    <div></div>
  )
}

export default page