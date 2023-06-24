"use client";
import { LazyMotion, domMax } from "framer-motion";

export const AnimationProvider = ({ children }:{
    children: React.ReactNode;
}) => (
  <LazyMotion features={domMax}>{children}</LazyMotion>
);
