import { Outlet } from "react-router-dom"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import AppSidebar from "@/components/AppSidebar"

/* TODO : Save sidebar settings on local state
Sidebar does not remember its own default state when
User clicks on home page for some reason
*/

const DefaultLayout = ({ children }) => {
	return (
		<SidebarProvider>
			<AppSidebar />
			<main className="w-full">
				<SidebarTrigger/>
				<div className="p-4">
					<Outlet />
				</div>
			</main>
		</SidebarProvider>
	)
}

export default DefaultLayout