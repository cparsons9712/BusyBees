import React from 'react'
import { useParams } from 'react-router-dom'

const BlockDetails = () => {
    let {id} = useParams()
  return (
    <div>
        <h1>Hello there!</h1>
        <p>The id passed in is {id}</p>
    </div>
  )
}

export default BlockDetails
