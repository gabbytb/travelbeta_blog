import { NextResponse } from "next/server";
import axios from "axios";
import { USER_ENDPOINTS } from "@/app/endpoints";







// ALL AXIOS FOR USERS MODEL
export const POST = async (request) => {
    
    try {
        // Parse the request body from Next.js frontend
        const requestData = await request.json();

        // Send the data to the Express server
        const response = await axios.post(USER_ENDPOINTS.CREATE_ACCOUNT, requestData);
        return response.data;

    } catch (error) {
        console.error("Error creating post:", error);
        throw error;
    }; 
};


// export async function POST(requestData) {    
    
//     try {
                        
//         // Send the data to the Express server
//         const response = await axios.post(USER_ENDPOINTS.CREATE_ACCOUNT, requestData);
//         return response.data;

//     } catch (error) {
//         console.error("Error creating post:", error);
//         throw error;
//     };  
// };