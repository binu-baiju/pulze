"use client";

// import { useMutation, useQuery, gql } from "@apollo/client";
import { log } from "console";

import { useEffect, useState } from "react";
export const dynamic = "force-dynamic";
import Script from "next/script";
import { redirect } from "next/navigation";
import Head from "next/head";

const Page = () => {
  useEffect(() => {
    redirect("/home");
  }, []);

  return (
    <>
      <Head>
        <title>Pulze</title>
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.3.0/flowbite.min.css"
          rel="stylesheet"
        />
        <Script
          src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.3.0/flowbite.min.js"
          strategy="lazyOnload"
          onLoad={() =>
            console.log(`script loaded correctly, cdn has been populated`)
          }
        />
      </Head>
    </>
  );
};

export default Page;
