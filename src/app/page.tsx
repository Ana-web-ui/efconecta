import Image from "next/image";
import Login from "./login/page";
import React from "react";
import Feed from "./feed/page";   
export default function Home() {
  return (
<>
    <Login />
    <Feed />
</>
  );
}
