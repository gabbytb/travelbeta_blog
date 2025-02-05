import axios from "axios";



export async function GET() {    
    try {

        // Make a request to the Express server
        const response = await axios.get("http://localhost:3000/api/data");
        return Response.json(response.data);

    } catch (error) {
        return Response.json({ message: "Failed to fetch data", error }, { status: 500 });
    }
};
