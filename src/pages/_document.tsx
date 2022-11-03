import Document, { Head, Html, Main, NextScript } from "next/document"
import React from "react";

export default class MyDocument extends Document {
   render() {
      return (
         <Html>
            <Head>
               <title>IDEA - Maker</title>
               <link rel="shortcut icon" type="image/svg" href="LogoIcon.svg"/>

               <link rel="preconnect" href="https://fonts.googleapis.com"/>
               <link rel="preconnect" href="https://fonts.gstatic.com" />
               <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;700&display=swap" rel="stylesheet"/>
            </Head>
            <body>
               <Main/>
               <NextScript/>
            </body>   
         </Html>
      );
   }
}