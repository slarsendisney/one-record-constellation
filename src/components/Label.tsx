import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  htmlFor: string;
};

export function Label({ children, htmlFor }: Props) {
  return (
    <label className="font-semibold text-sm" htmlFor={htmlFor}>
      {children}
    </label>
  );
}
