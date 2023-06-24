import { Globe } from "@/components/Globe";
import { Hero } from "@/components/Hero";
import { Messaging } from "@/components/Messaging";
import { Nav } from "@/components/Nav";
import { GlobeProvider } from "@/context/GlobeContext";

export default function GlobePage() {
  return (
    <GlobeProvider>
      <div style={{ backgroundColor: "#06122A" }}>
        <Nav className="absolute top-0 left-0 z-50" />
        <Hero />
        <Globe />
        <Messaging />
      </div>
    </GlobeProvider>
  );
}
