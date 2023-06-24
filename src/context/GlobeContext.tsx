"use client";
import "regenerator-runtime/runtime";
import React, {
  useState,
  useContext,
  useMemo,
  useEffect,
  use,
  useCallback,
} from "react";
import mapboxgl from "mapbox-gl";

interface GlobeContextAttributes {
  setMap: React.Dispatch<React.SetStateAction<mapboxgl.Map | undefined>>;
  map: mapboxgl.Map | undefined;
  loaded: boolean;
  active: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
  fetching: boolean;
  onSubmit: (message: string, littleError?:boolean) => void;
  error: string | undefined;
  reset: () => void;
  messages: { message: string; user: "AI" | "USER" }[];
}

const GlobeContext = React.createContext<GlobeContextAttributes>({
  setMap: () => {},
  map: undefined,
  loaded: false,
  active: false,
  setActive: () => {},
  onSubmit: (message: string, littleError?:boolean) => {},
  fetching: false,
  error: undefined,
  reset: () => {},
  messages: [],
});

export const GlobeProvider = ({ children }: { children: JSX.Element }) => {
  const [map, setMap] = useState<mapboxgl.Map>();
  const [loaded, setLoaded] = useState(false);
  const [active, setActive] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const [shouldSpin, setShouldSpin] = useState(true);
  const [requestLoading, setRequestLoading] = useState(false);
  const [markers, setMarkers] = useState<mapboxgl.Marker[]>([]);
  const [routes, setRoutes] = useState<string[]>([]);
  const [messages, setMessages] = useState<
    { message: string; user: "AI" | "USER" }[]
  >([]);

  const [requestData, setRequestData] = useState<any>(undefined);

  const clear = useCallback(() => {
    markers.forEach((marker) => {
      marker.remove();
    });
    if (!map) return;

    routes.forEach((route) => {
      map.removeLayer(route);
      map.removeSource(route);
    });
    setMarkers([]);
    setRoutes([]);
  }, [markers, map, routes]);

  const onSubmit = useCallback(
    (message: string, littleError: boolean = false) => {
      clear();
      const newMessages = [...messages, { message, user: "USER" }] as {
        message: string;
        user: "AI" | "USER";
      }[];
      setMessages(newMessages);
      setError(undefined);
      setRequestLoading(true);
      fetch("/api/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message,
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          if (!res.intent) {
            if (littleError) {
              newMessages.push({ message: res.message, user: "AI" });
              setMessages(newMessages);
            } else {
              setError("Sorry, I didn't understand that. Please try again.");
            }
          } else {
            setRequestData(res);
            setActive(true);
            newMessages.push({ message: res.message, user: "AI" });
            setMessages(newMessages);
          }

          setRequestLoading(false);
        });
    },
    [clear, messages]
  );

  useEffect(() => {
    if (!map || !requestData || !requestData.map) return;

    const {
      map: { shippers, consignees, routes },
    } = requestData;

    const markers = [] as mapboxgl.Marker[];
    const routeSources = [] as string[];

    shippers.map(
      (shipper: { id: string; name: string; location: [number, number] }) => {
        const el = document.createElement("div");
        el.className = "bg-red-800 rounded-full w-5 h-5";
        const newMarker = new mapboxgl.Marker(el).setLngLat({
          lat: shipper.location[1],
          lng: shipper.location[0],
        });
        newMarker.addTo(map);
        markers.push(newMarker);
      }
    );

    consignees.map(
      (consignee: { id: string; name: string; location: [number, number] }) => {
        const el = document.createElement("div");
        el.className = "bg-blue-800 rounded-full w-5 h-5";
        const newMarker = new mapboxgl.Marker(el).setLngLat({
          lat: consignee.location[1],
          lng: consignee.location[0],
        });
        newMarker.addTo(map);
        markers.push(newMarker);
      }
    );

    routes.map((route: { id: string; coordinates: [number, number][] }) => {
      map.addSource(route.id, {
        type: "geojson",
        data: {
          type: "Feature",
          properties: {},
          geometry: {
            type: "LineString",
            coordinates: route.coordinates,
          },
        },
      });
      map.addLayer({
        id: route.id,
        type: "line",
        source: route.id,
        layout: {
          "line-join": "round",
          "line-cap": "round",
        },
        paint: {
          "line-color": "#ffffff",
          "line-width": 8,
        },
      });
      routeSources.push(route.id);
    });

    setMarkers(markers);
    setRoutes(routeSources);
  }, [map, requestData]);

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
    if (!map || !loaded) return;

    const mapStyle = map.getStyle();

    mapStyle.layers.forEach(function (layer) {
      if (layer.type === "symbol" || layer.type === "line") {
        map.setLayoutProperty(
          layer.id,
          "visibility",
          active ? "visible" : "none"
        );
      }
    });
  }, [active, map, loaded]);

  useEffect(() => {
    if (!map) return;
    if (active) {
      setShouldSpin(false);

      map.flyTo({
        zoom: 2,
        speed: 0.1,
      });
      // map.once("moveend", () => {
      //   setShouldSpin(true);
      // });
    } else {
      setShouldSpin(false);
      map.flyTo({
        zoom: 1.5,
        speed: 0.1,
      });

      map.once("moveend", () => {
        setShouldSpin(true);
      });
    }
  }, [active, map]);

  useEffect(() => {
    if (!shouldSpin) return;
    function spinGlobe() {
      if (!map) {
        return;
      }
      const secondsPerRevolution = 120;
      // Above zoom level 5, do not rotate.
      const maxSpinZoom = 5;
      // Rotate at intermediate speeds between zoom levels 3 and 5.
      const slowSpinZoom = 3;

      let spinEnabled = true;

      // spin globe
      const zoom = map.getZoom();
      if (spinEnabled && zoom < maxSpinZoom) {
        let distancePerSecond = 360 / secondsPerRevolution;
        if (zoom > slowSpinZoom) {
          // Slow spinning at higher zooms
          const zoomDif = (maxSpinZoom - zoom) / (maxSpinZoom - slowSpinZoom);
          distancePerSecond *= zoomDif;
        }
        const center = map.getCenter();
        center.lng -= distancePerSecond;
        // Smoothly animate the map over one second.
        // When this animation is complete, it calls a 'moveend' event.
        map.easeTo({ center, duration: 1000, easing: (n) => n });
      }
    }
    const spinInterval = setInterval(() => {
      spinGlobe();
    }, 1000);

    return () => {
      clearInterval(spinInterval);
    };
  }, [map, shouldSpin]);

  const reset = useCallback(() => {
    setActive(false);
    setError(undefined);
    setMessages([]);
    clear();
  }, [clear]);

  useEffect(() => {
    // on escape key press
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        reset();
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [reset]);

  return (
    <GlobeContext.Provider
      value={{
        setMap,
        map,
        loaded,
        active,
        setActive,
        fetching: requestLoading,
        onSubmit,
        error,
        reset,
        messages,
      }}
    >
      {children}
    </GlobeContext.Provider>
  );
};

export const useGlobe = () => useContext(GlobeContext);

export default GlobeContext;
