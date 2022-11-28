import "../styles/globals.css";
import type { AppProps } from "next/app";
import { StateContext } from "../state/StateContext";
import { Toaster } from "react-hot-toast";
import { Navbar } from "../components/Navbar";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <StateContext>
      <div className="layout">
        <header>
          <Navbar />
        </header>
        <main className="main-container">
          <Toaster />
          <Component {...pageProps} />
        </main>
      </div>
    </StateContext>
  );
}
