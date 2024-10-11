import Image from "next/image"
import Link from "next/link"
import { Heart, Rocket } from "lucide-react"

import { Button } from "@/components/ui/Button"
import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 to-blue-500 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl grid md:grid-cols-2 overflow-hidden">
        <div className="p-6 relative bg-gray-100">
          <div className="absolute top-4 left-4 bg-white rounded-full p-2 shadow-md">
            <Heart className="text-purple-500 hover:text-purple-700" />
          </div>
          <Image
            src="/placeholder.svg?height=400&width=400"
            width={400}
            height={400}
            alt="Woman on couch with laptop"
            className="w-full h-auto"
          />
          <Card className="absolute top-12 left-12 p-2 shadow-lg">
            <h3 className="text-sm font-semibold">Sessions</h3>
            <p className="text-xs text-gray-500">This Month</p>
            <div className="flex items-baseline mt-2">
              <span className="text-2xl font-bold">45.1k</span>
              <span className="ml-2 text-sm text-green-500">+12.6%</span>
            </div>
          </Card>
          <Card className="absolute bottom-12 right-12 p-2 shadow-lg">
            <h3 className="text-sm font-semibold">Sales</h3>
            <p className="text-xs text-gray-500">Last Year</p>
            <div className="flex items-baseline mt-2">
              <span className="text-2xl font-bold">175k</span>
              <span className="ml-2 text-sm text-red-500">-16.2%</span>
            </div>
          </Card>
        </div>
        <div className="p-6 flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2 flex items-center">
              Adventure starts here <Rocket className="ml-2" />
            </h2>
            <p className="text-gray-600 mb-6">Make your expense management easy and fun!</p>
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="full_name">Full Name</Label>
                <Input id="full_name" placeholder="John Doe" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="john.doe@example.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password_confirmation">Confirm Password</Label>
                <Input id="password_confirmation" type="password" />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="terms" />
                <Label htmlFor="terms" className="text-sm">
                  I agree to{" "}
                  <Link href="#" className="text-purple-600 hover:underline">
                    privacy policy & terms
                  </Link>
                </Label>
              </div>
              <Button className="w-full">Sign up</Button>
            </form>
          </div>
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link href="#" className="text-purple-600 hover:underline">
                Sign in instead
              </Link>
            </p>
            {/* Social Media Sign Ins */}
            {/* <div className="mt-4">
              <p className="text-xs text-gray-500 mb-2">or</p>
              <div className="flex justify-center space-x-4">
                <Button variant="outline" size="icon">
                  <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </Button>
                <Button variant="outline" size="icon">
                  <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                  </svg>
                </Button>
                <Button variant="outline" size="icon">
                  <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
                  </svg>
                </Button>
              </div>
            </div> */}
          </div>
        </div>
      </Card>
    </div>
  )
}