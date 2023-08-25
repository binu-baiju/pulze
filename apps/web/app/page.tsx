"use client";
import { useEffect } from "react";
import { Button, Header, Heading } from "ui";

interface ResponseType {
  message: string;
}

export default function Page(): JSX.Element {
  async function getdata(): Promise<string> {
    const data = await fetch("http://localhost:5001/check");
    const res = (await data.json()) as ResponseType;

    return res.message;
  }
  useEffect(() => {
    getdata()
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <>
      <Header text="Web" />
      <Button />
      <Heading />
    </>
  );
}
