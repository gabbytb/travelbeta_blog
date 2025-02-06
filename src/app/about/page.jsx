"use client";
import { useEffect } from "react";
import Link from "next/link";
import Head from "next/head";




export default function About() {

  
    // SET PAGE TITLE
    useEffect(() => {
        document.title = "Travelbeta Blog: About us";
        var meta=document.getElementsByTagName("meta");
        for (var i = 0; i < meta.length; i++) {
            if (meta[i].name.toLowerCase() == "description") {
                meta[i].content = document.getElementsByClassName("Category-H1")[0].innerHTML;
                console.log("DESCRIPTION: ", meta[i].content);                
            };
        };
    }, []);
    // // SET PAGE TITLE


    return (
      <div>
        <Head>
          <title>About | My Next.js + Express App</title>
          <meta name="description" content="Learn more about our Next.js and Express.js integration." />
        </Head>

        <main style={{ textAlign: "center", padding: "50px" }}>
          <h1>📖 About This App</h1>
          <p>This application is powered by Next.js with an Express.js backend.</p>
          <Link href="/" style={{ textDecoration: "none", color: "blue" }}>← Back to Home</Link>
        </main>
      </div>
    );
};
