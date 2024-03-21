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
import { redirect, useRouter } from "next/navigation";
import { cn } from "ui/lib/utils";
import { signIn, useSession } from "next-auth/react";

import SigninButton from "../../../components/SigninButton";
import toast from "react-hot-toast";
import axios from "axios";
import router from "next/router";
import { Session } from "next-auth";
import { z } from "zod";
import { error } from "console";
// type Response = {
//   messsage: string;
//   ok: string;
//   response: Response;
// };
interface ApiResponse {
  ok: boolean;
  success?: boolean; // This is optional, as it might not always be present
  error?: string; // This is optional, as it might not always be present
  // Add other properties as needed
}
// interface CustomSession extends NextAuthSession {
//   status?: string; // Add the 'status' property
// }

const schema = z.object({
  email: z.string().email({ message: "Invalid email" }),
  password: z
    .string()
    .min(6, { message: "Password should be at least 6 characters" }),
});

async function validateInput(data) {
  try {
    await schema.parseAsync(data);
    return null;
  } catch (error) {
    return error.errors
      .map((e) => e.message)
      .filter((message) => !message.includes("Required"));
  }
}
export function UserAuthForm() {
  // const { push } = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const phonenumber = "123456789";
  const { data: session } = useSession() as { data: Session };
  const [errors, setErrors] = useState({ email: "", password: "" });

  const router = useRouter();
  // const [error, setError] = useState("");
  // const [token, setToken] = useState(localStorage.getItem("token") || "");
  // const [login, { data }] = useMutation(LOGIN_MUTATION);
  useEffect(() => {
    if (session?.user) {
      router.push("/dashboard");
      // toast.success("Logged In");
    }
  });

  const validateField = async (name, value) => {
    const validationResult = await validateInput({ [name]: value });
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: validationResult ? validationResult : "",
    }));
  };

  const registerUser = async (e) => {
    e.preventDefault();
    const emailError = await validateInput({ email });
    const passwordError = await validateInput({ password });
    setErrors({
      email: emailError
        ? emailError.find((e) => e.includes("Invalid email"))
        : null,
      password: passwordError
        ? passwordError.find((e) =>
            e.includes("Password should be at least 6 characters")
          )
        : null,
    });

    try {
      // if (errors) {
      //   toast.error("Invalid email or password.");
      //   return;
      // }
      setIsLoading(true);
      // Call your API endpoint for registration
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      console.log("response:", response);
      // if (response.ok) {
      const responseData = await response.json();
      console.log("responseData:", responseData);
      if (responseData.success) {
        // Registration successful, sign in the user
        await signIn("credentials", {
          email: email,
          password: password,
          phonenumber: phonenumber,
          redirect: false,
          // Add other necessary fields if needed
        });

        toast.success(responseData.message);
        // toast.success(response.message);
        // }
      } else {
        console.log("reached responseData.success else");
        // const errorData = await response.json();
        // console.log("error data:", errorData);

        toast.error(`${responseData.message}`);
        router.push("/signup");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      toast.error("Something went wrong during registration");
      setIsLoading(false);
    }
  };

  // useEffect(() => {
  //   // Save the token in localStorage when it changes
  //   localStorage.setItem("token", token);
  //   console.log(token);
  // }, [token]);

  return (
    // <form onSubmit={handleSubmit}>
    <form onSubmit={registerUser}>
      {/* {error && <p>Error: {error}</p>} */}
      <Label htmlFor="email">Email</Label>
      <Input
        type="email"
        id="email"
        value={email}
        // onChange={(e) => setEmail(e.target.value)}
        onChange={(e) => {
          setEmail(e.target.value);
          validateField("email", e.target.value);
        }}
        // onChange={handleChange}
        // onBlur={() => validateField("email", email)}
        required
      />
      {errors.email && <p className="text-red-500">{errors.email}</p>}
      <Label htmlFor="password">Password</Label>
      <Input
        type="password"
        id="password"
        value={password}
        // onChange={(e) => setPassword(e.target.value)}
        onChange={(e) => {
          setPassword(e.target.value);
          validateField("password", e.target.value);
        }}
        // onBlur={() => validateField("password", password)}
        required
      />
      {errors.password && <p className="text-red-500">{errors.password}</p>}
      {/* onClick={handleSubmit} */}
      {/* <Button type="submit" disabled={isLoading}>
        {isLoading ? "Logging up..." : "Login"}
      </Button> */}
      <button
        className="font-exbold bg-[#8645FF] h-10 text-[#F3E8FF] rounded-lg text-xl w-full mt-2"
        type="submit"
        disabled={isLoading}
      >
        {isLoading ? "Logging up..." : "Continue with email"}
      </button>
      {/* {JSON.stringify(session)} */}
    </form>
  );
}

function push(arg0: string) {
  throw new Error("Function not implemented.");
}
