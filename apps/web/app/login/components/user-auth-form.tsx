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

// export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
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
//     <div className={cn("grid gap-6", className)} {...props}>
//       <form onSubmit={onSubmit}>
//         <div className="grid gap-2">
//           <div className="grid gap-1">
//             <Label className="" htmlFor="email">
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
//             <Label className="mt-2" htmlFor="password">
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
//               // <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
//             )} */}
//             Sign In with Email
//           </Button>
//         </div>
//       </form>
//       <div className="relative">
//         <div className="absolute inset-0 flex items-center">
//           <span className="w-full border-t" />
//         </div>
//         <div className="relative flex justify-center text-xs uppercase">
//           <span className="bg-background px-2 text-muted-foreground">
//             Or continue with
//           </span>
//         </div>
//       </div>
//       <Button variant="outline" type="button" disabled={isLoading}>
//         {/* {isLoading ? (
//           <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
//         ) : (
//           <Icons.gitHub className="mr-2 h-4 w-4" />
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
import { useMutation, gql } from "@apollo/client";
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

const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      user {
        id
        email
      }
      token
    }
  }
`;

export function UserAuthForm() {
  const { push } = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [error, setError] = useState("");
  // const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [login, { data }] = useMutation(LOGIN_MUTATION);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data } = await login({
        variables: { email, password },
      });
      console.log(data);
      const { user, token } = data.login;
      // const { user, token } = data.signup;
      // const user = data.signup;
      localStorage.setItem("token", token);

      console.log("Login successful!");
      console.log("User:", user);
      // Save the token in localStorage
      // localStorage.setItem("token", token);

      console.log("Login successful!", data);
      // console.log("User:", user);
      push("/dashboard");
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
    <form onSubmit={handleSubmit}>
      {/* {error && <p>Error: {error}</p>} */}
      <Label htmlFor="email">Email</Label>
      <Input
        type="email"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <Label htmlFor="password">Password</Label>
      <Input
        type="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <Button type="submit" disabled={isLoading} onClick={handleSubmit}>
        {isLoading ? "Logging up..." : "Login"}
      </Button>
    </form>
  );
}
