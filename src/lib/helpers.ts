import { RefObject } from "react";

export function smoothScroll(ref: RefObject<null | HTMLElement>) {
  setTimeout(() => {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, 1500);
}
