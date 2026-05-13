import {create} from 'zustand'
import axiosInstance from '../api/axiosConfig'

export const useAuth = create((set)=>({
    currentUser:null,
    isAuthenticated: false,
    loading: false,
    error: null,
    login: async(userObjWithRole)=>{
        const { role, ...userObj} = userObjWithRole
        try
        {
            // Set Loading State
            set({loading:true,err:null})
            // Make API Req
            let res = await axiosInstance.post("/common-api/login",userObj)
                    
            set({loading:false,error:null,isAuthenticated:true,currentUser:res.data.payload})
            
            console.log(res)
            // Update State
            
            
        }
        catch(err){
            //  Set Error
            console.log("Error is: ",err)
            const backendErrorMessage = err.response?.data?.reason || err.response?.data?.message || err.message;
            set({
                loading: false,
                isAuthenticated: false,
                currentUser: null,
                error: backendErrorMessage
            })

        }
    },
    checkAuth: async () => {
        try{
            set({loading:true,error:null})
            let res = await axiosInstance.get("/common-api/check-auth")
            set({loading:false,error:null,isAuthenticated:true,currentUser:res.data.payload})
        }
        catch(err)
        {
            console.log("checkAuth caught an error: ", err.message)
            // If the backend returns 401, it simply means the user has no active session.
            // We should NOT display this as an error on the UI.
            const isUnauthorized = err.response?.status === 401;
            const backendErrorMessage = isUnauthorized ? null : (err.response?.data?.reason || err.response?.data?.message || err.message);
            
            set({
                loading: false,
                isAuthenticated: false,
                currentUser: null,
                error: backendErrorMessage
            })
        }
        
    },
    logout: async()=>{
        try
        {
            // Set Loading State
            set({loading:true,err:null})
            // Make API Req
            let res = await axiosInstance.get("/common-api/logout")
                
            // Update State
            set({loading:false,error:null,isAuthenticated:false,currentUser:null})
            
            console.log(res)
            
            
            
        }
        catch(err){
            //  Set Error
            console.log("Error is: ",err)
            const backendErrorMessage = err.response?.data?.reason || err.response?.data?.message || err.message;
            set({
                loading: false,
                isAuthenticated: false,
                currentUser: null,
                error: backendErrorMessage
            })

        }
    }
}))