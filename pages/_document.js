import Navbar from "@/components/Navbar";
import { Html, Head, Main, NextScript } from "next/document";
import React, { useState } from "react";


export default function Document() {


  return (
    <Html lang="en">
      <meta name="viewport" content="initial-scale=1, width=device-width" />
      <Head />
      <body className="antialiased bg-gray-900">
          <Main />
          <NextScript />
      </body>
    </Html>
  );
}
