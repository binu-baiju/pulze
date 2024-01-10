"use client";
import React from "react";
import { SessionProvider } from "next-auth/react"
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

export const Providers = ({ children }: { children: any }) => {
  const client = new ApolloClient({
    uri: "http://localhost:4000/graphql",
    cache: new InMemoryCache(),
  });
  return (
     <SessionProvider>{children}</SessionProvider>
 
    //  <ApolloProvider client={client}><SessionProvider>{children}</SessionProvider>
    //  </ApolloProvider>
  );
};
