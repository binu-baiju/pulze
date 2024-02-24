"use client";

import { useEffect } from "react";

// // Function to check if the user is authenticated
const checkAuthentication = async () => {
  // const token = localStorage.getItem("token");
  let token;
  if (typeof window === "undefined") {
    return false; // Avoid authentication check on the server side
  }
  if (typeof window !== "undefined") {
    // now access your localStorage
    console.log("inside that if condition");
    token = localStorage.getItem("token");
    // const data = localStorage.setItem('data');
  } else {
    console.log("cant get token");
  }

  if (!token) {
    // Token is not present, user is not authenticated
    console.log("no token found");

    return false;
  }

  try {
    const response = await fetch(
      "http://localhost:8080/api/authenticateToken",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
      }
    );

    if (response.ok) {
      // Token is valid, user is authenticated
      console.log("Yes authenticated");

      return true;
    } else {
      // Token is invalid or expired, user is not authenticated
      console.log("error happened to post check authentication");

      return false;
    }
  } catch (error) {
    console.error("Error checking authentication:", error);
    return false;
  }
};

// Export only the isAuthenticated value
export const getIsAuthenticated = async () => {
  useEffect(() => {
    // This code will run on the client side
    const authenticate = async () => {
      const isAuthenticated = await checkAuthentication();
      // Handle the result as needed
    };

    authenticate();
  }, []);

  return await checkAuthentication();
};
// Auth.ts
// const checkAuthentication = async () => {
//   return new Promise((resolve) => {
//     let token;

//     if (typeof window !== "undefined") {
//       // Access localStorage on the client side
//       token = localStorage.getItem("token");
//     } else {
//       console.log("localStorage is not accessible on the server side");
//       resolve(false);
//     }

//     if (!token) {
//       console.log("No token found");
//       resolve(false);
//     }

//     fetch("http://localhost:8080/api/authenticateToken", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         "x-access-token": token,
//       },
//     })
//       .then((response) => {
//         if (response.ok) {
//           console.log("Authenticated");
//           resolve(true);
//         } else {
//           console.log("Error during authentication");
//           resolve(false);
//         }
//       })
//       .catch((error) => {
//         console.error("Error checking authentication:", error);
//         resolve(false);
//       });
//   });
// };

// export const getIsAuthenticated = async () => {
//   return await checkAuthentication();
// };

// Auth.ts

// import React, { useEffect, useRef, useState } from "react";

// export const checkAuthentication = async () => {
//   let token;

//   useEffect(() => {
//     // This code will run on the client side
//     token = localStorage.getItem("token");
//     if (token) {
//       // Your logic for handling the token on the client side
//     } else {
//       console.log("Can't get token on the client side");
//     }
//   }, []);

//   try {
//     const response = await fetch(
//       "http://localhost:8080/api/authenticateToken",
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           "x-access-token": token,
//         },
//       }
//     );

//     if (response.ok) {
//       console.log("Authenticated");
//       return true;
//     } else {
//       console.log("Error during authentication");
//       return false;
//     }
//   } catch (error) {
//     console.error("Error checking authentication:", error);
//     return false;
//   }
// };

// // if (typeof window !== "undefined") {
// //   token = localStorage.getItem("token");
// // } else {
// //   console.log("Can't get token on the server side");
// //   return false;
// // }

// // if (!token) {
// //   console.log("No token found");
// //   return false;
// // }
