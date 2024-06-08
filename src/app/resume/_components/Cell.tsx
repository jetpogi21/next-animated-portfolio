import { Div } from "@/app/resume/_components/Div";
import { Document, Page, Text, View } from "@react-pdf/renderer";
import { ComponentProps } from "react";
type CellProps = {
  value: string;
  width: number;
  alignment?: "left" | "right" | "center";
  style?: ComponentProps<typeof View>["style"];
  bold?: boolean;
};

export const Cell = ({
  value,
  width = 20,
  alignment,
  style = {},
  bold = false,
}: CellProps) => {
  return (
    <Div
      bold={bold}
      style={{
        width: `${width}px`,
        border: "0.5px solid lightgray",
        textAlign: alignment,
        height: "12px",
        ...style,
      }}
    >
      {value}
    </Div>
  );
};
