'use client'

import { LayoutDashboard, Users, Grid, Settings } from "lucide-react"
import DashboardLayout from "@/components/dashboard/GenericDashboard"
import { Button } from "@/components/ui/button"
import MaleAvatar from "@/components/svg/MaleAvatar"

export default function MyDashboardPage() {
    // Define sidebar items with icons, labels, and optional sub-items
    const sidebarItems = [
        {
            icon: <LayoutDashboard className="mr-3 h-5 w-5 text-green-500" />,
            label: "Dashboard",
            onClick: () => console.log("Navigating to Dashboard"),
        },
        {
            icon: <Users className="mr-3 h-5 w-5 text-green-500" />,
            label: "Account",
            onClick: () => console.log("Navigating to Users"),
        },
        {
            icon: <Grid className="mr-3 h-5 w-5 text-green-500" />,
            label: "Transaction",
            onClick: () => console.log("Navigating to Projects"),
        },
        {
            icon: <Grid className="mr-3 h-5 w-5 text-green-500" />,
            label: "Income",
            onClick: () => console.log("Navigating to Projects"),
        },
        {
            icon: <Grid className="mr-3 h-5 w-5 text-green-500" />,
            label: "Expense",
            onClick: () => console.log("Navigating to Projects"),
        },
        {
            icon: <Grid className="mr-3 h-5 w-5 text-green-500" />,
            label: "Category",
            onClick: () => console.log("Navigating to Projects"),
        },
        {
            icon: <Settings className="mr-3 h-5 w-5 text-green-500" />,
            label: "Settings",
            subItems: [
                { label: "Profile Settings" },
                { label: "Account Settings" },
                { label: "Notification Settings" },
            ],
            onClick: () => console.log("Toggling Settings Submenu"),
        },
    ]


    const dropdownItems = [
        {
            icon: <LayoutDashboard className="mr-3 h-5 w-5 text-green-500" />,
            label: "Profile",
            onClick: () => console.log("Navigating to Profile"),
        },
        {
            icon: <Users className="mr-3 h-5 w-5 text-green-500" />,
            label: "Settings",
            onClick: () => console.log("Navigating to Users"),
        },
    ]

    // Custom header content
    const header = (
        <div className="flex justify-end w-full">
            <Button variant="default" className="bg-green-500 hover:bg-green-400" onClick={() => console.log("Custom Action Clicked")}>
                Add Transaction
            </Button>
        </div>
    )

    const user = (
        <div>
            <h2>John Doe</h2>
            <h1>john.doe@email.com</h1>
        </div>
    )

    // Render the DashboardLayout with the defined props
    return (
        <DashboardLayout
         sidebarItems={sidebarItems} 
         dropdownLabel={user}
         dropdownItems={dropdownItems}
         header={header}
         avatar={<MaleAvatar />}
        >
            {/* Main content for the dashboard page */}
            <div className="p-4">
                <h2 className="text-xl font-bold">Welcome to your Dashboard</h2>
                <p className="text-gray-600 mt-2">Here is the summary of your projects and activities.</p>
                {/* Additional content can be added here */}
            </div>
        </DashboardLayout>
    )
}
