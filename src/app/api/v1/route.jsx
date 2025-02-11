import { NextResponse } from "next/server";
import axios from "axios";




// ALL AXIOS FOR ARTICLES MODEL
export async function GET() {    

    try {

        // Make a request to the Express server
        const response = await axios.get("http://localhost:10000/admin/posts/manage");
        return Response.json(response.data);

    } catch (error) {
        return Response.json({ message: "Failed to fetch data", error }, { status: 500 });
    };   
};


export async function POST(request) {

    try {

        const requestData = await request.json();
        const response = await axios.post("http://localhost:10000/admin/posts/manage/create", requestData);
        return Response.json(response.data);

    } catch (error) {
        return Response.json({ message: "Failed to create post", error }, { status: 500 });
    };
};



// CREATE NEW ACCOUNT
// export async function POST(requestData) {
    
//     try {
//         // Parse the request body from Next.js frontend
//         const requestData = await request.json();

//         // Send the data to the Express server
//         const response = await axios.post(USER_ENDPOINTS.CREATE_ACCOUNT, requestData);
        
//         // ✅ Correctly return a Next.js response
//         return NextResponse.json(response.data, { status: response.status });

//     } catch (error) {
//         console.error("Error creating post:", error);

//         // ✅ Handle errors properly
//         return NextResponse.json(
//             { 
//                 success: false, 
//                 message: error.response?.data || "Internal Server Error" 
//             },
//             {  
//                 status: error.response?.status || 500 
//             }
//         );
//     };
// };
