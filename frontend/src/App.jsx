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
import Classroom from "./pages/Classroom/Classroom"
import JoinClassroomModal from "./modals/JoinClassroomModal"
import { ClassroomProvider } from "./context/ClassroomContext"
import ClassroomLayout from "./layouts/ClassroomLayout"
import People from "./pages/Classroom/People"
import { HomeProvider } from "./context/HomeContext"
import AssignmentDetail from "./pages/AssignmentDetail"
import ClassroomAssignments from "./pages/Classroom/ClassroomAssignments"
import Assignments from "./pages/Assignments"
import CalendarView from "./pages/CalendarView"
import { AssignmentDetailProvider } from "./context/AssignmentDetailContext"
import AssignmentLayout from "./layouts/AssignmentLayout"

/* 
// [ ] : Create Profile Customization Section
// Optionally a mobile menu option similar to anilist 
// [ ] : Toasters!
// [ ] : Custom default page
// [ ] : Add a feature in progress component
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
							<HomeProvider>
								<DefaultLayout />
							</HomeProvider>}>
							
							<Route path="/home" element={<Home/>} />	
							<Route path="/calendar" element={<CalendarView />} />
							<Route path="/assignments" element={<Assignments/>} />
							<Route element={
							<AssignmentDetailProvider>
								<AssignmentLayout />
							</AssignmentDetailProvider>}>
								{/* <Route element={<AssignmentLayout />}> */}
									<Route path="/assignments/:id" element={<AssignmentDetail/>} />
								{/* </Route> */}
							</Route>
							
							<Route path="/classroom/:id" element={
								<ClassroomProvider><ClassroomLayout /></ClassroomProvider>} >
									<Route path="" element={<Classroom/>} />	
									<Route path="assignments" element={<ClassroomAssignments/>} />
									<Route path="people" element={<People />} />
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
