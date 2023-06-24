"use client";
import "mapbox-gl/dist/mapbox-gl.css";

import { m } from "framer-motion";
import mapboxgl from "mapbox-gl";
import { useEffect, useState } from "react";
import { useGlobe } from "@/context/GlobeContext";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN as string;

export const Globe = (): JSX.Element => {
  const { setMap, loaded, active, map} = useGlobe();

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: "map", // container ID
      style: "mapbox://styles/mapbox/streets-v11", // style URL
      center: [-74.5, 40], // starting position [lng, lat]
      zoom: 0.5, // starting zoom
      projection: {
        name: "globe",
      }, // display the map as a 3D globe
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
        opacity: active ? 1 : loaded ? 0.5 : 0,
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
