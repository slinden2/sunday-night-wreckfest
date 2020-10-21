import React from "react";
import { ISeason, IRaceDetails, IStandingRow, Team, Info } from "../types";
import { Action } from "./reducer";
// import { DefaultTheme, BaseThemeProviderComponent } from "styled-components";

export type State = {
  calendar: ISeason[];
  races: IRaceDetails[];
  standings: IStandingRow[];
  teams: Team[];
  info: Info[];
};

const initialState: State = {
  calendar: [],
  races: [],
  standings: [],
  teams: [],
  info: [],
};

export const StateContext = React.createContext<
  [State, React.Dispatch<Action>]
>([initialState, () => initialState]);

type StateProviderProps = {
  reducer: React.Reducer<State, Action>;
  children: React.ReactNode;
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
