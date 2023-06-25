"use client";
import type { ReactNode } from "react";

import { useGuide } from ".";

type GuideStepProgressProps = {
  children: ReactNode;
  step: number;
};

export function GuideStepProgress({ children, step }: GuideStepProgressProps) {
  const {
    state: { currentStep },
  } = useGuide();

  return (
    <div
      className={`relative pl-[3.5rem] pb-20 before:block after:block before:absolute after:absolute before:top-[1.5rem] after:top-[1.5rem] before:left-[0.813rem] after:left-[0.813rem] before:w-[0.125rem] after:w-[0.125rem] before:h-full after:h-full before:bg-gray-200 last:before:bg-one-record-dark after:bg-one-record-blue after:overflow-hidden after:transition-max-height after:duration-1000  ${
        currentStep > step ? "after:max-h-full" : "after:max-h-0"
      } last:after:max-h-0`}
    >
      {children}
    </div>
  );
}
