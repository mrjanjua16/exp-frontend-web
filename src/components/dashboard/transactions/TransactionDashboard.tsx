import React, { ReactNode } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { BadgeCheck, CreditCard, PencilIcon } from 'lucide-react'

interface balanceDataProp {
  day: string,
  balance: number,
}

interface transactionProp {
  id: number,
  name: string,
  amount: number,
  date: string,
  category: string,
  account: string,
}

interface budgetProp {
  name: string,
  amount: number,
  total: number,
}

interface TransactionDashboardProps {
  balanceData: balanceDataProp[],
  transactions: transactionProp[], 
  budgets: budgetProp[],
  table: ReactNode,
}

export default function TransactionDashboard({
  balanceData, 
  transactions, 
  budgets,
  table
}: TransactionDashboardProps) {
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-2">
        <div className="lg:col-span-3 space-y-2">
          {/* Balance Card */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Your Balance</CardTitle>
              <PencilIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$42,487.25</div>
              <Tabs defaultValue="personal" className="w-full mt-4">
                <TabsList>
                  <TabsTrigger value="personal">Personal</TabsTrigger>
                  <TabsTrigger value="business">Business</TabsTrigger>
                  <TabsTrigger value="loans">Loans</TabsTrigger>
                </TabsList>
              </Tabs>
              <div className="h-[200px] mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={balanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="balance" stroke="#8884d8" activeDot={{ r: 8 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Transaction History */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle>Transaction History</CardTitle>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">Choose Date</Button>
                <Button variant="secondary" size="sm">Filter</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="relative overflow-x-auto">
                {table}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          {/* User Profile Card */}
          <Card>
            <CardContent className="flex flex-col items-center pt-6">
              <Avatar className="h-24 w-24">
                <AvatarImage src="/placeholder.svg?height=96&width=96" />
                <AvatarFallback>XA</AvatarFallback>
              </Avatar>
              <h3 className="mt-4 text-lg font-semibold">X_AE_B-251</h3>
              <div className="flex items-center mt-2 text-sm text-muted-foreground">
                <BadgeCheck className="mr-1 h-4 w-4 text-blue-500" />
                Pro Member
              </div>
              <p className="mt-1 text-sm text-muted-foreground">Professional Designer</p>
            </CardContent>
          </Card>

          {/* My Cards */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">My Cards</CardTitle>
              <Button variant="ghost" size="sm" className="h-8 w-8 px-0">
                +
              </Button>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 p-4 text-white">
                <div className="flex justify-between items-start mb-4">
                  <CreditCard className="h-8 w-8" />
                  <span className="text-xl font-bold">slothui</span>
                </div>
                <div className="mb-2 text-lg">0087 1157 0587 6187</div>
                <div className="flex justify-between text-sm">
                  <span>AZURYAN U WU</span>
                  <span>08/11</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* My Budgets */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">My Budgets</CardTitle>
              <Button variant="ghost" size="sm" className="h-8 w-8 px-0">
                +
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {budgets.map((budget, index) => (
                  <div key={index} className="flex flex-col space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>{budget.name}</span>
                      <span>${budget.amount} left</span>
                    </div>
                    <Progress value={(budget.amount / budget.total) * 100} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}