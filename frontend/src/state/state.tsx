import React from "react";
import { ISeason, IRaceDetails, IStandingRow } from "../types";
import { Action } from "./reducer";

export type State = {
  calendar: ISeason[];
  races: IRaceDetails[];
  standings: IStandingRow[];
};

const initialState: State = {
  calendar: [],
  races: [],
  standings: [],
};

export const StateContext = React.createContext<
  [State, React.Dispatch<Action>]
>([initialState, () => initialState]);

type StateProviderProps = {
  reducer: React.Reducer<State, Action>;
  children: React.ReactElement;
};

export const StateProvider: React.FC<StateProviderProps> = ({
  reducer,
  children,
}: StateProviderProps) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  return (
    <StateContext.Provider value={[state, dispatch]}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateValue = () => React.useContext(StateContext);
