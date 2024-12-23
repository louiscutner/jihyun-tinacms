// pages/_app.js
import "../styles.css";
import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router"; // Import useRouter

const App = ({ Component, pageProps }) => {
  const [opacity, setOpacity] = useState(1); // State for opacity
  const router = useRouter(); // Initialize useRouter

  useEffect(() => {
    const handleRouteChangeStart = () => {
      setOpacity(0); // Start fade-out
    };

    const handleRouteChangeComplete = () => {
      setOpacity(1); // Start fade-in
    };

    // Listen to route change events
    router.events.on("routeChangeStart", handleRouteChangeStart);
    router.events.on("routeChangeComplete", handleRouteChangeComplete);
    router.events.on("routeChangeError", handleRouteChangeComplete);

    // Cleanup event listeners on unmount
    return () => {
      router.events.off("routeChangeStart", handleRouteChangeStart);
      router.events.off("routeChangeComplete", handleRouteChangeComplete);
      router.events.off("routeChangeError", handleRouteChangeComplete);
    };
  }, [router]);

  return (
    <div style={{ opacity }} className="transition-opacity duration-500">
      <Head>
        <title>Jihyun Kim Ceramic</title>
      </Head>
      <Component {...pageProps} />
    </div>
  );
};

export default App;
