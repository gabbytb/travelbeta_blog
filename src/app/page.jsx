"use client";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:10000"; // Default to local







const SearchParamsHandler = () => {

    const searchParams = useSearchParams();
    const page = searchParams.get("page") ? parseInt(searchParams.get("page")) : 1;

    return <HomeContent page={page} />;
};



const HomeContent = ({ page }) => {
    

    const [result, setResult] = useState({ posts: [], pagination: {} });
    console.log("HOMEPAGE - BLOG ARTICLES: ", result);

    const [loading, setLoading] = useState(true);
    // console.log("IS LOADING: ", loading);



    ////////////////////////////////////////////
    // SET PAGE TITLE
    ////////////////////////////////////////////
    useEffect(() => {
        document.title = "Travelbeta Blog: Home";
    }, []);
    ////////////////////////////////////////////
    ////////////////////////////////////////////



    ////////////////////////////////////////////
    // GET ALL POST ARTICLES
    ////////////////////////////////////////////
    useEffect(() => {

        const fetchPosts = async () => {   

            setLoading(true);

            const custom_status = "";
            const pageLimit = 6;
            axios.get(`${API_BASE_URL}/api/v1/admin/posts/manage?status=${custom_status}&limit=${pageLimit}&page=${page}`)   // Fetch from Express API
            .then((response) => {
                const { success, data, message } = response.data;
                setResult(data);
            })
            .catch((err) => console.error("Error fetching data:", err))
            .finally(() => setLoading(false));

        };
        fetchPosts();

    }, [page]);
    ////////////////////////////////////////////  
    ////////////////////////////////////////////




    
    return (
        <>
            <header className="shadow">
                <nav className="flex justify-center w-full h-20">
                    
                    <div className="flex w-32">
                        {/* <Image src={``} alt="" className="w-full" /> */}
                    </div>


                    <ul className="flex justify-between items-center w-96">
                        <li>
                            <Link href="" alt="">
                                <span> <p>Flights</p></span>
                            </Link>
                        </li>
                        
                        
                        <li>
                            <Link href="" alt="">
                                <span> <p>Hotels</p></span>
                            </Link>
                        </li>
                        
                        
                        <li>
                            <Link href="" alt="">
                                <span> <p>Visa</p></span>
                            </Link>
                        </li>

                        
                        <li>
                            <Link href="" alt="">
                                <span> <p>Packages</p></span>
                            </Link>
                        </li>
                    </ul>

                </nav>
            </header>



            <main>
           
                {
                    loading ? 
                            (
                                <p className="text-center">Loading...</p>
                            ) 
                            : 
                            (
                                <>
                                    <div className="container mx-auto px-0 py-0">
                                        
                                        {/* <BlogPostsPreview posts={result.posts} />
                                        <BlogPostsPagination pagination={result.pagination} /> */}

                                    </div>
                                </>
                            )
                }

            </main>



            {/* <Footer><Footer/> */}
                  
        </>
    );
};



const Home = () => {

    return (
        <Suspense fallback={<p className="text-center">Loading page...</p>}>
            <SearchParamsHandler />
        </Suspense>
    );

};

export default Home;