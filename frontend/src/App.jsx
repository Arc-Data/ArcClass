import "./index.css"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import ScrollToTop from "./components/ScrollToTop"
import Landing from "./pages/Landing/Landing"
import AuthLayout from "./layouts/AuthLayout"
import SignIn from "./pages/Landing/SignIn"
import SignUp from "./pages/Landing/SignUp"

function App() {
	return (
		<BrowserRouter>
			<ScrollToTop/>
			<Routes>
				<Route path="/" element={<Landing/>} />
				<Route element={<AuthLayout/>}>
					<Route path="/signin" element={<SignIn/>} />
					<Route path="/signup" element={<SignUp/>} />
				</Route>
			</Routes>
		</BrowserRouter>
	)
}

export default App
