// "use client";

// import * as React from "react";

// import { cn } from "ui/lib/utils";
// import { Button, Label, Input, Icons } from "ui";
// import { useMutation, gql } from "@apollo/client";
// import { useEffect, useState } from "react";
// // import { Icons } from "@/components/icons"
// // import { Button } from "@/registry/new-york/ui/button"
// // import { Input } from "@/registry/new-york/ui/input"
// // import { Label } from "@/registry/new-york/ui/label"

// const SIGNUP_MUTATION = gql`
//   mutation Signup($email: String!, $password: String!) {
//     signup(email: $email, password: $password)
//   }
// `;

// interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

// export function UserAuthForm({  classNameName, ...props }: UserAuthFormProps) {
//   const [isLoading, setIsLoading] = React.useState<boolean>(false);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [token, setToken] = useState("");

//   const [signup] = useMutation(SIGNUP_MUTATION, {
//     onCompleted: (data) => {
//       // const token = data.signup;
//       // // Store token or perform necessary actions
//       // setToken(token);
//       console.log("signup done");
//     },
//     onError: (error) => {
//       console.error("Signup failed:", error);
//     },
//   });

//   // const [signup] = useMutation(SIGNUP_MUTATION);

//   async function onSubmit(event: React.SyntheticEvent) {
//     event.preventDefault();
//     setIsLoading(true);
//     // try {
//     try {
//       await signup({
//         variables: { email, password },
//       });
//     } catch (error) {
//       console.error("Signup failed:", error.message);
//     }

//     // });
//     // Store the JWT token securely in the browser (e.g., localStorage or a cookie)
//     // console.log("JWT Token:", data.signup);
//     // Redirect the user to a protected route or perform other actions.
//     // } catch (error) {
//     //   console.error("Signup Failed:", error.message);
//     // }

//     // signup({ variables: { email, password } });

//     // setTimeout(() => {
//     setIsLoading(false);
//     // }, 3000);
//   }

//   // useEffect(() => {
//   //   if (token) {
//   //     localStorage.setItem("authToken", token);
//   //   }
//   // }, [token]);

//   return (
//     <div  classNameName={cn("grid gap-6",  classNameName)} {...props}>
//       <form onSubmit={onSubmit}>
//         <div  classNameName="grid gap-2">
//           <div  classNameName="grid gap-1">
//             <Label  classNameName="" htmlFor="email">
//               Email
//             </Label>
//             <Input
//               id="email"
//               placeholder="name@example.com"
//               type="email"
//               autoCapitalize="none"
//               autoComplete="email"
//               autoCorrect="off"
//               disabled={isLoading}
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//             <Label  classNameName="mt-2" htmlFor="password">
//               Password
//             </Label>
//             <Input
//               id="password"
//               placeholder="password"
//               type="password"
//               autoCapitalize="none"
//               autoComplete="password"
//               autoCorrect="off"
//               disabled={isLoading}
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//           </div>
//           <Button
//             disabled={isLoading}
//             //  onClick={onSubmit}
//           >
//             {/* {isLoading && (
//               // <Icons.spinner  classNameName="mr-2 h-4 w-4 animate-spin" />
//             )} */}
//             Sign In with Email
//           </Button>
//         </div>
//       </form>
//       <div  classNameName="relative">
//         <div  classNameName="absolute inset-0 flex items-center">
//           <span  classNameName="w-full border-t" />
//         </div>
//         <div  classNameName="relative flex justify-center text-xs uppercase">
//           <span  classNameName="bg-background px-2 text-muted-foreground">
//             Or continue with
//           </span>
//         </div>
//       </div>
//       <Button variant="outline" type="button" disabled={isLoading}>
//         {/* {isLoading ? (
//           <Icons.spinner  classNameName="mr-2 h-4 w-4 animate-spin" />
//         ) : (
//           <Icons.gitHub  classNameName="mr-2 h-4 w-4" />
//         )}{" "} */}
//         Github
//       </Button>
//     </div>
//   );
// }
"use client";
import * as React from "react";

import { useEffect, useState } from "react";

import { Label } from "../../../../../packages/ui/components/label";
import { Input } from "../../../../../packages/ui/components/input";

import { Button } from "ui";
// import { useMutation, gql } from "@apollo/client";
import { useRouter } from "next/navigation";
import { cn } from "ui/lib/utils";
// import { Button, Label, Input, Icons } from "ui";
// import { useMutation, gql } from "@apollo/client";
// import { useEffect, useState } from "react";

// const SIGNUP_MUTATION = gql`
//   mutation Signup($email: String!, $password: String!) {
//     signup(email: $email, password: $password) {
//       id
//       email
//     }
//   }
// `;

// const LOGIN_MUTATION = gql`
//   mutation Login($email: String!, $password: String!) {
//     login(email: $email, password: $password) {
//       user {
//         id
//         email
//       }
//       token
//     }
//   }
// `;
import SigninButton from "../../../components/SigninButton";
export function UserAuthForm() {
  const { push } = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  // const [error, setError] = useState("");
  // const [token, setToken] = useState(localStorage.getItem("token") || "");
  // const [login, { data }] = useMutation(LOGIN_MUTATION);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // const { data } = await login({
      //   variables: { email, password },
      // });
      // console.log(data);
      // const { user, token } = data.login;
      // // const { user, token } = data.signup;
      // // const user = data.signup;
      // localStorage.setItem("token", token);

      // console.log("Login successful!");
      // console.log("User:", user);
      // // Save the token in localStorage
      // // localStorage.setItem("token", token);

      // console.log("Login successful!", data);
      // // console.log("User:", user);

      const response = await fetch(
        "http://localhost:8080/api/registerOrLogin",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
            phonenumber,
          }),
        }
      );
      const data = await response.json();
      console.log(data);

      if (data.token) {
        localStorage.setItem("token", data.token);
        alert(data.message);
        // window.location.href = '/dashboard'
        console.log(data.token);
        push("/dashboard");
      } else {
        alert("Please check your username and password");
      }
    } catch (error) {
      console.error("Login failed:", error.message);
      // setError(error.message);
    }

    setIsLoading(false);
  };

  // useEffect(() => {
  //   // Save the token in localStorage when it changes
  //   localStorage.setItem("token", token);
  //   console.log(token);
  // }, [token]);

  return (
    <div className="flex flex-col">
      <form onSubmit={handleSubmit}>
        {/* {error && <p>Error: {error}</p>} */}
        <Input
          className="h-8 mb-4 bg-[#E5E7EB]"
          type="phonenumber"
          id="phonenumber"
          placeholder="Phonenumber"
          value={phonenumber}
          onChange={(e) => setPhonenumber(e.target.value)}
          required
        />
        <Input
          className="h-8 mb-4 bg-[#CACACA] bg-opacity-30"
          type="email"
          id="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          className="h-8 mb-4 bg-[#CACACA] bg-opacity-30"
          type="password"
          id="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </form>
    </div>
  );
}
