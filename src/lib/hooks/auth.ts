import { useMutation } from "@tanstack/react-query";
import { loginApi, signupApi } from "../api/auth";
import { error } from "console";

export function useLogin() {
    return useMutation({
        mutationFn: loginApi,
        onSuccess: (data) => {
            // Save token to local storage
            console.log("Login success :", data);
        },
        onError: (error) => {
            console.log("Login error :", error);
        },
    });
}

export function useSignup() {
    return useMutation({
        mutationFn: signupApi,
        onSuccess: (data) => {
            // Redirect to dashboard
            console.log("Signup success :", data);
        },
        onError: (error) => {
            console.log("Signup error :", error);
        }
    })
}