"use client";
import "mapbox-gl/dist/mapbox-gl.css";

import { m } from "framer-motion";
import mapboxgl from "mapbox-gl";
import { useEffect, useState } from "react";
import { useGlobe } from "@/context/GlobeContext";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN as string;

export const Globe = (): JSX.Element => {
  const { setMap, loaded, fetching, active, map} = useGlobe();

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v11", 
      center: [-74.5, 40], 
      zoom: 1.5, 
      projection: {
        name: "globe",
      },
    });

    setMap(map);
  }, [setMap]);

  useEffect(() => {
    if (loaded) {
      setTimeout(() => {
        map?.flyTo({
          zoom: 0.8,
          speed: 0.1,
        });
      }, 1000);
    }
  }, [loaded, map]);

  return (
    <m.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: active &&!fetching ? 1 : loaded ? 0.5 : 0,
      }}
      transition={{
        delay: active?0: 1,
        duration: 1.5,
      }}
      id="map"
      className="w-screen h-screen"
    />
  );
};
