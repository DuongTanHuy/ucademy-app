import { Manrope, Roboto } from "next/font/google";
import localFont from "next/font/local";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-manrope",
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-roboto",
});

const sf_mono = localFont({
  src: [
    {
      path: "../local-fonts/SFMono-Regular.otf",
      weight: "400",
    },
    {
      path: "../local-fonts/SFMono-Medium.otf",
      weight: "500",
    },
    {
      path: "../local-fonts/SFMono-Bold.otf",
      weight: "700",
    },
  ],
  variable: "--font-sf-mono",
  display: "swap",
});

export { manrope, roboto, sf_mono };
