import { Document, Page, Text, View } from "@react-pdf/renderer";
import { ComponentProps, ReactNode } from "react";

type ViewComponentProps = {
  children?: ReactNode;
  style: ComponentProps<typeof View>["style"];
  bold: boolean;
  wrap: boolean;
  flexDirection: "row" | "column";
  fixed: boolean;
  gap: number;
};

const ViewComponent = ({
  children,
  style = {},
  bold,
  wrap = true,
  flexDirection = "column",
  fixed = false,
  gap,
}: ViewComponentProps) => {
  return (
    <View
      style={{
        fontFamily: bold ? "Courier-Bold" : "Courier",
        display: "flex",
        flexDirection,
        gap,
        ...style,
      }}
      wrap={wrap}
      fixed={fixed}
    >
      {children}
    </View>
  );
};

type FlexProps = {
  children?: ReactNode;
  style?: ComponentProps<typeof View>["style"];
  bold?: boolean;
  wrap?: boolean;
  fixed?: boolean;
  gap?: number;
};

export const Row = ({
  children,
  style = {},
  bold = false,
  wrap = true,
  fixed = false,
  gap = 0,
}: FlexProps) => {
  return (
    <ViewComponent
      style={style}
      bold={bold}
      wrap={wrap}
      flexDirection="row"
      fixed={fixed}
      gap={gap}
    >
      {children}
    </ViewComponent>
  );
};

export const Column = ({
  children,
  style = {},
  bold = false,
  wrap = true,
  fixed = false,
  gap = 0,
}: FlexProps) => {
  return (
    <ViewComponent
      gap={gap}
      style={style}
      bold={bold}
      wrap={wrap}
      flexDirection="column"
      fixed={fixed}
    >
      {children}
    </ViewComponent>
  );
};
