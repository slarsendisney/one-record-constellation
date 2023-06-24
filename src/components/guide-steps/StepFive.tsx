"use client";

import Link from "next/link";

export function StepFive() {
  return (
    <div className="flex flex-col gap-6 my-4">
      <Link
        href="/"
        className="rounded-lg bg-one-record-blue-100 p-4 flex justify-between hover:-translate-y-1 transition-all duration-200 shadow-md hover:shadow-lg"
      >
        Query your data
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
          />
        </svg>
      </Link>
      <Link
        href="https://iata-cargo.github.io/ONE-Record/"
        className="rounded-lg bg-one-record-blue-100 p-4 flex justify-between hover:-translate-y-1 transition-all duration-200 shadow-md hover:shadow-lg"
      >
        Read the API specification
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
          />
        </svg>
      </Link>
      <Link
        href="/"
        className="rounded-lg bg-one-record-blue-100 p-4 flex justify-between hover:-translate-y-1 transition-all duration-200 shadow-md hover:shadow-lg"
      >
        Advanced data model
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
          />
        </svg>
      </Link>
    </div>
  );
}
