import { m } from "framer-motion";

export const Links = (): JSX.Element => {
  return (
    <m.div initial={{
        opacity: 0,
        y: -10,
    }} animate={{
        opacity: 1,
        y: 0,
    }} transition={{
        delay: 3.5,
    }} className=" max-w-3xl w-full">
      <div className="w-full opacity-10 border-t-2 pt-4"></div>
      <div className="grid md:grid-cols-2 w-full gap-4">
        <button className="bg-blue-700 hover:bg-blue-800 text-white w-full py-2 rounded">
            Onboarding
        </button>
        <button className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 w-full py-2 rounded">
            API Spec
        </button>
      </div>
    </m.div>
  );
};
