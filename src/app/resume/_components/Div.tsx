import { usePDFDocument } from "@/app/resume/_providers/PDFDocumentProvider";
import ReactPDF, {
  Document,
  Page,
  Text,
  View,
  Image,
} from "@react-pdf/renderer";
import { ComponentProps } from "react";
type DivProps = {
  children: typeof Image | string;
  style?: ComponentProps<typeof View>["style"];
  textStyle?: ComponentProps<typeof View>["style"];
  bold?: boolean;
  wrap?: boolean;
  debug?: boolean;
};

export const Div = ({
  children,
  style = {},
  textStyle = {},
  bold,
  debug,
  wrap = true,
}: DivProps) => {
  const { fontFamily, debug: debugContext } = usePDFDocument();
  return (
    <View
      debug={debugContext || debug}
      style={{
        ...style,
        padding: "0 3px",
        fontFamily,
      }}
      wrap={wrap}
    >
      {typeof children === "string" ? (
        <Text style={{ ...textStyle }}>{children}</Text>
      ) : (
        <>{children}</>
      )}
    </View>
  );
};
