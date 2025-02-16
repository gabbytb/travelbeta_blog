import React from "react";
// import type { Metadata } from "next";
import head from "next/head";
import { Geist, Geist_Mono } from "next/font/google";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { googleClient } from '@/constants';
import "./globals.css";
import "@fortawesome/fontawesome-free/css/all.min.css"; 
import { Analytics } from "@vercel/analytics/react"



const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

// export const metadata: Metadata = {
//     title: "Travelbeta Blog: Home",
//     description: "Travel with us to breathtaking destinations, hidden gems, and exciting adventures. Get inspired and discover the world's best-kept secrets.",
//     openGraph: {
//         title: "Travelbeta Blog: Home",
//         description: "Travel with us to breathtaking destinations, hidden gems, and exciting adventures. Get inspired and discover the world's best-kept secrets.",
//     },
// };


// export default function RootLayout({
//     children,
// }: Readonly<{
//     children: React.ReactNode;
// }>) {
//     return (
//         <html lang="en">
//             <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
//                 {children}
//                 <Analytics />
//             </body>
//         </html>
//     );
// };

export const metadata = {
    title: "Travelbeta Blog: Home",
    description: "Travel with us to breathtaking destinations, hidden gems, and exciting adventures. Get inspired and discover the world's best-kept secrets.",
    openGraph: {
        title: "Travelbeta Blog: Home",
        description: "Travel with us to breathtaking destinations, hidden gems, and exciting adventures. Get inspired and discover the world's best-kept secrets.",
    },
};


const RootLayout = ({ children }) => {

    return (
        <html lang="en">
            <head>
                <title>Travelbeta Blog: Home</title>
                <meta name="description" content="Travel with us to breathtaking destinations, hidden gems, and exciting adventures. Get inspired and discover the world's best-kept secrets." />
                
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="robots" content="noindex, noarchive" />
                
                <link rel="icon" href="/assets/img/favicon.png" />
                <link rel="stylesheet" href="/assets/css/style.css" />

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
            </head>
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                <GoogleOAuthProvider clientId={`${googleClient.map(item => item.key)}`}> 
                    {children}
                </GoogleOAuthProvider>
                <Analytics />
            </body>
        </html>
    );
};
export default RootLayout;