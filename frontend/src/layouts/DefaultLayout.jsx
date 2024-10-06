import { Outlet } from "react-router-dom"

const DefaultLayout = () => {
  return (
    <div>
        <div>Default Layout in here</div>
        <Outlet />
    </div>
  )
}

export default DefaultLayout