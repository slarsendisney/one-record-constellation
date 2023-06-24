import type { ReactNode } from "react";

type GuideSuccessProps = {
  children: ReactNode;
  show?: boolean;
};

export function Reveal({ children, show }: GuideSuccessProps) {
  return (
    <div
      className={`transition-max-height duration-1000 overflow-hidden max-h-0 ${
        show ? "max-h-[250rem] visible" : "invisible"
      }`}
    >
      {children}
    </div>
  );
}
