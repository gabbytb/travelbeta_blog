"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import axiosRetry from "axios-retry";
import logo from "../assets/logo.png";
import Preloader from "@/components/Preloader";







// ********************************** //
// *** CONVERT DATE STRING PARAMS *** // 
// ********************************** //
const convertDate = (dateString) => {
    
    const date = new Date(dateString);

    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        // hour: '2-digit',
        // minute: '2-digit',
        hour12: true
    };

    return date.toLocaleString('en-GB', options);

};
// ********************************* //
// ********************************* //    






const Home = () => {


    // console.clear();
    

    
    const [loading, setLoading] = useState(true);
    // console.log("IS LOADING: ", loading);



    const [result, setResult] = useState({ postData: [], pagination: {} });   
    //////////////////////////////////////////////////////////////////////////////////
    // PARSE TO CONSOLE
    //////////////////////////////////////////////////////////////////////////////////
    const posts = result?.postData;
    const currentPage = result?.pagination?.currentPage; // Current Page
    const totalPages = result?.pagination?.lastPage; // Total Pages / Last Page
    const pageLimit = result?.pagination?.pageLimit; // Number of Articles per page
    const totalBlogPosts = result?.pagination?.postsRecord; // Total Articles
    // console.log("BLOG ARTICLES: ", posts, "\n",
    //             "BLOG PAGINATION\n",
    //             "Current Page: ", currentPage, "\n",
    //             "Last Page: ", totalPages, "\n",
    //             "Page Limit: ", pageLimit, "\n",
    //             "Total Articles: ", totalBlogPosts);
    //////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////

    

    ////////////////////////////////////////////
    // SET PAGE TITLE
    ////////////////////////////////////////////
    useEffect(() => {
        document.title = "Travelbeta Blog: Home";
    }, []);
    ////////////////////////////////////////////
    ////////////////////////////////////////////



    const [changePage, setChangePage] = useState(currentPage);
    ////////////////////////////////////////////
    // GET ALL POST ARTICLES
    ////////////////////////////////////////////
    useEffect(() => {
        
        setLoading(true);
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        
        const fetchPosts = async () => {

            setLoading(true);
            
            const custom_status = "";
            const page = changePage ? changePage : 1;
            const limit = pageLimit ? pageLimit : 10;
            await axios.get(`/api/v1/admin/posts/manage?status=${custom_status}&limit=${limit}&page=${page}`)
            .then((response) => {
                const { success, data, message } = response.data;
                setResult(data);
            })
            .catch((err) => console.error("Error fetching data:", err))
            .finally(() => setLoading(false));

            // Enable retries with axios
            await axiosRetry(axios, { retries: 3, retryDelay: axiosRetry.exponentialDelay });
            
        };
        setTimeout(fetchPosts, 300);



    }, [changePage]);
    ////////////////////////////////////////////  
    ////////////////////////////////////////////

    
    
    // ******************************** //
    // ***    HANDLE PAGE CHANGE    *** //
    // ******************************** //
    const handlePageChange = (page) => {
        setChangePage(page);
    };
    // ****************************************************************************
    // ****************************************************************************  



    
    return (
        <>
            <header className="shadow-md h-24 flex items-center">
                <nav className="flex w-full h-15 mx-auto">                    
                    <div className="w-full flex justify-between items-center mx-20">

                        <div className="flex w-48 h-14">
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
                                <>
                                    <section className="w-full flex justify-center items-center">
                                        <div className="container mx-auto flex mt-28 mb-20">
                                            <div className="flex flex-col w-full">

                                                <div className="pb-18.5 flex flex-col justify-center items-center gap-40">
                                                    <h1 className="text-3xl font-extrabold tracking-tight">RECENT POSTS</h1>
                                                    
                                                    <div className="flex flex-col gap-12">
                                                        <Preloader />
                                                        <p>Loading.....</p>
                                                    </div>
                                                </div>                                            
                                            
                                            </div>
                                        </div>
                                    </section>
                                </>                                
                            ) 
                            : 
                            (
                                <>
                                    <section>
                                        <div className="container mx-auto flex mt-28 mb-20">
                                            <div className="flex flex-col w-full">

                                                <div className="pb-18.5 flex justify-center">
                                                    <h1 className="text-3xl font-extrabold tracking-tight">RECENT POSTS</h1>
                                                </div>


                                                {/* ARTICLES LISTING */}
                                                {
                                                    result?.postData?.length !== 0 ?
                                                        <>
                                                            <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 mx-auto gap-x-12 gap-y-24 w-full">
                                                                {
                                                                    result?.postData?.map((post, index) => {
                                                                        return (
                                                                            <div key={index} className="shadow-md rounded-lg">
                                                                                <Link href={`/${post.url}`}>
                                                                                    <figure className="w-full h-72">                                                                                    
                                                                                        <Image 
                                                                                            src="https://res.cloudinary.com/travelbetablog/image/upload/v1739138163/shutterstock_2377591127_sqqdq7.jpg"
                                                                                            alt={post.excerpt}
                                                                                            width={350} 
                                                                                            height={300}
                                                                                            className="w-full h-full"
                                                                                        />
                                                                                    </figure>
                                                                                </Link>


                                                                                <div className="p-5 flex flex-col gap-5">
                                                                                    <Link href={`/${post.url}`}>
                                                                                        <h2 className="text-10xl/very-loose font-black text-slate-700 mb-2">{post.title}</h2>

                                                                                        <small className="text-43xl font-semibold">{convertDate(post.released)}</small>
                                                                                    </Link>



                                                                                    <div className="flex flex-col gap-6 mb-3">
                                                                                        <p className="text-lg/relaxed font-medium">{post.excerpt}</p>                                                                   
                                                                                        
                                                                                        <div className="flex justify-between">
                                                                                            <Link className="w-52 flex justify-start text-11xl text-black font-medium py-3 px-4 shadow-lg rounded-lg gap-1"
                                                                                                href={`/category/${post.categories}`}>
                                                                                                <p className="text-red-500 indent-1">#</p>{post.categories}                                                                                     
                                                                                            </Link>
                                                                                            {
                                                                                                post.author.map((item, index) => {
                                                                                                    if (!item.img) {
                                                                                                        return (
                                                                                                            <figure key={index} className="mr-1">
                                                                                                                <Image src="/assets/img/thumbnail_one.png"
                                                                                                                    alt="author pic"
                                                                                                                    width={40}
                                                                                                                    height={40}
                                                                                                                    className="rounded-full"
                                                                                                                />
                                                                                                            </figure> 
                                                                                                        );
                                                                                                    } else {
                                                                                                        return (
                                                                                                            <Link key={index} href={`/author/${item.email}`} className="mr-1">
                                                                                                                <Image src={item.img}
                                                                                                                    alt="author pic"
                                                                                                                    width={40}
                                                                                                                    height={40}
                                                                                                                    className="rounded-full w-12 h-12"
                                                                                                                />
                                                                                                            </Link>                                                                                    
                                                                                                        );
                                                                                                    };
                                                                                                })
                                                                                            }
                                                                                        </div>
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
                                                    result?.postData?.length !== 0 ?
                                                        <>
                                                            <div className="flex justify-between items-center py-2 mt-20 mr-6">
                                                                <nav className="relative z-0 inline-flex gap-3">
                                                                    {/* Previous page button */}
                                                                    <button
                                                                        onClick={() => handlePageChange(currentPage - 1)}
                                                                        className={`relative inline-flex items-center px-2 py-2 rounded-full border border-gray-300 bg-white text-xl font-medium text-black tracking-extratight hover:bg-gray-50 w-16 justify-center h-16 ${currentPage === 1 ? 'opacity-50 cursor-not-allowed hidden' : ''}`}
                                                                        disabled={currentPage === 1}
                                                                    >prev
                                                                    </button>


                                                                    {/* Page numbers */}
                                                                    {Array.from({ length: totalPages }, (_, index) => (
                                                                        <button
                                                                        key={index}
                                                                        onClick={() => handlePageChange(index + 1)}
                                                                        className={`-ml-px relative inline-flex items-center px-4 py-2 rounded-full border border-gray-300 text-xl font-bold outline-none focus:outline-none hover:bg-gray-50 w-16 justify-center h-16 ${currentPage === index + 1 ? 'bg-gray-100 text-blue-800' : ''}`}>
                                                                        {index + 1}
                                                                        </button>
                                                                    ))}


                                                                    {/* Next page button */}
                                                                    <button
                                                                        onClick={() => handlePageChange(currentPage + 1)}
                                                                        className={`-ml-px relative inline-flex items-center px-2 py-2 rounded-full border border-gray-300 bg-white text-xl font-medium text-black tracking-extratight hover:bg-gray-50 w-16 justify-center h-16 next-pg ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
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


export default Home;