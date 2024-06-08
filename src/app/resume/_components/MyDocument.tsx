import { Div } from "@/app/resume/_components/Div";
import { Column, Row } from "@/app/resume/_components/Flex";
import { Mail, Phone, House } from "@/app/resume/_components/_icons/Icons";
import { PDFDocumentProvider } from "@/app/resume/_providers/PDFDocumentProvider";
import { Font, Document, Page, Image } from "@react-pdf/renderer";
import { Component, ReactNode } from "react";

Font.register({
  family: "Roboto",
  src: "https://fonts.gstatic.com/s/roboto/v29/KFOmCnqEu92Fr1Mu4mxP.ttf",
});

Font.register({
  family: "Montserrat",
  src: "http://fonts.gstatic.com/s/montserrat/v10/zhcz-_WihjSQC0oHJ9TCYC3USBnSvpkopQaUR-2r7iU.ttf",
});

const padding = 20;
const footerHeight = 15;
const fontSize = 12;
const fontFamily = "Montserrat";

export const MyDocument = () => {
  const sideRatio = 30;

  return (
    <PDFDocumentProvider
      fontFamily={fontFamily}
      fontSize={fontSize}
      debug={true}
    >
      <Document>
        <Page
          size="A4"
          style={{
            fontSize,
            fontFamily,
            color: "#101010",
          }}
        >
          <Row>
            <Column
              style={{
                width: `${sideRatio}%`,
              }}
            >
              {/* Image */}
              <Column
                style={{
                  height: 175,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {/* @ts-ignore */}
                <Image
                  style={{
                    height: 125,
                    width: 125,
                    alignSelf: "center",
                    borderRadius: 10,
                    border: "1px solid gray",
                  }}
                  src="/resume photo.jpg"
                />
              </Column>
              {/* Contact Info */}
              <Column
                style={{
                  backgroundColor: "#e5e5e5",
                  paddingVertical: 10,
                  paddingHorizontal: 10,
                  gap: 10,
                  justifyContent: "center",
                }}
              >
                <ContactRow
                  Icon={<Phone />}
                  text="+63 929 893 5715"
                />
                <ContactRow
                  Icon={<Mail />}
                  text="jet_pradas@yahoo.com"
                />
                <ContactRow
                  Icon={<House />}
                  text="Valenzuela, Philippines"
                />
              </Column>
              {/* Summary of Qualifications */}
              <Column
                style={{
                  gap: 10,
                  justifyContent: "center",
                  marginTop: 10,
                  paddingHorizontal: 10,
                }}
              >
                <Header>{`SUMMARY OF\nQUALIFICATIONS`}</Header>
              </Column>
            </Column>
            <Div style={{ width: `${100 - sideRatio}%` }}>Main</Div>
          </Row>
        </Page>
      </Document>
    </PDFDocumentProvider>
  );
};

type ContactRowProps = {
  Icon: ReactNode;
  text: string;
};

const ContactRow = (props: ContactRowProps) => {
  return (
    <Row style={{ gap: 10, paddingHorizontal: 10, alignItems: "center" }}>
      {props.Icon}
      <Div style={{ width: "90%", fontSize: 9, color: "#685D5D" }}>
        {props.text}
      </Div>
    </Row>
  );
};

type HeaderProps = {
  children: string;
};

const Header = (props: HeaderProps) => {
  return (
    <Div
      style={{ textTransform: "uppercase", fontSize: 12, textAlign: "center" }}
    >
      {props.children}
    </Div>
  );
};
