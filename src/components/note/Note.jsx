import React from 'react'

const Note = ({text}) => {

  return (
    // <div style={{display: 'inline-block', border: '2px solid', width: '250px', height: '150px', marginTop: '0', paddingTop: '0'}}></div>
    <div style={{width: '100px', height: '100px', border: '1px solid' }}>{text}</div>
  )
}

export default Note