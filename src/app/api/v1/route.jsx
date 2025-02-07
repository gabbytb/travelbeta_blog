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
