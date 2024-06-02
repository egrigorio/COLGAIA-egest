import React from "react";
import Navbar from "./Navbar";
import Hero from "./Hero";
const Index = () => {
    return (
        <>
            <Navbar />
            <div style={{ height: "100vh" }} className="bg-neutral-content">
                <Hero />
            </div>
        </>
    );
};

export default Index;