import Image from "next/image";
import Login from "./login/page";
import React from "react";
import Feed from "./feed/page";   
import Chamada from "./chamada/page";
export default function Home() {
  return (
<>
    <Login />
    <Feed />
    <Chamada />
</>
  );
}
