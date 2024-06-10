import { Path, Svg, Circle as CirclePath } from "@react-pdf/renderer";
import { ComponentProps, ReactNode } from "react";

type SVGHolderProps = {
  children: ReactNode;
  width?: string;
  height?: string;
  viewBox?: string;
  style?: ComponentProps<typeof Svg>["style"];
};

type IconProps = {
  fill?: string;
};

const SVGHolder = ({
  children,
  width = "16",
  height = "16",
  viewBox = "0 0 24 24",
  style = {},
}: SVGHolderProps) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox={viewBox}
      style={style}
    >
      {children}
    </Svg>
  );
};

export const Phone = () => {
  return (
    <SVGHolder>
      <Path
        fill="currentColor"
        d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24c1.12.37 2.33.57 3.57.57c.55 0 1 .45 1 1V20c0 .55-.45 1-1 1c-9.39 0-17-7.61-17-17c0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1c0 1.25.2 2.45.57 3.57c.11.35.03.74-.25 1.02z"
      />
    </SVGHolder>
  );
};

export const Mail = () => {
  return (
    <SVGHolder>
      <Path
        fill="currentColor"
        d="M4 20q-.825 0-1.412-.587T2 18V6q0-.825.588-1.412T4 4h16q.825 0 1.413.588T22 6v12q0 .825-.587 1.413T20 20zm8-7l8-5V6l-8 5l-8-5v2z"
      />
    </SVGHolder>
  );
};

export const House = () => {
  return (
    <SVGHolder>
      <Path
        fill="currentColor"
        d="M22 9L12 1L2 9v2h2v10h5v-4a3 3 0 1 1 6 0v4h5V11h2z"
      />
    </SVGHolder>
  );
};

export const StarBullet = () => {
  return (
    <SVGHolder>
      <Path
        fill="#867E7E"
        d="m8.58 17.25l.92-3.89l-3-2.58l3.95-.37L12 6.8l1.55 3.65l3.95.33l-3 2.58l.92 3.89L12 15.19zM12 2a10 10 0 0 1 10 10a10 10 0 0 1-10 10A10 10 0 0 1 2 12A10 10 0 0 1 12 2m0 2a8 8 0 0 0-8 8a8 8 0 0 0 8 8a8 8 0 0 0 8-8a8 8 0 0 0-8-8"
      />
    </SVGHolder>
  );
};

export const Diamond = () => {
  return (
    <SVGHolder>
      <Path
        fill="#E5E5E5"
        d="M6.95.435c.58-.58 1.52-.58 2.1 0l6.515 6.516c.58.58.58 1.519 0 2.098L9.05 15.565c-.58.58-1.519.58-2.098 0L.435 9.05a1.48 1.48 0 0 1 0-2.098z"
      />
    </SVGHolder>
  );
};

export const Briefcase = () => {
  return (
    <SVGHolder
      height="32"
      width="32"
    >
      <Path
        fill="#685D5D"
        d="M20 6h-3V4c0-1.103-.897-2-2-2H9c-1.103 0-2 .897-2 2v2H4c-1.103 0-2 .897-2 2v4h5v-2h2v2h6v-2h2v2h5V8c0-1.103-.897-2-2-2M9 4h6v2H9zm8 11h-2v-2H9v2H7v-2H2v6c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2v-6h-5z"
      />
    </SVGHolder>
  );
};

export const Circle = () => {
  return (
    <SVGHolder style={{ position: "absolute", top: 2, left: 2 }}>
      <CirclePath
        cx="4"
        cy="4"
        r="4"
        fill="#E5E5E5"
      />
    </SVGHolder>
  );
};
