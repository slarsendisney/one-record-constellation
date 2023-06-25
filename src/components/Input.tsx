"use client";
import { ChangeEvent } from "react";

type Props = {
  id?: string;
  type?: string;
  value: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  readOnly?: boolean;
};

export function Input(props: Props) {
  return (
    <input
      className="border-2 rounded-md p-2 text-sm focus-visible:outline-none text-black"
      readOnly={props.readOnly}
      {...props}
    />
  );
}
