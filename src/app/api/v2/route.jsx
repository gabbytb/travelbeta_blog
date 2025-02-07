import { NextResponse } from "next/server";
import axios from "axios";







// ALL AXIOS FOR USERS MODEL
export async function POST(req) {    
    
    try {
        
        // Parse the request body from Next.js frontend
        const requestData = await req.json();

        if (!requestData) {
            return NextResponse.json({ error: "Invalid data" }, { status: 400 });
        };

        
        // Send the data to the Express server
        const response = await axios.post("http://localhost:10000/admin/users/manage/create", requestData, {
            headers: {
                "Content-Type": "application/json",
            },
        });

        // Return the response from the Express server
        const { success, data, message } = response.data;

        // Simulate processing...
        const result = { success, data, message };
        return NextResponse.json(result, { status: 200 });

    } 
    // catch (error) {
    //     return Response.json({ message: "Failed to post data", error }, { status: 500 });
    // };
    catch (error) {
        console.error("API Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    };
};
