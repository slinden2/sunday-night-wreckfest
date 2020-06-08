import React from "react";
import config from "../config";

export const useDocTitle = (path: string) => {
  React.useEffect(() => {
    document.title = config.getDocTitle(path);
  });
};
