'use client';
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLogin, useSignup } from "@/lib/hooks/auth";
import { useRouter } from 'next/navigation';

export default function GenericAuthPage({
  imageSrc,
  imageAlt,
  upperCardTitle,
  upperCardValue,
  upperCardChange,
  lowerCardTitle,
  lowerCardValue,
  lowerCardChange,
  termsLink,
}: {
  imageSrc: string;
  imageAlt: string;
  upperCardTitle: string;
  upperCardValue: string;
  upperCardChange: string;
  lowerCardTitle: string;
  lowerCardValue: string;
  lowerCardChange: string;
  termsLink: string;
}) {
  const [isSignUp, setIsSignUp] = useState(false);
  const router = useRouter();

  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    password: '',
    password_confirmation: '',
    terms: false,
  });

  const loginMutation = useLogin();
  const signupMutation = useSignup();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prevState => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSignUp) {
      const result = await signupMutation({
        full_name: formData.full_name,
        email: formData.email,
        password: formData.password,
        password_confirmation: formData.password_confirmation,
        terms: formData.terms,
      });
      if (!result.error) {
        router.push('/dashboard');
      }
    } else {
      const result = await loginMutation({
        email: formData.email,
        password: formData.password,
      });
      if (!result.error) {
        router.push('/dashboard');
      }
    }
  };
  

  const handleSignInClick = () => setIsSignUp(false);
  const handleSignUpClick = () => setIsSignUp(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 to-blue-500 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Left: Image Section */}
        <Card className="bg-gray-100 p-6 relative">
          <div className="absolute top-4 left-4 bg-white rounded-full p-2 shadow-md">
            <Heart className="text-purple-500 hover:text-purple-700" />
          </div>
          <Image
            src={imageSrc}
            width={400}
            height={400}
            alt={imageAlt}
            className="w-full h-auto"
          />
          {/* Upper and Lower Cards */}
          <Card className="absolute top-12 left-12 p-2 shadow-lg">
            <h3 className="text-sm font-semibold">{upperCardTitle}</h3>
            <p className="text-xs text-gray-500">This Month</p>
            <div className="flex items-baseline mt-2">
              <span className="text-2xl font-bold">{upperCardValue}</span>
              <span className="ml-2 text-sm text-green-500">{upperCardChange}</span>
            </div>
          </Card>
          <Card className="absolute bottom-12 right-12 p-2 shadow-lg">
            <h3 className="text-sm font-semibold">{lowerCardTitle}</h3>
            <p className="text-xs text-gray-500">Previous Month</p>
            <div className="flex items-baseline mt-2">
              <span className="text-2xl font-bold">{lowerCardValue}</span>
              <span className="ml-2 text-sm text-red-500">{lowerCardChange}</span>
            </div>
          </Card>
        </Card>

        {/* Right: Form Section */}
        <Card className="p-6 flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2 flex items-center">
              {isSignUp ? "Sign Up" : "Sign In"} <Rocket className="ml-2" />
            </h2>
            <p className="text-gray-600 mb-6">
              {isSignUp
                ? "Create an account to get started"
                : "Welcome back! Please sign in."}
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Show additional fields for Sign Up */}
              {isSignUp ? (
                <div>
                  <div className="space-y-2">
                    <Label htmlFor="full_name">Full Name</Label>
                    <Input id="full_name" type="text" placeholder="Enter your full name" value={formData.full_name} onChange={handleInputChange} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="Enter your email" value={formData.email} onChange={handleInputChange} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" placeholder="Enter your password" value={formData.password} onChange={handleInputChange} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password_confirmation">Password Confirmation</Label>
                    <Input id="password_confirmation" type="password" placeholder="Enter your password again for confirmation" value={formData.password_confirmation} onChange={handleInputChange} />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="terms" checked={formData.terms} onChange={(e) => setFormData(prevState => ({ ...prevState, terms: e.target.checked }))} />
                    <Label htmlFor="terms" className="text-sm">
                      I agree to{" "}
                      <Link href={termsLink} className="text-purple-600 hover:underline">
                        privacy policy & terms
                      </Link>
                    </Label>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="Enter your email" value={formData.email} onChange={handleInputChange} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" placeholder="Enter your password" value={formData.password} onChange={handleInputChange} />
                  </div>
                </div>
              )}
              <Button className="w-full">
                {isSignUp ? "Sign Up" : "Sign In"}
              </Button>
            </form>
          </div>

          {/* Switch between Sign In and Sign Up */}
          <div className="mt-6 text-center">
            {isSignUp ? (
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <button onClick={handleSignInClick} className="text-purple-600 hover:underline">
                  Sign in instead
                </button>
              </p>
            ) : (
              <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <button onClick={handleSignUpClick} className="text-purple-600 hover:underline">
                  Sign up instead
                </button>
              </p>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
