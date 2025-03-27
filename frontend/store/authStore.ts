import { create } from "zustand";
import axios from "axios";

const API_URL = 'http://localhost:5500/api/v1/auth';

axios.defaults.withCredentials = true;

export const useAuthStore = create((set: any) => ({
    user: undefined,
	isAuthenticated: false,
	error: null,
	isLoading: false,
	isCheckingAuth: true,
	message: null,
    // isVerified: false,

    checkAuth: async () => {
        set({ isCheckingAuth: true, error: null})
        try{
            const response  = await axios.get<any>(`${API_URL}/check-auth`)
            set({user: response.data.user, isAuthenticated: true, isCheckingAuth: false})
        }   
        catch(error: any){
            set({error: null, isAuthenticated: false, isCheckingAuth: false})
        }
    },
    signup: async (firstName: String,lastName: String,username: String,email: String,password: String) => {
        set({ isLoading: true, error: null });
        try{
            const response = await axios.post<any>(`${API_URL}/sign-up`,{firstName,lastName,username,email,password})
            set({
                user: response.data.user.user, 
                isAuthenticated: true, 
                isLoading: false,                 
                isVerified: response.data.user.user.isVerified
            })
        }
        catch(error: any){
            set({ error: error.response.request.status || "Error signing up", isLoading: false });
			throw error;
        }
    },
    signin:async (email: String, password: String) => {
        set({ isLoading: true, error: null });
        try{
            const response = await axios.post<any>(`${API_URL}/sign-in`,{email,password})
            set({
                isAuthenticated: true,
                user: response.data.user.user,
                error: null,
                isLoading: false,
            })
        }
        catch(error: any){
            set({ error: error.response?.data?.message || "Error logging in", isLoading: false });  
			throw error;
        }
    },
    signout:async () => {
        set({ isLoading: true, error: null });
        try{
            const response = await axios.post<any>(`${API_URL}/sign-out`)
            set({user:null, isAuthenticated: false, error:null, isLoading: false})
        }
        catch(error: any){
            set({ error: "Error logging out", isLoading: false });
			throw error; 
        }
    },
    // verifyEmail:async (code: any) => {
    //     set({ isLoading: true, error: null });
    //     try{
    //         const response = await axios.post<any>(`${API_URL}/verify-email`,{code})
    //         set({ user: response.data.user, isAuthenticated: true, isLoading: false, isVerified: true });
    //         return response.data
    //     }
    //     catch(error: any){
    //         set({ error: error.response.data.message || "Error verifying email", isLoading: false, isVerified: false });
	// 		throw error;
    //     }
    // },
    // forgotPassword: async (email: String) => {
    //     set({ isLoading: true, error: null });
    //     try{
    //         const response = await axios.post<any>(`${API_URL}/forgot-password`,{email})
    //         set({ message: response.data.message, isLoading: false });
    //     }
    //     catch(error: any){
    //         set({
	// 			isLoading: false,
	// 			error: error.response.data.message || "Error sending reset password email",
	// 		});
	// 		throw error;
    //     }
    // },
    // resetPassword: async (token: any, password: String) => {
    //     set({ isLoading: true, error: null });
    //     try{
    //         const response = await axios.post<any>(`${API_URL}/reset-password/${token}`, {password})
    //         set({ message: response.data.message, isLoading: false });
    //     }
    //     catch (error: any) {
    //         set({
    //             isLoading: false,
    //             error: error.response.data.message || "Error resetting password",
    //         });
    //         throw error;
    //     }
    // }
}))