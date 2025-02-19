"use client";
import { useState, useEffect,} from "react";
import Link from "next/link";
import { useRouter, redirect } from "next/navigation";
import { googleLogout } from "@react-oauth/google";
import PropTypes from "prop-types";
import axios from "axios";
import axiosRetry from "axios-retry";
import dynamic from "next/dynamic";
import Image from "next/image";
const Sidebar = dynamic(() => import("@/components/Sidebar/Sidebar"), {
    ssr: false,
});
const UserDropdown = dynamic(() => import("@/components/Dropdowns/UserDropdown"), {
    ssr: false,
});
// const HeaderStats = dynamic(() => import("@/components/Headers/HeaderStats"), {
//     ssr: false,
// });
const TableDropdown = dynamic(() => import("@/components/Dropdowns/TableDropdown"), {
    ssr: false,
});
// const DashboardTable = dynamic(() => import("@/views/admin/tables/DashboardTable"), {
//     ssr: false,
// });







const convertDate = (dateString) => {
    
    const date = new Date(dateString);
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',        
        hour12: true
    };

    return date.toLocaleString('en-GB', options);
};



const Dashboard = ({ color, isLoggedIn }) => {
    

    const [isLoading, setIsLoading] = useState(true);
    const [activeDisplay, setActiveDisplay] = useState("blogPosts");
    const leftArrow = "<", 
          rightArrow = ">";

          



    // *************************** //
    // *** SET PAGE TITLE(SEO) *** //
    // *************************** //
    useEffect(() => {
        window.scrollBy({ top: 0, left: 0, behaviour: "smooth" });
        const pageTitle = "Admin Dashboard", 
              siteTitle = "Travelbeta Blog";
        document.title = `${pageTitle} | ${siteTitle}`;
    }, []);
    // *************************** //
    // *** SET PAGE TITLE(SEO) *** //
    // *************************** //
 



    const { push } = useRouter();
    // ***************************************************************************
    // CURRENT ACTIVE USER:-
    // ***************************************************************************
    isLoggedIn = JSON.parse(localStorage.getItem("user"));    
    // ***************************************************************************
    // FUNCTION TO LOG-OUT CURRENT ACTIVE USER
    // ***************************************************************************
    function logOut() {
        // Clear User Details from Local Storage
        localStorage.removeItem("user");
        // log out function to log the user out of google and set the profile array to null
        googleLogout();
        // redirect to Login Page
        redirect("/user/signin");
    };
    // ***************************************************************************
    // DESTRUCTURE CURRENT ACTIVE USER PROPS:-
    // ***************************************************************************
    const userId = isLoggedIn?.id ? isLoggedIn?.id : logOut();
    // console.log("Logged-In User ID: ", userId);
    const firstname = isLoggedIn?.firstname ? isLoggedIn?.firstname : logOut(); 
    // console.log("Logged-In User First Name: ", firstname);
    const lastname = isLoggedIn?.lastname ? isLoggedIn?.lastname : logOut(); 
    // console.log("Logged-In User Last Name: ", lastname);
    const username = isLoggedIn?.username ? isLoggedIn?.username : logOut(); 
    // console.log("Logged-In Username: ", username);
    const userRoles = isLoggedIn?.roles ? isLoggedIn?.roles : logOut();
    // console.log("Logged-In User Roles: ", userRoles);    
    const displayImg = isLoggedIn?.userdp ? isLoggedIn?.userdp : '';
    // console.log("Logged-In User DP: ", displayImg); 
    const userBio = isLoggedIn?.bio ? isLoggedIn?.bio : '';
    // console.log("Logged-In User BIO: ", userBio);    
    let expiresAt = isLoggedIn?.tokenexpires > 0 ? isLoggedIn?.tokenexpires : logOut();
    // console.log("Logged-In User Session Exp: ", expiresAt);
    // ***************************************************************************
    // ***************************************************************************




    
    const [result, setResult] = useState({ postData: [], pagination: {} });   
    //////////////////////////////////////////////////////////////////////////////////
    // PARSE TO CONSOLE
    //////////////////////////////////////////////////////////////////////////////////
    const posts = result?.postData;
    const currentPage = result?.pagination?.currentPage; // Current Page
    const totalPages = result?.pagination?.lastPage; // Total Pages / Last Page
    const pageLimit = result?.pagination?.pageLimit; // Number of Articles per page
    const totalBlogPosts = result?.pagination?.postsRecord; // Total Articles

    const [pageChange, setPageChange] = useState(currentPage);
    // console.log("BLOG ARTICLES: ", posts, "\n",
    //             "BLOG PAGINATION\n",
    //             "Current Page: ", currentPage, "\n",
    //             "Next Page: ", pageChange, "\n",
    //             "Last Page: ", totalPages, "\n",
    //             "Page Limit: ", pageLimit, "\n",
    //             "Total Articles: ", totalBlogPosts);
    //////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////





    // ****************************************************************************
    // Works for Search
    // ****************************************************************************
    const [query, setQuery] = useState('');
    const search_parameters = Object.keys(Object.assign({}, ...posts));

    function search(data) {
        return data?.filter((item) =>
            search_parameters.some((parameter) =>
              item[parameter]?.toString()?.toLowerCase()?.includes(query)
        ));
    };
    // ****************************************************************************
    // ****************************************************************************





    useEffect(() => {                                 
        if (activeDisplay === "blogPosts") {                                
            var timer = setTimeout(fetchData, 300);   // Delay execution of findAllStaffs by 1800ms
            return () => {
                clearTimeout(timer);                  // Clean up timer if component unmounts or token changes
            };
        };
    }, [activeDisplay, pageChange]); // Fetch data when currentPage changes
    
    const fetchData = async () =>  {
        
        setIsLoading(true);

        const custom_status = "";
        const page = pageChange ? pageChange : 1;
        const limit = pageLimit ? pageLimit : 10;
        await axios.get(`/api/v1/admin/posts/manage?status=${custom_status}&limit=${limit}&page=${page}`)
        .then((response) => {
            const { success, data, message } = response.data;
            setResult(data);
        })
        .catch((err) => console.error("Error fetching data:", err))
        .finally(() => setIsLoading(false));

        // Enable retries with axios
        await axiosRetry(axios, { retries: 3, retryDelay: axiosRetry.exponentialDelay });
        
    };

    async function handlePageChange(page) {
        setPageChange(page);
    };






    return (
        <>
            {/***** LEFT-PANEL *****/}
            <Sidebar userId={userId} 
                     username={username}  
                     userRoles={userRoles} 
                     displayImg={displayImg} 
                     userBio={userBio} 
                     expiresAt={expiresAt}
                     logOut={logOut} />
            {/***** LEFT-PANEL *****/}



            {/***** RIGHT-PANEL *****/}
            {
                isLoading ? 
                    <>
                        <div className="bg-blueGray-100">
                            <div className="ml-0 sm:ml-97 relative">
                            
                                {/* Admin Navbar */}
                                <nav className="absolute top-0 left-0 w-full z-1 bg-transparent md:flex-row md:flex-nowrap md:justify-start flex items-center p-4">
                                    <div className="w-full mx-auto items-center flex justify-between md:flex-nowrap flex-nowrap md:px-10 px-4">                            
                                        
                                        {/* Brand */}
                                        <Link className="text-white text-sm uppercase flex xs:hidden sm:hidden lg:flex font-semibold pr-8"
                                            href={"/admin/dashboard"}>Dashboard
                                        </Link>
                                        {/* Brand */}


                                        {/* Form */}
                                        <form className="hidden xs:hidden sm:flex flex-row flex-wrap items-center lg:ml-auto mr-12 lg:mr-28 w-98 h-178">
                                            <div className="relative w-full flex-wrap items-stretch">                      
                                                <span className="z-10 h-full leading-snug font-normal text-center text-blueGray-300 absolute bg-transparent rounded text-2xl flex items-center justify-center w-12 pl-3 py-3">
                                                    <i className="fas fa-search"></i>
                                                </span>
                                                    
                                                <input
                                                    type="search"
                                                    name="q"
                                                    id="search-form"
                                                    className="search-input border-0 px-3 py-3 indent-8 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring w-full pl-10"       
                                                    onChange={(e) => setQuery(e.target.value)}
                                                    placeholder="Search here "
                                                />

                                                <button type="submit" onSubmit={fetchData}></button>
                                            </div>                                             
                                        </form>
                                        {/* Form */}


                                        {/* User */}
                                        <ul className="hidden xs:hidden sm:flex flex-col md:flex-row list-none items-center">
                                            <UserDropdown userId={userId} username={username} displayImg={displayImg} userRoles={userRoles} logOut={logOut} />
                                        </ul>
                                        {/* User */}

                                    </div>
                                </nav>
                                {/* Admin Navbar */}




                                {/* Header */}
                                <div className="relative bg-blue-900 pb-32 pt-12 sm:pt-20">
                            
                                    {/* Welcome Logged-In User */}
                                    <div className="px-4 md:px-10 pb-6 mx-auto w-full">  
                                        <p className="w-full px-4 text-xl text-white">     
                                            Welcome <span className="font-bold text-white">{lastname}</span>
                                        </p>
                                    </div>                
                                    {/* <HeaderStats /> */}

                                </div>
                                {/* Header */}


                                
                                {/* Posts Table */}
                                <div className="px-4 md:px-10 mx-auto w-full -m-24">      
                    
                                    <div className="flex flex-wrap mt-4">
                                        <div className="w-full mb-12 px-4">
                                            <div
                                                className={
                                                "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded " +
                                                (color === "dark" ? "bg-white" : "bg-lightBlue-900 text-white")
                                                }>
                                                    
                    
                                                {/* Blog Navigation */}
                                                <div id="postsLinkID" className="flex flex-row flex-wrap gap-3 mt-8 mb-10 px-7">
                                                    <button className="blogPosts activePostView pt-3 pb-2 px-10 rounded-lg border mr-2 text-xl flex flex-row gap-1 bg-white" onClick={() => setActiveDisplay("blogPosts")}>All <span className="off_white"> ({ totalBlogPosts })</span> </button>
                                                    {/* <Link className="publishedPosts pt-3 pb-2 px-10 rounded-lg border mr-2 text-xl flex flex-row gap-1 bg-white" onClick={() => setActiveDisplay("publishedPosts")}>Published <span className="off_white"> ({ totalPublishedPosts })</span></Link>
                                                    <Link className="draftPosts pt-3 pb-2 px-10 rounded-lg border mr-2 text-xl flex flex-row gap-1 bg-white" onClick={() => setActiveDisplay("draftPosts")}>Drafts <span className="off_white"> ({ totalDraftPosts })</span></Link> */}
                                                    {/* <Link className="scheduledPosts pt-3 pb-2 px-10 rounded-lg border text-xl flex flex-row gap-1 bg-white" onClick={() => setActiveDisplay("scheduledPosts")}>Scheduled  <span className="off_white"> ({ totalBlogPosts })</span></Link> */}
                                                </div>
                                                {/* Users Navigation */}
                    
                                                
                                                {/* Page Title */}
                                                <div className="rounded-t mb-0 px-4 py-3 border-0">
                                                    <div className="flex flex-wrap items-center">
                                                        <div className="relative w-full px-4 max-w-full flex justify-between items-center flex-grow flex-1">
                                                            <h3
                                                                className={
                                                                    "font-semibold text-lg " +
                                                                    (color === "dark" ? "text-blueGray-700" : "text-white")
                                                                }
                                                            >
                                                                All Posts
                                                            </h3>

                                                            <Link className="relative -top-2" href="/admin/blog/manage/create" alt="create new article">
                                                                <button className="bg-blue-500 text-white active:bg-lightBlue-500 font-bold uppercase text-lg tracking-tightener px-7 py-3 rounded-lg shadow hover:bg-blue-600 hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-300">add new</button>
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* Page Title */}
                    
                    
                                                <div className={`w-full overflow-x-auto ${activeDisplay === "blogPosts" ? "block" : "hidden"}`}>
                                                    {/* Blog Posts table */}
                                                    <table className="items-center w-full bg-transparent border-collapse">
                                                        <thead>
                                                            <tr>
                                                                <th
                                                                    className={
                                                                        "px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                                                                        (color === "light"
                                                                        ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                                                        : "bg-blueGray-50 text-gray-500 border-lightBlue-300")
                                                                    }
                                                                >
                                                                    S/N
                                                                </th>
                                                                <th
                                                                    className={
                                                                        "px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                                                                        (color === "light"
                                                                        ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                                                        : "bg-blueGray-50 text-gray-500 border-lightBlue-300")
                                                                    }
                                                                >
                                                                    Title
                                                                </th>
                                                                <th
                                                                    className={
                                                                        "px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                                                                        (color === "light"
                                                                        ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                                                        : "bg-blueGray-50 text-gray-500 border-lightBlue-300")
                                                                    }
                                                                >
                                                                    Excerpt
                                                                </th>
                                                                <th
                                                                    className={
                                                                        "px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                                                                        (color === "light"
                                                                        ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                                                        : "bg-blueGray-50 text-gray-500 border-lightBlue-300")
                                                                    }
                                                                >
                                                                    Status
                                                                </th> 
                                                                <th
                                                                    className={
                                                                        "px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                                                                        (color === "light"
                                                                        ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                                                        : "bg-blueGray-50 text-gray-500 border-lightBlue-300")
                                                                    }
                                                                >
                                                                Action
                                                                </th>              
                                                                <th
                                                                    className={
                                                                        "px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                                                                        (color === "light"
                                                                        ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                                                        : "bg-blueGray-50 text-gray-500 border-lightBlue-300")
                                                                    }
                                                                ></th>
                                                            </tr>
                                                        </thead>
                                                        <tbody className='w-16 h-16'>
                                                            <tr>
                                                                <td></td>
                                                                <td></td>
                                                                <td className="max-w-40 h-94 flex flex-col justify-center items-center gap-8">
                                                                    <Image src="/assets/img/spinning.gif" alt="Spinning" width={100} height={100} className="mx-auto rounded-2xl" />
                                                                    <p className="text-xl text-white tracking-extratight font-semibold">Loading...</p>                                  
                                                                </td>
                                                                <td></td>
                                                            </tr>                
                                                        </tbody>
                                                    </table>
                                                </div> 
                                            </div>    
                                        </div>
                                    </div>

                                </div>

                            </div>
                        </div>
                    </> 
                    : 
                    <>
                        <div className="bg-blueGray-100">
                            <div className="ml-0 sm:ml-97 relative">
                            
                                {/* Admin Navbar */}
                                <nav className="absolute top-0 left-0 w-full z-1 bg-transparent md:flex-row md:flex-nowrap md:justify-start flex items-center p-4">
                                    <div className="w-full mx-auto items-center flex justify-between md:flex-nowrap flex-nowrap md:px-10 px-4">                            
                                        
                                        {/* Brand */}
                                        <Link className="text-white text-sm uppercase flex xs:hidden sm:hidden lg:flex font-semibold pr-8"
                                            href={"/admin/dashboard"}>Dashboard
                                        </Link>
                                        {/* Brand */}


                                        {/* Form */}
                                        <form className="hidden xs:hidden sm:flex flex-row flex-wrap items-center lg:ml-auto mr-12 lg:mr-28 w-98 h-178">
                                            <div className="relative w-full flex-wrap items-stretch">                      
                                                <span className="z-10 h-full leading-snug font-normal text-center text-blueGray-300 absolute bg-transparent rounded text-2xl flex items-center justify-center w-12 pl-3 py-3">
                                                    <i className="fas fa-search"></i>
                                                </span>
                                                    
                                                <input
                                                    type="search"
                                                    name="q"
                                                    id="search-form"
                                                    className="search-input border-0 px-3 py-3 indent-8 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring w-full pl-10"       
                                                    onChange={(e) => setQuery(e.target.value)}
                                                    placeholder="Search here "
                                                />

                                                <button type="submit" onSubmit={fetchData}></button>
                                            </div>                                             
                                        </form>
                                        {/* Form */}


                                        {/* User */}
                                        <ul className="hidden xs:hidden sm:flex flex-col md:flex-row list-none items-center">
                                            <UserDropdown userId={userId} username={username} displayImg={displayImg} userRoles={userRoles} logOut={logOut} />
                                        </ul>
                                        {/* User */}

                                    </div>
                                </nav>
                                {/* Admin Navbar */}



                                {/* Header */}
                                <div className="relative bg-blue-900 pb-32 pt-12 sm:pt-20">
                            
                                    {/* Welcome Logged-In User */}
                                    <div className="px-4 md:px-10 pb-6 mx-auto w-full">  
                                        <p className="w-full px-4 text-xl text-white">     
                                            Welcome <span className="font-bold text-white">{lastname}</span>
                                        </p>
                                    </div>                
                                    {/* <HeaderStats /> */}

                                </div>
                                {/* Header */}


                                
                                {/* Posts Table */}
                                <div className="px-4 md:px-10 mx-auto w-full -m-24">               
                                    <div className="flex flex-wrap mt-4">
                                        <div className="w-full mb-12 px-4">         
                                            <div
                                                className={
                                                    "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded " +
                                                    (color === "dark" ? "bg-white" : "bg-lightBlue-900 text-white")
                                                }>



                                                {/* Posts Navigation */}
                                                <div id="postsLinkID" className="flex flex-row flex-wrap gap-3 mt-8 mb-10 px-7">
                                                    <button className="blogPosts activePostView pt-3 pb-2 px-10 rounded-lg border mr-2 text-xl flex flex-row gap-1 bg-white" onClick={() => setActiveDisplay("blogPosts")}>All <span className="off_white"> ({ totalBlogPosts })</span></button>
                                                    {/* <button className="publishedPosts pt-3 pb-2 px-10 rounded-lg border mr-2 text-xl flex flex-row gap-1 bg-white" onClick={() => setActiveDisplay("publishedPosts")}>Published  <span className="off_white"> ({ totalPublishedPosts })</span></button>
                                                    <button className="draftPosts pt-3 pb-2 px-10 rounded-lg border mr-2 text-xl flex flex-row gap-1 bg-white" onClick={() => setActiveDisplay("draftPosts")}>Drafts  <span className="off_white"> ({ totalDraftPosts })</span></button> */}
                                                    {/* <button className="scheduledPosts pt-3 pb-2 px-10 rounded-lg border text-xl flex flex-row gap-1 bg-white" onClick={() => setActiveDisplay("scheduledPosts")}>Scheduled  <span className="off_white"> ({ totalBlogPosts })</span></button> */}
                                                </div> 
                                                {/* Posts Navigation */}


                                                
                                                {/* Page Title */}
                                                <div className="rounded-t mb-0 px-4 py-3 border-0">
                                                    <div className="flex flex-wrap items-center">
                                                        <div className="relative w-full px-4 max-w-full flex justify-between items-center flex-grow flex-1">
                                                            <h3
                                                                className={
                                                                    "font-semibold text-lg " +
                                                                    (color === "dark" ? "text-blueGray-700" : "text-white")
                                                                }
                                                            >
                                                                All Posts
                                                            </h3>

                                                            <Link className="relative -top-2" href="/admin/blog/manage/create" alt="create new article">
                                                                <button className="bg-blue-500 text-white active:bg-lightBlue-500 font-bold uppercase text-lg tracking-tightener px-7 py-3 rounded-lg shadow hover:bg-blue-600 hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-300">add new</button>
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* Page Title */}



                                                {/* Views */}
                                                <div className={`w-full overflow-x-auto ${activeDisplay === "blogPosts" ? "block" : "hidden"}`}>
                                                    {/* Projects table */}
                                                    <table className="items-center w-full bg-transparent border-collapse">
                                                        <thead>
                                                                <tr>
                                                                    <th
                                                                        className={
                                                                            "px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                                                                            (color === "light"
                                                                            ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                                                            : "bg-blueGray-50 text-gray-500 border-lightBlue-300")
                                                                        }
                                                                    >
                                                                        S/N
                                                                    </th>
                                                                    <th
                                                                        className={
                                                                            "px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                                                                            (color === "light"
                                                                            ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                                                            : "bg-blueGray-50 text-gray-500 border-lightBlue-300")
                                                                        }
                                                                    >
                                                                        Featured Image
                                                                    </th>
                                                                    <th
                                                                        className={
                                                                            "px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center " +
                                                                            (color === "light"
                                                                            ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                                                            : "bg-blueGray-50 text-gray-500 border-lightBlue-300")
                                                                        }
                                                                    >
                                                                        Post Title
                                                                    </th>
                                                                    <th
                                                                        className={
                                                                            "px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                                                                            (color === "light"
                                                                            ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                                                            : "bg-blueGray-50 text-gray-500 border-lightBlue-300")
                                                                        }
                                                                    >
                                                                        Date Published
                                                                    </th>
                                                                    <th
                                                                        className={
                                                                            "px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                                                                            (color === "light"
                                                                            ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                                                            : "bg-blueGray-50 text-gray-500 border-lightBlue-300")
                                                                        }
                                                                    >
                                                                        Status
                                                                    </th> 
                                                                    <th
                                                                        className={
                                                                            "px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                                                                            (color === "light"
                                                                            ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                                                            : "bg-blueGray-50 text-gray-500 border-lightBlue-300")
                                                                        }
                                                                    >
                                                                    Action
                                                                    </th>              
                                                                    <th
                                                                        className={
                                                                            "px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                                                                            (color === "light"
                                                                            ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                                                            : "bg-blueGray-50 text-gray-500 border-lightBlue-300")
                                                                        }
                                                                    ></th>
                                                                </tr>
                                                        </thead>
                                                        {search(posts)?.length !== 0 ?
                                                                <tbody>                                                    
                                                                    {search(posts)?.map((post, userIndex) => {
                                                                            if (post?.status === "draft") {
                                                                                return (                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
                                                                                    <tr key={userIndex}>
                                                                                        <td className="border-t-0 p-6 align-middle border-l-0 border-r-0 text-md whitespace-nowrap">
                                                                                            #{userIndex+1}
                                                                                        </td>
                                                                                        <td className="border-t-0 p-6 align-middle border-l-0 border-r-0 text-xl font-serif tracking-supertight whitespace-nowrap flex justify-center items-center">                                                                         
                                                                                            {   
                                                                                                post?.images?.map((item, itemIndex) => {
                                                                                                    if (item?.featured === true) {
                                                                                                        return (
                                                                                                            <div key={itemIndex} className="">
                                                                                                                <img src={item?.url} className="h-20 max-w-24 bg-white rounded-lg border" alt={item?.alt} />{" "}
                                                                                                            </div>
                                                                                                        );
                                                                                                    }
                                                                                                })
                                                                                            }    
                                                                            
                                                                                        </td>
                                                                                        <td className="border-t-0 p-6 align-middle border-l-0 border-r-0 text-xl font-serif font-bold whitespace-nowrap capitalize">   
                                                                                            <span
                                                                                                className={
                                                                                                    "ml-3 font-bold " +
                                                                                                    + (color === "light" ? "text-blueGray-600" : "text-white")
                                                                                                }>
                                                                                                {post?.title?.substring(0,50)+"..."}
                                                                                            </span>
                                                                                        </td>
                                                                                        <td className="border-t-0 p-6 align-middle border-l-0 border-r-0 text-xl font-serif tracking-supertight font-bold whitespace-nowrap">
                                                                                            {convertDate(post?.createdAt)}                        
                                                                                        </td>
                                                                                        <td className="border-t-0 p-6 align-middle border-l-0 border-r-0 text-xl font-serif font-bold whitespace-nowrap capitalize">
                                                                                            <i className="fas fa-circle text-orange-500 mr-2"></i>{post?.status}
                                                                                        </td>  
                                                                                        <td className="border-t-0 p-6 align-middle border-l-0 border-r-0 text-lg font-semibold whitespace-nowrap capitalize">
                                                                                            <Link href={`/admin/blog/manage/${post?.id}`}>View details</Link>
                                                                                        </td>                  
                                                                                        <td className="border-t-0 p-6 align-middle border-l-0 border-r-0 text-md whitespace-nowrap text-right">
                                                                                            <TableDropdown />
                                                                                        </td>
                                                                                    </tr>               
                                                                                );
                                                                            } else if (post?.status === "scheduled") {
                                                                                return (                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
                                                                                    <tr key={userIndex}>
                                                                                        <td className="border-t-0 p-6 align-middle border-l-0 border-r-0 text-md whitespace-nowrap">
                                                                                            #{userIndex+1}
                                                                                        </td>
                                                                                        <td className="border-t-0 p-6 align-middle border-l-0 border-r-0 text-xl font-serif tracking-supertight whitespace-nowrap flex justify-center items-center">                                                                         
                                                                                            {   
                                                                                                post?.images?.map((item, itemIndex) => {
                                                                                                    if (item?.featured === true) {
                                                                                                        return (
                                                                                                            <div key={itemIndex} className="">
                                                                                                                <img src={item?.url} className="h-20 max-w-24 bg-white rounded-lg border" alt={item?.alt} />{" "}
                                                                                                            </div>
                                                                                                        );
                                                                                                    }
                                                                                                })
                                                                                            }    
                                                                            
                                                                                        </td>
                                                                                        <td className="border-t-0 p-6 align-middle border-l-0 border-r-0 text-xl font-serif font-bold whitespace-nowrap capitalize">   
                                                                                            <span
                                                                                                className={
                                                                                                    "ml-3 font-bold " +
                                                                                                    + (color === "light" ? "text-blueGray-600" : "text-white")
                                                                                                }>
                                                                                                {post?.title?.substring(0,50)+"..."}
                                                                                            </span>
                                                                                        </td>
                                                                                        <td className="border-t-0 p-6 align-middle border-l-0 border-r-0 text-xl font-serif tracking-supertight font-bold whitespace-nowrap">
                                                                                            {convertDate(post?.createdAt)}                        
                                                                                        </td>
                                                                                        <td className="border-t-0 p-6 align-middle border-l-0 border-r-0 text-xl font-serif font-bold whitespace-nowrap capitalize">
                                                                                            <i className="fas fa-circle text-yellow-500 mr-2"></i>{post?.status}
                                                                                        </td>  
                                                                                        <td className="border-t-0 p-6 align-middle border-l-0 border-r-0 text-lg font-semibold whitespace-nowrap capitalize">
                                                                                            <Link href={`/admin/blog/manage/${post?.id}`}>View details</Link>
                                                                                        </td>                  
                                                                                        <td className="border-t-0 p-6 align-middle border-l-0 border-r-0 text-md whitespace-nowrap text-right">
                                                                                            <TableDropdown />
                                                                                        </td>
                                                                                    </tr>               
                                                                                );
                                                                            } else {
                                                                                return (                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
                                                                                    <tr key={userIndex}>
                                                                                        <td className="border-t-0 p-6 align-middle border-l-0 border-r-0 text-md whitespace-nowrap">
                                                                                            #{userIndex+1}
                                                                                        </td>
                                                                                        <td className="border-t-0 p-6 align-middle border-l-0 border-r-0 text-xl font-serif tracking-supertight whitespace-nowrap flex justify-center items-center">                                                                         
                                                                                            {   
                                                                                                post?.images?.map((item, itemIndex) => {
                                                                                                    if (item?.featured === true) {
                                                                                                        return (
                                                                                                            <div key={itemIndex} className="">
                                                                                                                <img src={item?.url} className="h-20 max-w-24 bg-white rounded-lg border" alt={item?.alt} />{" "}
                                                                                                            </div>
                                                                                                        );
                                                                                                    }
                                                                                                })
                                                                                            }    
                                                                            
                                                                                        </td>
                                                                                        <td className="border-t-0 p-6 align-middle border-l-0 border-r-0 text-xl font-serif font-bold whitespace-nowrap capitalize">   
                                                                                            <span
                                                                                                className={
                                                                                                    "ml-3 font-bold " +
                                                                                                    + (color === "light" ? "text-blueGray-600" : "text-white")
                                                                                                }>
                                                                                                {post?.title?.substring(0,50)+"..."}
                                                                                            </span>
                                                                                        </td>
                                                                                        <td className="border-t-0 p-6 align-middle border-l-0 border-r-0 text-xl font-serif tracking-supertight font-bold whitespace-nowrap">
                                                                                            {convertDate(post?.createdAt)}                        
                                                                                        </td>
                                                                                        <td className="border-t-0 p-6 align-middle border-l-0 border-r-0 text-xl font-serif font-bold whitespace-nowrap capitalize">
                                                                                            <i className="fas fa-circle text-green-500 mr-2"></i>{post?.status}
                                                                                        </td>  
                                                                                        <td className="border-t-0 p-6 align-middle border-l-0 border-r-0 text-lg font-semibold whitespace-nowrap capitalize">
                                                                                            <Link href={`/admin/blog/manage/${post?.id}`}>View details</Link>
                                                                                        </td>                  
                                                                                        <td className="border-t-0 p-6 align-middle border-l-0 border-r-0 text-md whitespace-nowrap text-right">
                                                                                            <TableDropdown />
                                                                                        </td>
                                                                                    </tr>               
                                                                                );
                                                                            };
                                                                    })}
                                                                </tbody>
                                                                :
                                                                <tbody>                    
                                                                    <tr>
                                                                        <td className=""></td>
                                                                        <td className=""></td>
                                                                        <td className="text-left max-w-60 pl-6 h-60 flex justify-start items-center">No post found</td>
                                                                        <td className=""></td>
                                                                        <td className=""></td>
                                                                        <td className=""></td>
                                                                    </tr>
                                                                </tbody>
                                                        }
                                                    </table>


                                                    {/* Pagination controls */}
                                                    <div className="flex justify-between items-center py-2 mr-6">
                                                        <div className="p-4 font-medium text-3xl font-firma tracking-supertight flex flex-row gap-6 items-center">
                                                            {pageLimit} 
                                                            <div className="text-xl normal-case">Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong></div>
                                                        </div>
                                                        
                                                        <nav className="relative z-0 inline-flex shadow-sm">
                                                            {/* Previous page button */}
                                                            <button
                                                                onClick={() => handlePageChange(currentPage - 1)}
                                                                className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-xl font-black text-gray-500 hover:bg-gray-50 w-16 justify-center h-14 ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                                                                disabled={currentPage === 1}
                                                            >{leftArrow}
                                                            </button>


                                                            {/* Page numbers */}
                                                            {Array.from({ length: totalPages }, (_, index) => (
                                                                <button
                                                                key={index}
                                                                onClick={() => handlePageChange(index + 1)}
                                                                className={`-ml-px relative inline-flex items-center border border-gray-300 text-xl font-black outline-none focus:outline-none hover:bg-gray-50 w-16 justify-center h-14 ${currentPage === index + 1 ? 'bg-gray-100 text-blue-800' : ''}`}>
                                                                {index + 1}
                                                                </button>
                                                            ))}


                                                            {/* Next page button */}
                                                            <button
                                                                onClick={() => handlePageChange(currentPage + 1)}
                                                                className={`-ml-px relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-xl font-black text-gray-500 hover:bg-gray-50 w-16 justify-center h-14 ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
                                                                disabled={currentPage === totalPages}
                                                            >{rightArrow}
                                                            </button>
                                                        </nav>
                                                    </div>
                                                    {/* Pagination controls */}
                                                </div>
                                                {/* <Suspense fallback={<div>Loading...</div>}>                
                                                    <CardAllPublishedPosts color={color} activeDisplay={activeDisplay} search={search} pageLimit={pageLimit} leftArrow={leftArrow} rightArrow={rightArrow} />
                                                </Suspense>       
                                                <Suspense fallback={<div>Loading...</div>}>                            
                                                    <CardAllDraftPosts color={color} activeDisplay={activeDisplay} search={search} pageLimit={pageLimit} leftArrow={leftArrow} rightArrow={rightArrow} />
                                                </Suspense>      */}
                                                {/* <Suspense fallback={<div>Loading...</div>}>
                                                    <CardAllScheduledPosts color={color} activeDisplay={activeDisplay} search={search} pageLimit={pageLimit} />
                                                </Suspense> */}
                                                {/* Views */}

                                            </div>
                                        </div>
                                    </div>                  
                                </div>
                                {/* Posts Table */}

                            </div>
                        </div>
                    </>
            }
            {/***** RIGHT-PANEL *****/}
        </>
    );
};

export default Dashboard;



Dashboard.defaultProps = {
    color: "dark",
};

Dashboard.propTypes = {
    color: PropTypes.oneOf(["light", "dark"]),
};