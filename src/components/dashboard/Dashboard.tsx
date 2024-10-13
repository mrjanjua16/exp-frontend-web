"use client"

import { useState } from "react"
import { Bell, ChevronDown, Grid, LayoutDashboard, LogOut, Menu, Settings, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function DashboardLayout({}) {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false)
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)

  const toggleSidebar = () => setIsSidebarExpanded(!isSidebarExpanded)
  const toggleMobileSidebar = () => setIsMobileSidebarOpen(!isMobileSidebarOpen)

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`${
          isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transition-transform duration-300 ease-in-out sm:static sm:translate-x-0`}
      >
        <div className="flex h-full flex-col">
          <div className="flex h-16 items-center justify-center">
            <span className="text-2xl font-bold text-blue-600">Logo</span>
          </div>
          <nav className="flex-1 space-y-1 px-2 py-4">
            <Button variant="ghost" className="w-full justify-start">
              <LayoutDashboard className="mr-3 h-5 w-5" />
              Dashboard
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Users className="mr-3 h-5 w-5" />
              Users
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Grid className="mr-3 h-5 w-5" />
              Projects
            </Button>
            <Button variant="ghost" className="w-full justify-start" onClick={toggleSidebar}>
              <Settings className="mr-3 h-5 w-5" />
              Settings
              <ChevronDown className={`ml-auto h-4 w-4 transition-transform ${isSidebarExpanded ? "rotate-180" : ""}`} />
            </Button>
            {isSidebarExpanded && (
              <div className="ml-6 space-y-1">
                <Button variant="ghost" className="w-full justify-start text-sm">
                  Profile Settings
                </Button>
                <Button variant="ghost" className="w-full justify-start text-sm">
                  Account Settings
                </Button>
                <Button variant="ghost" className="w-full justify-start text-sm">
                  Notification Settings
                </Button>
              </div>
            )}
          </nav>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <header className="flex h-16 items-center justify-between border-b bg-white px-4 lg:px-6">
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={toggleMobileSidebar}>
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle sidebar</span>
          </Button>
          <h1 className="text-2xl font-semibold text-gray-800">Overview</h1>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
              <span className="sr-only">Notifications</span>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <img
                    src="/placeholder.svg?height=32&width=32"
                    alt="User avatar"
                    className="rounded-full object-cover"
                  />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">John Doe</p>
                    <p className="text-xs leading-none text-muted-foreground">john.doe@example.com</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          <p className="text-gray-600">Hi Piko, get your summary of your monthly transaction here</p>
          {/* Add your page content here */}
        </main>
      </div>
    </div>
  )
}