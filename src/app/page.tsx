import { Globe } from "@/components/Globe";
import { Hero } from "@/components/Hero";
import { Messaging } from "@/components/Messaging";
import { GlobeProvider } from "@/context/GlobeContext";

export default function GlobePage() {
  return (
    <GlobeProvider>
      <div >
        <Hero />
        <Globe />
        <Messaging />
      </div>
    </GlobeProvider>
  );
}
