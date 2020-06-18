import React from "react";
import config from "../config";

// A custom hook to update the doc title of the page
export const useDocTitle = (path: string) => {
  React.useEffect(() => {
    document.title = config.getDocTitle(path);
  });
};
