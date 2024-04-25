import React from 'react'
import Update from './Update';
import Layout from '../layout'
import Delete from './Delete'


const page = () => {
    return (
        <Layout>
            <Update />
            <Delete />
        </Layout>
        
    )
}

export default page