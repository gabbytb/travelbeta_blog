"use client";
import { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import axios from "axios";





export default function Home() {

    // SET PAGE TITLE
    useEffect(() => {
        document.title = "Travelbeta Blog: Home";
    }, []);
    // SET PAGE TITLE

 
    
    const [data, setData] = useState(null);
    // console.log("DATA: ", data);

    useEffect(() => {
        axios.get("/api/v1")
        .then((response) => setData(response.data))
        .catch((err) => console.error("Error fetching data:", err));
    }, []);
    


    return (
        <>        
            <Head>
                <title>Travelbeta Blog: Home</title>
                <meta name="description" content="Travel with us to breathtaking destinations, hidden gems, and exciting adventures. Get inspired and discover the world's best-kept secrets." />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />

                {/* Open Graph (OG) Meta Tags for Facebook, LinkedIn, etc. */}
                <meta property="og:title" content="Travelbeta Blog: Home" />
                <meta property="og:description" content="Travel with us to breathtaking destinations, hidden gems, and exciting adventures. Get inspired and discover the world's best-kept secrets." />
                {/* <meta property="og:image" content="https://example.com/og-image.jpg" />
                <meta property="og:url" content="https://example.com/blog-post" /> */}
                <meta property="og:type" content="article" />

                {/* Twitter Meta Tags */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Travelbeta Blog: Home" />
                <meta name="twitter:description" content="Travel with us to breathtaking destinations, hidden gems, and exciting adventures. Get inspired and discover the world's best-kept secrets." />
                {/* <meta name="twitter:image" content="https://example.com/twitter-image.jpg" /> */}
            </Head>
        
            <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">

                <header>
                    <nav>
                        <ul>
                            
                        </ul>
                    </nav>
                </header>

                <main>
                    <h1>🚀 Next.js + Express Integration</h1>
                    {/* {data ? <p>{data.message}</p> : <p>Loading...</p>} */}
                    {/* <h1>🚀 Welcome to My Next.js + Express App!</h1> */}
                    <p>This is the homepage served by Next.js via Express.</p>
                    <a href="/about" style={{ textDecoration: "none", color: "blue" }}>Go to About Page →</a>
                    <a href="/user/signup">Go to Sign Up Page →</a>
                    <a href="/user/signin" style={{ textDecoration: "none", color: "blue" }}>Go to Sign In Page →</a>
                </main>
              
                <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
                    <a
                      className="flex items-center gap-2 hover:underline hover:underline-offset-4"
                      href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Image
                        aria-hidden
                        src="/file.svg"
                        alt="File icon"
                        width={16}
                        height={16}
                      />
                      Learn
                    </a>
                    <a
                      className="flex items-center gap-2 hover:underline hover:underline-offset-4"
                      href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Image
                        aria-hidden
                        src="/window.svg"
                        alt="Window icon"
                        width={16}
                        height={16}
                      />
                      Examples
                    </a>
                    <a
                      className="flex items-center gap-2 hover:underline hover:underline-offset-4"
                      href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Image
                        aria-hidden
                        src="/globe.svg"
                        alt="Globe icon"
                        width={16}
                        height={16}
                      />
                      Go to nextjs.org →
                    </a>
                </footer>

            </div>
        </>
    );
};