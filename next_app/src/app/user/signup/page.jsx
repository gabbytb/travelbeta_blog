import Link from "next/link";
import Head from "next/head";




export default function SignUp() {
  return (
    <div>
      <Head>
        <title>Sign Up | My Next.js + Express App</title>
        <meta name="description" content="Learn more about our Next.js and Express.js integration." />
      </Head>

      <main style={{ textAlign: "center", padding: "50px" }}>
        <h1>📖 About This App</h1>
        <p>This application is powered by Next.js with an Express.js backend.</p>
        <Link href="/" style={{ textDecoration: "none", color: "blue" }}>← Back to Home</Link>
      </main>
    </div>
  );
}
