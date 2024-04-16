import React from 'react'

export async function getServerSideProps() {
    const response = await axios.get(
        'http://localhost:8080/message/readLogs',
        {
            headers: {
                //user token to find user
                accept: "*/*",
                "Content-Type": "application/json",
            }
        }
    )

    return {props: {response}}
}


const page = ( {response} ) => {
  return (
    <div>
        <table>
 
        </table>
    </div>
  )
}

export default page