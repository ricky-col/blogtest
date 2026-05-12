import {create} from 'zustand'
import axios from 'axios'

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
            let res = await axios.post("http://localhost:4000/common-api/login",userObj,{withCredentials:true})
                    
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
            let res = await axios.get("http://localhost:4000/common-api/check-auth",{withCredentials: true})
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
            let res = await axios.get("http://localhost:4000/common-api/logout",{withCredentials:true})
                
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