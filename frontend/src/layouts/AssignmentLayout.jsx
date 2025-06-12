import React from 'react'
import { Outlet } from 'react-router-dom'

const AssignmentLayout = () => {
  return (
    <div>
        <div>Hello</div>
        <Outlet/>
    </div>
  )
}

export default AssignmentLayout