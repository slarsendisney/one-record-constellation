"use client";
import 'regenerator-runtime/runtime'
import React, { useState, useContext, useMemo, useEffect, use } from "react";
import mapboxgl from "mapbox-gl";

interface GlobeContextAttributes {
  setMap: React.Dispatch<React.SetStateAction<mapboxgl.Map | undefined>>;
  map: mapboxgl.Map | undefined;
  loaded: boolean;
  active: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
}

const GlobeContext = React.createContext<GlobeContextAttributes>({
  setMap: () => {},
  map: undefined,
  loaded: false,
  active: false,
  setActive: () => {},
});

export const GlobeProvider = ({ children }: { children: JSX.Element }) => {
  const [map, setMap] = useState<mapboxgl.Map>();
  const [loaded, setLoaded] = useState(false);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (!map) return;
    map.on("style.load", () => {
      map.setFog({
        range: [0.8, 8],
        color: "#dc9f9f",
        "horizon-blend": 0.2,
      }); // Set the default atmosphere style
      setLoaded(true);
    });
  }, [map]);

  useEffect(() => {
    if (active) {
      map?.flyTo({
        zoom: 1.5,
        speed: 0.1,
      });
    } else {
      map?.flyTo({
        zoom: 0.8,
        speed: 0.1,
      });
    }
  }, [active, map]);

  useEffect(() => {
    // on escape key press
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActive(false);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <GlobeContext.Provider
      value={{
        setMap,
        map,
        loaded,
        active,
        setActive,
      }}
    >
      {children}
    </GlobeContext.Provider>
  );
};

export const useGlobe = () => useContext(GlobeContext);

export default GlobeContext;
