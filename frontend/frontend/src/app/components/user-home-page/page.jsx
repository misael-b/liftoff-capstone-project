import React from 'react'
import GetFromUsername from './getUser'
import Profile from './Profile'


const page = () => {
    return (
        <>
            <GetFromUsername />
            <Profile />
        </>
    )
}

export default page