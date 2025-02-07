"use client";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import axios from "axios";









const SearchParamsHandler = () => {

    const searchParams = useSearchParams();
    const page = searchParams.get("page") ? parseInt(searchParams.get("page")) : 1;

    return <HomeContent page={page} />;
};



const HomeContent = ({ page }) => {
    

    const [result, setResult] = useState({ posts: [], pagination: {} });
    // console.log("HOMEPAGE - BLOG ARTICLES: ", result);

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

            try {
                const custom_status = "";
                const pageLimit = 10;
                const response = await axios.get(`/api/v1/admin/posts/manage?status=${custom_status}&page=${page}&limit=${pageLimit}`);
                const { success, data, message} = response.data;
                setResult(data);
            } catch (error) {
                console.error("Failed to fetch posts:", error);
            } finally {
                setLoading(false);
            };

        };        
        fetchPosts();
    }, [page]);
    ////////////////////////////////////////////  
    ////////////////////////////////////////////




    return (
        <div className="container mx-auto px-5 mb-10">
          
            {/* <Header /> */}
            
            
            
            <main>
                {
                    loading ? (
                                  <p className="text-center">Loading...</p>
                              ) : (
                                      <>
                                          {/* <BlogPostsPreview posts={result.posts} />
                                          <BlogPostsPagination pagination={result.pagination} /> */}
                                      </>
                                  )
                }
            </main>


            {/* <Footer /> */}
        
        </div>
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
