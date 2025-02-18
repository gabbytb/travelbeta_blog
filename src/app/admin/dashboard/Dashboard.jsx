"use client";
import { useState, useEffect,} from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { googleLogout } from "@react-oauth/google";
import PropTypes from "prop-types";
import axios from "axios";
import axiosRetry from "axios-retry";
import dynamic from "next/dynamic";
const Sidebar = dynamic(() => import("@/components/Sidebar/Sidebar"), {
    ssr: false,
});
const UserDropdown = dynamic(() => import("@/components/Dropdowns/UserDropdown"), {
    ssr: false,
});
const HeaderStats = dynamic(() => import("@/components/Headers/HeaderStats"), {
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
    

    // console.clear();

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
    async function logOut() {
        // Clear User Details from Local Storage
        localStorage.removeItem("user");
        // log out function to log the user out of google and set the profile array to null
        googleLogout();
        // redirect to Login Page
        push("/user/signin");
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
                        
            setIsLoading(true);           

            var timer = setTimeout(fetchData, 300);   // Delay execution of findAllStaffs by 1800ms
            return () => {
                clearTimeout(timer);                  // Clean up timer if component unmounts or token changes
            };
        };
    }, [activeDisplay, pageChange]); // Fetch data when currentPage changes
    
    const fetchData = async () =>  {

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


    




    




    if (isLoading) {
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
                <div className="relative md:ml-64 bg-blueGray-100">                    
                   
                    <nav className="absolute top-0 left-0 w-full z-1 bg-transparent md:flex-row md:flex-nowrap md:justify-start flex items-center p-4">
                        <div className="w-full mx-auto items-center flex justify-between md:flex-nowrap flex-wrap md:px-10 px-4">                            
                            
                            {/* Brand */}
                            <Link className="text-white text-sm uppercase hidden lg:inline-block font-semibold"
                                href="/admin/dashboard"
                                onClick={(e) => e.preventDefault()}
                            >
                                Dashboard
                            </Link>


                            {/* Form*/}
                            <form className="md:flex hidden flex-row flex-wrap items-center lg:ml-auto mr-12 lg:mr-28 w-98 h-178">
                                <div className="relative flex w-full flex-wrap items-stretch">                      
                                    <span className="z-10 h-full leading-snug font-normal text-center text-blueGray-300 absolute bg-transparent rounded text-2xl flex items-center justify-center w-12 pl-3 py-3">
                                        <i className="fas fa-search"></i>
                                    </span>
                                        
                                    <input
                                        type="search"
                                        name="q"
                                        id="search-form"
                                        className="search-input border-0 px-3 py-3 indent-8 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring w-full pl-10"       
                                        onChange={(e) => setQuery(e.target.value)}
                                        placeholder="Search user"
                                    />

                                    <button type="submit" onSubmit={fetchData}></button>
                                </div>                                             
                            </form>
                

                            {/* User */}
                            <ul className="flex-col md:flex-row list-none items-center hidden md:flex">
                                <UserDropdown userId={userId} username={username} displayImg={displayImg} userRoles={userRoles} logOut={logOut} />
                            </ul>
                        </div>
                    </nav>


                    {/* Header */}
                    <div className="relative bg-blue-900 md:pt-32 pb-32 pt-12">
                
                        {/* Welcome Logged-In User */}
                        <div className="px-4 md:px-10 pb-6 mx-auto w-full">  
                            <p className="w-full lg:w-6/12 xl:w-3/12 px-4 text-3xl text-white">     
                                Welcome <span className="font-bold text-white">{lastname}</span>
                            </p>
                        </div>   


                        {/* <HeaderStats /> */}

                    </div>


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
                                        {/* <Link className="blogPosts activePostView pt-3 pb-2 px-10 rounded-lg border mr-2 text-xl flex flex-row gap-1 bg-white" onClick={() => setActiveDisplay("blogPosts")}>All <span className="off_white"> ({ totalBlogPosts })</span> </Link>
                                        <Link className="publishedPosts pt-3 pb-2 px-10 rounded-lg border mr-2 text-xl flex flex-row gap-1 bg-white" onClick={() => setActiveDisplay("publishedPosts")}>Published <span className="off_white"> ({ totalPublishedPosts })</span></Link>
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

                                                <Link className="relative -top-2" href="/admin/blog/create" alt="create new article">
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
                                                    <td className="max-w-40 h-60 flex flex-col justify-center items-center">                                                                                             
                                                        <img src="/assets/img/spinning.gif" alt="Spinning" className="ml-80 mx-auto" />                                                              
                                                        <p className="text-xl tracking-extratight font-semibold">Loading...</p>                                  
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
                {/***** RIGHT-PANEL *****/}            

            </>
        );
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
            <div className="relative md:ml-64 bg-blueGray-100">                    
                   
                <nav className="absolute top-0 left-0 w-full z-1 bg-transparent lg:flex-row md:flex-nowrap md:justify-start flex items-center p-4">
                    <div className="w-full mx-auto items-center flex justify-between md:flex-nowrap flex-wrap md:px-10 px-4">                            
                        
                        {/* Brand */}
                        <Link className="text-white text-sm uppercase hidden lg:inline-block font-semibold"
                            href="/admin/dashboard"
                            onClick={(e) => e.preventDefault()}
                        >
                            Dashboard
                        </Link>


                        {/* Form*/}
                        <form className="xs:hidden md:flex flex-row flex-wrap items-center lg:ml-auto mr-12 lg:mr-28 w-98 h-178">
                            <div className="relative flex w-full flex-wrap items-stretch">                      
                                <span className="z-10 h-full leading-snug font-normal text-center text-blueGray-300 absolute bg-transparent rounded text-2xl flex items-center justify-center w-12 pl-3 py-3">
                                    <i className="fas fa-search"></i>
                                </span>
                                    
                                <input
                                    type="search"
                                    name="q"
                                    id="search-form"
                                    className="search-input border-0 px-3 py-3 indent-8 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring w-full pl-10"       
                                    onChange={(e) => setQuery(e.target.value)}
                                    placeholder="Search user"
                                />

                                <button type="submit" onSubmit={fetchData}></button>
                            </div>                                             
                        </form>
            

                        {/* User */}
                        <ul className="flex-col md:flex-row list-none items-center xs:hidden md:flex">
                            <UserDropdown userId={userId} username={username} displayImg={displayImg} userRoles={userRoles} logOut={logOut} />
                        </ul>
                    </div>
                </nav>


                {/* Header */}
                <div className="relative bg-blue-900 xs:pt-12 md:pt-32 pb-32">
            
                    {/* Welcome Logged-In User */}
                    <div className="px-4 md:px-10 pb-6 mx-auto w-full">  
                        <p className="w-full lg:w-6/12 xl:w-3/12 px-4 text-3xl text-white">     
                            Welcome <span className="font-bold text-white">{lastname}</span>
                        </p>
                    </div>   


                    {/* <HeaderStats /> */}

                </div>


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
                                    {/* <Link className="blogPosts activePostView pt-3 pb-2 px-10 rounded-lg border mr-2 text-xl flex flex-row gap-1 bg-white" onClick={() => setActiveDisplay("blogPosts")}>All <span className="off_white"> ({ totalBlogPosts })</span> </Link>
                                    <Link className="publishedPosts pt-3 pb-2 px-10 rounded-lg border mr-2 text-xl flex flex-row gap-1 bg-white" onClick={() => setActiveDisplay("publishedPosts")}>Published <span className="off_white"> ({ totalPublishedPosts })</span></Link>
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

                                            <Link className="relative -top-2" href="/admin/blog/create" alt="create new article">
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
                                        <tbody>
                                            
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>       
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
