"use client";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";







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
            axios.get(`/api/v1/admin/posts/manage?status=${custom_status}&limit=${pageLimit}&page=${page}`)   // Fetch from Express API
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




    var imageHeight = 0;
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
                                    <section>
                                        <div className="container mx-auto flex mt-20">
                                            <div className="flex justify-start flex-wrap w-full mx-auto gap-8">
                                                {
                                                    result?.posts?.map((post, index) => {
                                                        return (
                                                            <div key={index} className="flex flex-col w-1/3 shadow-md rounded-lg">
                                                                
                                                                <figure className="w-full h-72">
                                                                    <Link href={`/${post.uri}`}>
                                                                        <Image 
                                                                            src="https://res.cloudinary.com/travelbetablog/image/upload/v1739138163/shutterstock_2377591127_sqqdq7.jpg"
                                                                            alt={post.excerpt}
                                                                            width={350} 
                                                                            height={300}
                                                                            className="w-full h-full"
                                                                        />
                                                                    </Link>
                                                                </figure>

                                                                <div className="p-5 flex flex-col gap-3">
                                                                    <Link href={`/${post.uri}`}>
                                                                        <h2 className="text-10xl/very-loose font-black text-slate-700">{post.title}</h2>
                                                                    </Link>

                                                                    <div className="flex flex-col gap-4 mb-3">
                                                                        <p className="text-base/normal">{post.excerpt}</p>                                                                   
                                                                        <Link 
                                                                            className="bg-blue-600 w-32 flex justify-center text-base text-white font-black py-3 rounded-lg"
                                                                            href={`/${post.uri}`}>
                                                                            Read More
                                                                        </Link>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        );
                                                    })
                                                }
                                            </div>
                                            {/* <BlogPostsPreview posts={result.posts} />
                                            <BlogPostsPagination pagination={result.pagination} /> */}

                                        </div>
                                    </section>
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