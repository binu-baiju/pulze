"use client";
import { useEffect } from "react";
import { Button, Header } from "ui";

export default function Page(): JSX.Element {
  async function getdata() {
    const data = await fetch("http://localhost:5001/healthz");
    const res = await data.json();
    console.log(res);
  }
  useEffect(() => {
    getdata()
      .then(() => {
        console.log("fef");
      })
      .catch(() => {
        console.log("fef");
      });
  }, []);
  return (
    <>
      <Header text="Web" />
      <Button />
    </>
  );
}
