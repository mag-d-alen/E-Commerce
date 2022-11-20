import Head from "next/head";
import React, { ReactNode } from "react";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";

export const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="layout">
      <Head>
        <title></title>
      </Head>
      <header>
        <Navbar />
      </header>
      <main className="main-container"> {children}</main>
      <footer>
        <Footer children={undefined} />
      </footer>
    </div>
  );
};
