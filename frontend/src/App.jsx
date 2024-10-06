import "./index.css"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import ScrollToTop from "./components/ScrollToTop"
import Landing from "./pages/Landing/Landing"
import AuthLayout from "./layouts/AuthLayout"
import SignIn from "./pages/Landing/SignIn"
import SignUp from "./pages/Landing/SignUp"
import { AuthProvider } from "./context/AuthContext"
import BaseRoutes from "./routes/BaseRoutes"
import UserRoutes from "./routes/UserRoutes"
import Home from "./pages/Home"
import DefaultLayout from "./layouts/DefaultLayout"

function App() {
	return (
		<BrowserRouter>
			<ScrollToTop/>
			<AuthProvider>
				<Routes>
					<Route element={<BaseRoutes />}>
						<Route path="/" element={<Landing/>} />
						<Route element={<AuthLayout/>}>
							<Route path="/signin" element={<SignIn/>} />
							<Route path="/signup" element={<SignUp/>} />
						</Route>
					</Route>
					<Route element={<UserRoutes/>}>
						<Route element={<DefaultLayout />}>
							<Route path="/home" element={<Home/>} />					
						</Route>
					</Route>
					
				</Routes>
			</AuthProvider>
		</BrowserRouter>
	)
}

export default App
