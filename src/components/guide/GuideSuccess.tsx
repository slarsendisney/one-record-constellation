"use client";
import type { ReactNode } from "react";

type GuideSuccessProps = {
  title: string;
  children: ReactNode;
  show?: boolean;
};

export function GuideSuccess({ title, children, show }: GuideSuccessProps) {
  return (
    <div
      className={`flex flex-col gap-6 bg-one-record-blue-100 rounded-md transition-max-height duration-1000 overflow-hidden max-h-0 text-black ${
        show ? "max-h-[50rem] visible p-3" : "invisible"
      }`}
    >
      <b className="font-semibold">{title}</b>
      {children}
    </div>
  );
}
