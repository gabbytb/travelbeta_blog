"use client";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import logo from "../assets/logo.png";






const SearchParamsHandler = () => {

    const searchParams = useSearchParams();
    const currentPage = searchParams.get("page") ? parseInt(searchParams.get("page")) : 1;

    return <HomeContent page={currentPage} />;
};



const HomeContent = ({ currentPage }) => {
    

    const [loading, setLoading] = useState(true);
    // console.log("IS LOADING: ", loading);





    const [result, setResult] = useState({ posts: [], pagination: {} });
    console.log("HOMEPAGE - BLOG ARTICLES: ", result);              
    
    const totalBlogPosts = result?.pagination?.postsRecord;
    console.log("TOTAL BLOG POSTS: ", totalBlogPosts);

    const totalPages = result?.pagination?.lastPage;
    console.log("TOTAL BLOG PAGES: ", totalPages);
    
    currentPage = result?.pagination?.currentPage;
    console.log("CURRENT PAGE: ", currentPage);
    
    const [pageNext, setPageNext] = useState(currentPage);

    const pageLimit = result?.pagination?.pageLimit; // Number of items per page   
    console.log("CURRENT PAGE: ", pageLimit);




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
            const page = 1 ? 1 : currentPage;
            axios.get(`/api/v1/admin/posts/manage?status=${custom_status}&limit=${pageLimit}&page=${page}`)   // Fetch from Express API
            .then((response) => {
                const { success, data, message } = response.data;
                setResult(data);
            })
            .catch((err) => console.error("Error fetching data:", err))
            .finally(() => setLoading(false));

        };
        fetchPosts();

    }, [currentPage]);
    ////////////////////////////////////////////  
    ////////////////////////////////////////////

    
    
    // ******************************** //
    // ***    HANDLE PAGE CHANGE    *** //
    // ******************************** //
    const handlePageChange = (currentPage) => {
        setPageNext(currentPage);
    };
    // ****************************************************************************
    // ****************************************************************************  



    var imageHeight = 0;
    return (
        <>
            <header className="shadow-md">
                <nav className="flex w-full h-20 mx-auto">                    
                    <div className="w-full flex justify-between items-center mx-20">

                        <div className="flex w-40 h-12">
                            <Image src={logo} alt="" className="w-full" />
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

                    </div>
                </nav>
            </header>



            <main>
           
                {
                    loading ? 
                            (
                                <div className="h-screen w-full flex justify-center items-center">
                                    <p className="text-center">Loading...</p>
                                </div>
                            ) 
                            : 
                            (
                                <>
                                    <section>
                                        <div className="container mx-auto flex mt-20">
                                            <div className="flex flex-col">
                                                {/* ARTICLES LISTING */}
                                                {
                                                    result?.posts?.length !== 0 ?
                                                        <>
                                                            <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 mx-auto gap-12 w-full">
                                                                {
                                                                    result?.posts?.map((post, index) => {
                                                                        return (
                                                                            <div key={index} className="shadow-md rounded-lg">
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
                                                                                        <p className="text-lg/relaxed font-medium">{post.excerpt}</p>                                                                   
                                                                                        <Link 
                                                                                            className="w-32 flex justify-center text-sm text-white font-black py-3 rounded-lg"
                                                                                            href={`/category/${post.category}`}>
                                                                                            # ${post.category}
                                                                                        </Link>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        );
                                                                    })                                                                                                                   
                                                                }
                                                            </div>
                                                        </>
                                                        :     
                                                        <>
                                                            <div className="h-screen w-full flex justify-center items-center">
                                                                <p className="text-center">No article found</p>
                                                            </div>
                                                        </>                                           
                                                }
                                                {/* ARTICLES LISTING */}
                                            


                                                {/* ARTICLES PAGINATION */}
                                                {
                                                    result?.posts?.length !== 0 ?
                                                        <>
                                                            <div className="flex justify-between items-center py-2 mt-16 mr-6">
                                                                <nav className="relative z-0 inline-flex gap-3">
                                                                    {/* Previous page button */}
                                                                    <button
                                                                        onClick={() => handlePageChange(currentPage - 1)}
                                                                        className={`relative inline-flex items-center px-2 py-2 rounded-full border border-gray-300 bg-white text-xl font-medium text-black tracking-extratight hover:bg-gray-50 w-20 justify-center h-20 ${currentPage === 1 ? 'opacity-50 cursor-not-allowed hidden' : ''}`}
                                                                        disabled={currentPage === 1}
                                                                    >prev
                                                                    </button>


                                                                    {/* Page numbers */}
                                                                    {Array.from({ length: totalPages }, (_, index) => (
                                                                        <button
                                                                        key={index}
                                                                        onClick={() => handlePageChange(index + 1)}
                                                                        className={`-ml-px relative inline-flex items-center px-4 py-2 rounded-full border border-gray-300 text-xl font-bold outline-none focus:outline-none hover:bg-gray-50 w-20 justify-center h-20 ${currentPage === index + 1 ? 'bg-gray-100 text-blue-800' : ''}`}>
                                                                        {index + 1}
                                                                        </button>
                                                                    ))}


                                                                    {/* Next page button */}
                                                                    <button
                                                                        onClick={() => handlePageChange(currentPage + 1)}
                                                                        className={`-ml-px relative inline-flex items-center px-2 py-2 rounded-full rounded-r-md border border-gray-300 bg-white text-xl font-medium text-black tracking-extratight hover:bg-gray-50 w-20 justify-center h-20 next-pg ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
                                                                        // disabled={currentPage === totalPages}
                                                                    >next
                                                                    </button>
                                                                </nav>
                                                            </div>
                                                        </>
                                                        :
                                                        <>
                                                            <div className="flex justify-between items-center py-2 mt-16 mr-6">                              
                                                                <nav className="hidden"></nav>
                                                            </div>
                                                        </>
                                                }
                                                {/* ARTICLES PAGINATION */}
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