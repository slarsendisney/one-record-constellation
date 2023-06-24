"use client";
import { useEffect, useRef, ReactNode } from "react";

import { smoothScroll } from "@/lib/helpers";
import { useGuide } from ".";

// check-marks
// const StyledCheckmark = styled(IconActionCheckmark)`
//   fill: white;
//   display: block;
//   position: absolute;
//   top: 1rem;
//   left: -3.125rem;
//   z-index: 2;
// `;

type GuideStepProps = {
  children: ReactNode;
  step?: number;
  title: string;
};

export function GuideStep({ children, step, title }: GuideStepProps) {
  const titleRef = useRef<null | HTMLDivElement>(null);

  const {
    state: { currentStep },
  } = useGuide();

  // scroll to step when activated
  useEffect(() => {
    if (step && step > 1 && currentStep === step) {
      smoothScroll(titleRef);
    }
  }, [currentStep, step]);

  return step ? (
    <div
      className="flex flex-col scroll-mt-5 relative"
      ref={titleRef}
      id={title.toLowerCase().replaceAll(" ", "-")}
    >
      <div className="flex pb-6 bg-transparent z-10 before:block before:absolute before:-top-[2.5rem] before:w-full before:h-[2.5rem] before:bg-transparent before:z-20">
        <div
          className={`relative before:block before:absolute before:top-[0.25rem] before:-left-[3.38rem] before:w-[1.5rem] before:h-[1.5rem] before:border-[1px] before:rounded-full before:z-10 before:transition-all before:duration-500 ${
            currentStep > step ? "before:bg-one-record-blue" : "before:bg-white"
          } ${
            currentStep >= step
              ? "before:border-one-record-blue"
              : "before:border-gray-200"
          }`}
        >
          {/* <StyledCheckmark /> */}
        </div>
        <h2
          className={`text-xl py-1 px-2 rounded-sm font-semibold ${
            currentStep >= step
              ? "bg-one-record-blue-100"
              : "bg-gray-200 text-gray-400"
          }`}
        >
          {title}
        </h2>
      </div>
      <div
        className={`overflow-hidden transition-max-height duration-1000 px-1 ${
          currentStep >= step ? "visible max-h-[250rem]" : "invisible max-h-0"
        }`}
      >
        {children}
      </div>
    </div>
  ) : null;
}
