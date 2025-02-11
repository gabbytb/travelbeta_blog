// TYPESCRIPT VERSION
import type { NextConfig } from "next";
const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "res.cloudinary.com", // Replace with the actual domain
            },
        ],
    },
};
export default nextConfig;



// JAVASCRIPT VERSION
// const nextConfig = {
//     /* config options here */
//     images: {
//         remotePatterns: [
//             {
//                 protocol: "https",
//                 hostname: "res.cloudinary.com", // Replace with the actual domain
//             },
//         ],
//     },
// };
// module.exports = nextConfig;