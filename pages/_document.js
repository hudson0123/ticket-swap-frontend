import Navbar from "@/components/Navbar";
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="antialiased bg-gray-900">
        <Navbar/>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
