import { Appbar } from "@/components/Appbar";
import { Bottom } from "@/components/Bottom";
import { Hero } from "@/components/Hero";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Appbar/>
      <Hero/>
      <Bottom/>
    </div>
  );
}
