import axios from "axios";








export async function POST(request) {    
    
    try {
        // Parse the request body from Next.js frontend
        const requestData = await request.json();

        // Send the data to the Express server
        const response = await axios.post("http://localhost:10000/admin/posts/manage/create", requestData, {
            headers: {
                "Content-Type": "application/json",
            },
        });

        // Return the response from the Express server
        return Response.json(response.data);

    } catch (error) {
        return Response.json({ message: "Failed to post data", error }, { status: 500 });
    };
};
