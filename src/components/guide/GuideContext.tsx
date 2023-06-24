"use client";
import {
  useReducer,
  createContext,
  ReactNode,
  useContext,
  Dispatch,
} from "react";

type State<T> = {
  currentStep: number;
  stepCount: number;
  data: T;
};

type Action =
  | {
      type: "UPDATE_CURRENT_STEP";
      payload: State<unknown>["currentStep"];
    }
  | {
      type: "UPDATE_DATA";
      payload: State<unknown>["data"];
    };

type Value<T> = {
  state: State<T>;
  dispatch: Dispatch<Action>;
};

type GuideContextProviderProps = {
  children: ReactNode;
  stepCount: number;
  data?: { [key: string]: unknown };
};

const reducer = (state: State<unknown>, action: Action) => {
  switch (action.type) {
    case "UPDATE_CURRENT_STEP":
      return {
        ...state,
        currentStep: action.payload,
      };
    case "UPDATE_DATA":
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
};

const Context = createContext<Value<unknown> | null>(null);
Context.displayName = "Guide";

export function GuideContextProvider({
  children,
  stepCount,
  data = {},
}: GuideContextProviderProps) {
  const [state, dispatch] = useReducer(reducer, {
    currentStep: stepCount > 0 ? 1 : 0,
    stepCount,
    data,
  });

  const value = { state, dispatch };
  return <Context.Provider value={value}>{children}</Context.Provider>;
}

/**
 * Read and set a Guide's state.
 * @returns A Guide's context value.
 */
export function useGuide<T>() {
  const context = useContext(Context);
  if (process.env.NODE_ENV === "development" && context === null) {
    throw new Error("useGuide must be used within a GuideContextProvider");
  }
  return context as Value<T>;
}
