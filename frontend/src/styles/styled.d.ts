// import original module declarations
import "styled-components";

// and extend them!
declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      yellow: string;
      cyan: string;
      black: string;
      white: string;
      lightgrey: string;
    };

    media: {
      customMax: (maxWidth: number) => string;
      customMin: (minWidth: number) => string;
      desktop: string;
      tablet: string;
      phone: string;
    };
  }
}

declare module "react" {
  interface Attributes {
    css?: CSSProp | CSSObject;
  }
}
