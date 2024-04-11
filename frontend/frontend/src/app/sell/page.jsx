import React from 'react'
import Layout from '../layout'
import { navigate } from '../actions'


const page = async (e) => {
  try {
    const response = await axios.get(
      "http://localhost:8080/post/get",
      {
        headers: {
          accept: "*/*",
          "Content-Type": "application/json",
        }
      }
    )


  } catch (e) {

  }


  return (
    <Layout>
      <div className="listOfUserPosts"></div>
      
      <div className="createPostButtonContainer">
        <form action={navigate}>
          <button>New Post</button>
        </form>
        </div>
        <hr className="verticalLine"></hr>
    </Layout>
  )
}

export default page