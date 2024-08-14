/* eslint-disable react/prop-types */
import React from "react";
import { Toaster } from "react-hot-toast";
import Footer from "./Footer";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <main style={{ minHeight: "85vh" }}>
        <Toaster />
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
