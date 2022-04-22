import "styled-components";

declare module "styled-components" {
    export interface DefaultTheme {
        main: string;
        logo: {
            bk: string;
            brown: string;
            yellow: string;
            pink: string;
        },
        dark: {
            darker: string;
            lighter: string;
        },
        light: {
          lighter: string;
          darker: string;
        },
    }
}