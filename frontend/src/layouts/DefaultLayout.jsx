import { Outlet } from "react-router-dom"
import UserNav from "../components/UserNav"
import { Children, useState } from "react"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import AppSidebar from "@/components/AppSidebar"

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