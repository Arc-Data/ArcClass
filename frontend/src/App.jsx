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
import Calendar from "./pages/Calendar"
import Classroom from "./pages/Classroom/Classroom"
import JoinClassroomModal from "./modals/JoinClassroomModal"
import { ClassroomProvider } from "./context/ClassroomContext"
import ClassroomLayout from "./layouts/ClassroomLayout"
import People from "./pages/Classroom/People"

/* 
// [ ] - Create Profile Customization Section
// Optionally a mobile menu option similar to anilist 
// [ ] - Classroom Not Found 
*/

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
						<Route element={
							<ClassroomProvider>
								<DefaultLayout />
							</ClassroomProvider>}>
							<Route path="/home" element={<Home/>} />	
							<Route path="/calendar" element={<Calendar/>} />
							<Route element={<ClassroomLayout />} >
								<Route path="/classroom/:id" element={<Classroom/>} />	
								<Route path="/classroom/:id/people" element={<People />} />
							</Route>	
							<Route path="/classroom/:id/join" element={<Home />}> {/* New route to handle modal */}
								<Route index element={<JoinClassroomModal />} /> {/* Open the modal on this route */}
                            </Route>
						</Route>
					</Route>
					
				</Routes>
			</AuthProvider>
		</BrowserRouter>
	)
}

export default App
