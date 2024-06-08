import { Path, Svg } from "@react-pdf/renderer";
import { ReactNode } from "react";

type SVGHolderProps = {
  children: ReactNode;
};

const SVGHolder = ({ children }: SVGHolderProps) => {
  return (
    <Svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
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
