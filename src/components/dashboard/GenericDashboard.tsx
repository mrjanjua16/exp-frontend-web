"use client"

import { useState, ReactNode } from "react"
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

// Define the type for sidebar items
type SidebarItem = {
  icon: ReactNode,
  label: string,
  subItems?: { label: string }[],
  onClick?: () => void
};

type DropDownItem = {
  icon: ReactNode,
  label: string,
}

interface DashboardLayoutProps {
  sidebarItems: SidebarItem[];
  dropdownLabel: ReactNode;
  dropdownItems: DropDownItem[];
  header?: ReactNode;
  avatar?: ReactNode;
  children: ReactNode;
  initialSidebarExpanded?: boolean; // Control initial expanded state of the sidebar
  initialMobileSidebarOpen?: boolean; // Control initial mobile sidebar state
}

export default function DashboardLayout({
  sidebarItems,
  dropdownLabel,
  dropdownItems,
  header,
  avatar,
  children,
  initialSidebarExpanded = false,
  initialMobileSidebarOpen = false,
}: DashboardLayoutProps) {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(initialSidebarExpanded)
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(initialMobileSidebarOpen)

  const toggleSidebar = () => setIsSidebarExpanded(!isSidebarExpanded)
  const toggleMobileSidebar = () => setIsMobileSidebarOpen(!isMobileSidebarOpen)

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`${
          isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } fixed inset-y-0 left-0 z-50 w-40 bg-white shadow-lg transition-transform duration-300 ease-in-out sm:static sm:translate-x-0`}
      >
        <div className="flex h-full flex-col">
          <div className="flex h-16 items-center justify-center">
            <span className="text-2xl font-bold text-blue-600">Logo</span>
          </div>
          <nav className="flex-1 space-y-1 px-2 py-4">
            {sidebarItems.map((item, index) => (
              <div key={index}>
                <Button variant="ghost" className="w-full justify-start" onClick={item.onClick}>
                  {item.icon}
                  {item.label}
                  {item.subItems && (
                    <ChevronDown className={`ml-auto h-4 w-4 transition-transform ${isSidebarExpanded ? "rotate-180" : ""}`} />
                  )}
                </Button>
                {isSidebarExpanded && item.subItems && (
                  <div className="ml-6 space-y-1">
                    {item.subItems.map((subItem, subIndex) => (
                      <Button key={subIndex} variant="ghost" className="w-full justify-start text-sm">
                        {subItem.label}
                      </Button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <header className="flex h-16 items-center justify-between border-b bg-white px-4 lg:px-6">
          <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleMobileSidebar}>
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle sidebar</span>
          </Button>
          {header ?? <h1 className="text-2xl font-semibold text-gray-800">Overview</h1>}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
              <span className="sr-only">Notifications</span>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  {/* <img src="" alt="User avatar" className="rounded-full object-cover" /> */}
                  {avatar}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  {dropdownLabel}
                  {/* <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">John Doe</p>
                    <p className="text-xs leading-none text-muted-foreground">john.doe@example.com</p>
                  </div> */}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                  {dropdownItems.map((item, index) => (
                    <div key={index}>
                      <DropdownMenuItem>
                        {item.icon}
                        {item.label}
                      </DropdownMenuItem>
                    </div>
                  ))}
                  {/* <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span> */}
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
          {children}
        </main>
      </div>
    </div>
  )
}
