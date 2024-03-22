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
import { signIn, useSession } from "next-auth/react";

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
import toast from "react-hot-toast";
import { z } from "zod";

const schema = z.object({
  email: z.string().email({ message: "Invalid email" }),
  password: z
    .string()
    .min(6, { message: "Password should be at least 6 characters" }),
  phonenumber: z
    .string()
    .min(10, { message: "Invalid phone number." }) // assuming a 10-digit phone number
    .max(15, { message: "Invalid phone number." }) // assuming a maximum length of 15 characters
    // .regex(/^\d+$/, { message: "Phone number should contain only digits" }),
    .refine((value) => /^\d+$/.test(value), {
      message: "Phone number should contain only digits",
    }),
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
  const { push } = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    phonenumber: "",
  });
  // const [error, setError] = useState("");
  // const [token, setToken] = useState(localStorage.getItem("token") || "");
  // const [login, { data }] = useMutation(LOGIN_MUTATION);
  const router = useRouter();
  const validateField = async (name, value) => {
    const validationResult = await validateInput({ [name]: value });
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: validationResult ? validationResult.join(",") : "",
    }));
  };
  const registerUser = async (e) => {
    e.preventDefault();
    const emailError = await validateInput({ email });
    const passwordError = await validateInput({ password });
    const phoneNumberError = await validateInput({ phonenumber });

    setErrors({
      email: emailError
        ? emailError.find((e) => e.includes("Invalid email"))
        : null,
      password: passwordError
        ? passwordError.find((e) =>
            e.includes("Password should be at least 6 characters")
          )
        : null,
      phonenumber: phoneNumberError
        ? phoneNumberError.find((e) =>
            e.includes("Phone number should contain only digits")
          )
        : null,
    });

    // if (emailError || passwordError || phoneNumberError) {
    //   toast.error(emailError || passwordError || phoneNumberError);
    //   return;
    // }

    try {
      console.log("signup entered");

      setIsLoading(true);
      // Call your API endpoint for registration
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, phonenumber }),
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
        setIsLoading(false);
        toast.success(responseData.message);

        // Registration successful, redirect to dashboard
        router.push("/dashboard");
        // toast.success(response.message);
        // }
      } else {
        console.log("reached responseData.success else");
        router.push("/login");
        // const errorData = await response.json();
        // console.log("error data:", errorData);

        toast.error(`${responseData.message}`);
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
    <div className="flex flex-col">
      <form onSubmit={registerUser}>
        {/* {error && <p>Error: {error}</p>} */}
        {/* <SigninButton /> */}
        <div className="mb-4">
          <Input
            className="h-8 bg-[#E5E7EB]"
            type="phonenumber"
            id="phonenumber"
            placeholder="Phonenumber"
            value={phonenumber}
            // onChange={(e) => setPhonenumber(e.target.value)}
            onChange={(e) => {
              setPhonenumber(e.target.value);
              validateField("phonenumber", e.target.value);
            }}
            required
          />
          {errors.phonenumber && (
            <p className="text-red-500 ">{errors.phonenumber}</p>
          )}
        </div>
        <div className="mb-4">
          <Input
            className="h-8 bg-[#CACACA] bg-opacity-30"
            type="email"
            id="email"
            placeholder="Email"
            value={email}
            // onChange={(e) => setEmail(e.target.value)}
            onChange={(e) => {
              setEmail(e.target.value);
              validateField("email", e.target.value);
            }}
            required
          />
          {errors.email && <p className="text-red-500">{errors.email}</p>}
        </div>
        <div className="mb-4">
          <Input
            className="h-8 bg-[#CACACA] bg-opacity-30"
            type="password"
            id="password"
            placeholder="Password"
            value={password}
            // onChange={(e) => setPassword(e.target.value)}
            onChange={(e) => {
              setPassword(e.target.value);
              validateField("password", e.target.value);
            }}
            required
          />
          {errors.password && <p className="text-red-500">{errors.password}</p>}
        </div>
        {/* <Button
          type="submit"
          disabled={isLoading}
          className="font-exbold bg-[#8645FF] h-10 text-[#F3E8FF] rounded-lg text-xl w-full mb-2"
        >
          {isLoading ? "Signing up..." : "Continue With email"}
        </Button> */}
        <button
          type="submit"
          disabled={isLoading}
          className="font-exbold bg-[#8645FF] h-10 text-[#F3E8FF] rounded-lg text-xl w-full mb-2"
        >
          {isLoading ? "Signing up..." : "Continue With email"}
        </button>
      </form>
    </div>
  );
}
