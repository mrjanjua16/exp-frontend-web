'use client'

import { useState } from "react";
import { LayoutDashboard, Users, Grid, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import MaleAvatar from "@/components/svg/MaleAvatar";

import DashboardLayout from "@/components/dashboard/GenericDashboard";
import Main from "./main/Main";
import Transaction from "./transactions/Transaction";

export default function MyDashboardPage() {
    // State to track the current active component
    const [activeComponent, setActiveComponent] = useState("Dashboard");

    // Define sidebar items with icons, labels, and associated component names
    const sidebarItems = [
        {
            icon: <LayoutDashboard className="mr-3 h-5 w-5 text-green-500" />,
            label: "Dashboard",
            onClick: () => setActiveComponent("Dashboard"),
        },
        {
            icon: <Users className="mr-3 h-5 w-5 text-green-500" />,
            label: "Account",
            onClick: () => setActiveComponent("Account"),
        },
        {
            icon: <Grid className="mr-3 h-5 w-5 text-green-500" />,
            label: "Transaction",
            onClick: () => setActiveComponent("Transaction"),
        },
        {
            icon: <Grid className="mr-3 h-5 w-5 text-green-500" />,
            label: "Income",
            onClick: () => setActiveComponent("Income"),
        },
        {
            icon: <Grid className="mr-3 h-5 w-5 text-green-500" />,
            label: "Expense",
            onClick: () => setActiveComponent("Expense"),
        },
        {
            icon: <Grid className="mr-3 h-5 w-5 text-green-500" />,
            label: "Category",
            onClick: () => setActiveComponent("Category"),
        },
        {
            icon: <Settings className="mr-3 h-5 w-5 text-green-500" />,
            label: "Settings",
            onClick: () => setActiveComponent("Settings"),
        },
    ];

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
    ];

    // Custom header content
    const header = (
        <div className="flex justify-end w-full">
            <Button
             variant="default" 
             className="bg-green-500 hover:bg-green-400" 
             onClick={() => console.log("Custom Action Clicked")}>
                Add Transaction
            </Button>
        </div>
    );

    const user = (
        <div>
            <h2>John Doe</h2>
            <h1>john.doe@email.com</h1>
        </div>
    );

    // Render the selected component based on the active state
    const renderComponent = () => {
        switch (activeComponent) {
            case "Dashboard":
                return <Main />;
            case "Transaction":
                return <Transaction />;
            case "Income":
                return <Transaction />;
            case "Expense":
                return <Transaction />;
            case "Category":
                return <Transaction />;
            case "Settings":
                return <Transaction />;
            case "Account":
                return <div>Account Management</div>;
            default:
                return <div>Welcome to your Dashboard!</div>;
        }
    };

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
            <div className="p-1">
                {renderComponent()}
            </div>
        </DashboardLayout>
    );
}
