import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { ArrowUpIcon, ChevronDownIcon, ChevronUpIcon } from "lucide-react"

const chartData = [
  { day: '01', current: 30, previous: 40 },
  { day: '02', current: 45, previous: 30 },
  { day: '03', current: 25, previous: 35 },
  { day: '04', current: 55, previous: 25 },
  { day: '05', current: 40, previous: 45 },
  { day: '06', current: 30, previous: 20 },
  { day: '07', current: 35, previous: 40 },
  { day: '08', current: 20, previous: 30 },
  { day: '09', current: 45, previous: 35 },
  { day: '10', current: 50, previous: 40 },
  { day: '11', current: 30, previous: 35 },
  { day: '12', current: 40, previous: 25 },
  { day: '13', current: 25, previous: 30 },
]

export default function FinancialDashboard() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Latest Expenses Card */}
        <Card className="col-span-1 md:col-span-2">
          <CardHeader>
            <div className="flex justify-between items-baseline">
              <div>
                <CardTitle>Latest Expenses</CardTitle>
                <p className="text-sm text-muted-foreground">Expenses summary from 1-12 Apr, 2024</p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold">$1,278.45</p>
                <p className="text-sm text-orange-500 flex items-center justify-end">
                  <ArrowUpIcon className="w-4 h-4 mr-1" />
                  2.1% vs last week
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                <XAxis dataKey="day" axisLine={false} tickLine={false} />
                <Tooltip />
                <Bar dataKey="current" fill="#f97316" radius={[4, 4, 0, 0]} />
                <Bar dataKey="previous" fill="#d1d5db" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
            <div className="flex justify-between mt-4">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-orange-500 rounded-full mr-2"></div>
                <span className="text-sm">Current Expenses</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-gray-300 rounded-full mr-2"></div>
                <span className="text-sm">Compare to last week</span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">View Report</Button>
          </CardFooter>
        </Card>

        {/* Reimbursement Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle>Reimbursement</CardTitle>
            <Button variant="link" className="text-sm">See All</Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Samantha William", amount: "$1,156", status: "Status", description: "Expenses for business trip to Madrid. Flight ticket, hotel for 2 days and for conference ticket entrance.", days: "2 days ago" },
                { name: "Robert Wise", amount: "$1,156", status: "Status" },
                { name: "Jack Summer", amount: "$1,156", status: "Status" },
              ].map((person, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <Avatar className="mt-1">
                    <AvatarImage src={`/placeholder.svg?height=40&width=40`} />
                    <AvatarFallback>{person.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">{person.name}</p>
                      <Button variant="secondary" size="sm" className="h-7 text-xs">
                        {person.status}
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground">{person.amount}</p>
                    {person.description && (
                      <p className="text-xs text-muted-foreground">{person.description}</p>
                    )}
                    {person.days && (
                      <p className="text-xs text-muted-foreground">{person.days}</p>
                    )}
                  </div>
                  {index === 0 ? <ChevronUpIcon className="w-5 h-5 mt-1 flex-shrink-0" /> : <ChevronDownIcon className="w-5 h-5 mt-1 flex-shrink-0" />}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Scheduled Payment Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle>Scheduled Payment</CardTitle>
            <Button variant="link" className="text-sm">See All</Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { initials: "MS", title: "Monthly Salary", date: "Jul, 25", amount: "$90,156" },
                { initials: "AR", title: "Approved Reimbursement", date: "Jul, 28", amount: "$12,485" },
                { initials: "PB", title: "Performance Bonus", date: "Aug, 01", amount: "$23,562" },
                { initials: "AR", title: "Approved Reimbursement", date: "Jul, 28", amount: "$12,485" },
              ].map((payment, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${
                    index % 2 === 0 ? 'bg-orange-400' : 'bg-gray-400'
                  }`}>
                    {payment.initials}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{payment.title}</p>
                    <p className="text-xs text-muted-foreground">{payment.date}</p>
                  </div>
                  <p className="text-sm font-medium">{payment.amount}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Go Premium Card */}
        <Card className="bg-gray-200">
          <CardContent className="flex flex-col items-center justify-center p-6">
            <div className="w-24 h-24 mb-4">
              <img src="/placeholder.svg?height=96&width=96" alt="Premium illustration" className="w-full h-full object-cover" />
            </div>
            <h3 className="text-xl font-bold mb-2">Go Premium</h3>
            <p className="text-center text-sm text-muted-foreground mb-4">
              Unlock more features with premium membership you can
            </p>
            <Button className="w-full" variant="default">Unlock Premium</Button>
          </CardContent>
        </Card>

        {/* Category Card */}
        <Card className="bg-orange-400 text-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle>Category</CardTitle>
            <Button variant="link" className="text-sm text-white">See All</Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Salary", amount: "$90,156", percentage: 100 },
                { name: "Marketing Budget", amount: "$90,156", percentage: 60 },
                { name: "Reimbursement", amount: "$90,156", percentage: 20 },
              ].map((category, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between">
                    <p className="text-sm font-medium">{category.name}</p>
                    <p className="text-sm font-medium">{category.amount}</p>
                  </div>
                  <Progress value={category.percentage} className="h-2 bg-orange-300" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}