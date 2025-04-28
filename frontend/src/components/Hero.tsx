'use client'
import { PrimaryButton } from "./Button";
import { useRouter } from "next/navigation";
import { Features } from "./Features";
import { HeroVideo } from "./HeroVideo";

export const Hero = () => {
  const router = useRouter();

  return (
    <div className="w-full">
      <div className="grid items-center justify-center px-6 md:px-12 lg:px-24 py-12 gap-8 md:gap-12">
        {/* Left Text Section */}
        <div className="w-3/4 mx-auto flex flex-col justify-center items-center">
          <h1 className="font-bold text-5xl md:text-9xl tracking-tight text-center mb-6">
            Automate without limits
          </h1>
          <h2 className="text-lg md:text-xl font-medium text-center mb-6 text-gray-700">
            Turn chaos into smooth operations by automating workflows
            yourself—no developers, no IT tickets, no delays. The only limit is your imagination.
          </h2>
          <PrimaryButton
            size="big"
            onClick={() => router.push("/signup")}
          >
            Start free with email
          </PrimaryButton>
        </div>
      </div>
      <div className="w-full flex items-center justify-center gap-4 pb-5">
          <Features title = "Free Forever" subtitle="for core features"></Features>
          <Features title = "More apps" subtitle="than any other platform"></Features>
          <Features title = "Cutting-edge" subtitle="AI features"></Features>
      </div>
      <div className="flex justify-center items-center mt-6">
        <HeroVideo></HeroVideo>
      </div>
    </div>
  );
};
