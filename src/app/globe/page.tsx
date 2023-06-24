import { Globe } from "@/components/Globe";
import { Hero } from "@/components/Hero";
import { GlobeProvider } from "@/context/GlobeContext";

export default function GlobePage() {
  return (
    <GlobeProvider>
      <div style={{ backgroundColor: "#06122A" }}>
        <Hero />
        <Globe />
      </div>
    </GlobeProvider>
  );
}
