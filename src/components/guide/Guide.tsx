"use client";
import { cloneElement, isValidElement, Children, ReactNode } from "react";

import { GuideContextProvider } from "./GuideContext";
import { GuideStep } from "./GuideStep";
import { GuideStepProgress } from "./GuideStepProgress";

type GuideProps = {
  children: ReactNode;
  sidebar?: ReactNode;
};

export function Guide({ children, sidebar }: GuideProps) {
  const steps = Children.toArray(children);

  // ensure child component is a <GuideStep /> component, with a title prop
  steps.forEach((step) => {
    if (
      process.env.NODE_ENV === "development" &&
      isValidElement(step) &&
      (step.type !== GuideStep || !step.props.title)
    ) {
      throw new Error(
        "child component must be a GuideStep component with a title prop"
      );
    }
  });

  // wrap children with progress and inject child index as prop
  return (
    <GuideContextProvider stepCount={steps.length}>
      <div className="flex max-w-[80rem] min-w-[58rem] w-full">
        <div className="flex flex-col w-[58.333%]">
          {steps.map(
            (step, index) =>
              isValidElement(step) && (
                <GuideStepProgress key={index} step={index + 1}>
                  {cloneElement(step, { ...step.props, step: index + 1 })}
                </GuideStepProgress>
              )
          )}
        </div>

        {sidebar}
      </div>
    </GuideContextProvider>
  );
}
