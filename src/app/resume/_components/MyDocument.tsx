import { Div } from "@/app/resume/_components/Div";
import { Column, Row } from "@/app/resume/_components/Flex";
import {
  Mail,
  Phone,
  House,
  StarBullet,
  Diamond,
  Briefcase,
  Circle,
  Website,
} from "@/app/resume/_components/_icons/Icons";
import { resumeInfoProjectWorkflowAnalyst as resumeInfo } from "@/app/resume/_lib/resume-info";
import { PDFDocumentProvider } from "@/app/resume/_providers/PDFDocumentProvider";
import { Font, Document, Page, Image, View, Link } from "@react-pdf/renderer";
import { relative } from "path";
import { ComponentProps, ReactNode } from "react";

/* Font.register({
  family: "Roboto",
  src: "https://fonts.gstatic.com/s/roboto/v29/KFOmCnqEu92Fr1Mu4mxP.ttf",
}); */

Font.register({
  family: "Montserrat",
  src: "http://fonts.gstatic.com/s/montserrat/v10/zhcz-_WihjSQC0oHJ9TCYC3USBnSvpkopQaUR-2r7iU.ttf",
});

Font.registerHyphenationCallback((word) => [word]);

const padding = 20;
const footerHeight = 15;
const fontSize = 12;
const fontFamily = "Montserrat";
const color = "#685D5D";

export const MyDocument = () => {
  const sideRatio = 30;

  return (
    <PDFDocumentProvider
      fontFamily={fontFamily}
      fontSize={fontSize}
      debug={false}
    >
      <Document title={`${resumeInfo.name} - Resume`}>
        <Page
          size="A4"
          style={{
            fontSize,
            fontFamily,
            color,
          }}
        >
          <Row style={{ height: "100vh" }}>
            <Column
              style={{
                width: `${sideRatio}%`,
                height: "95%",
                borderRight: `2px solid #E5E5E5`,
                alignSelf: "center",
              }}
            >
              <Row style={{ position: "absolute", right: -11.5, top: -3 }}>
                <Diamond />
              </Row>
              <Row style={{ position: "absolute", right: -11.5, bottom: -6 }}>
                <Diamond />
              </Row>
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
                  gap: 4,
                  justifyContent: "center",
                }}
              >
                <ContactRow
                  Icon={<Phone />}
                  text={resumeInfo.phoneNumber}
                />
                <ContactRow
                  Icon={<Mail />}
                  text={resumeInfo.emailAddress}
                />
                <ContactRow
                  Icon={<House />}
                  text={resumeInfo.location}
                />
                <ContactRow
                  Icon={<Website />}
                  link={resumeInfo.website}
                  text={resumeInfo.website.substring(8)}
                />
                <ContactRow
                  Icon={
                    <Image
                      style={{
                        height: 16,
                        width: 16,
                        position: "relative",
                        left: 1,
                      }}
                      src="/linkedin.png"
                    />
                  }
                  link={resumeInfo.linkedin}
                  text={resumeInfo.linkedin.substring(8)}
                />
              </Column>
              {/* Summary of Qualifications */}
              <Column
                style={{
                  gap: 10,
                  justifyContent: "center",
                  marginTop: 5,
                  paddingHorizontal: 10,
                }}
              >
                <Header
                  style={{
                    borderBottom: `1px solid ${color}`,
                    paddingBottom: 5,
                  }}
                >{`SUMMARY OF\nQUALIFICATIONS`}</Header>
                {resumeInfo.summary.map((item) => (
                  <QualificationsRow
                    text={item}
                    key={item.substring(10)}
                  />
                ))}
              </Column>
              <Column
                style={{
                  gap: 10,
                  justifyContent: "center",
                  marginTop: 5,
                  paddingHorizontal: 10,
                }}
              >
                <Header
                  style={{
                    borderBottom: `1px solid ${color}`,
                    paddingBottom: 5,
                  }}
                >{`EDUCATION`}</Header>
                <Column
                  style={{
                    fontSize: 9,
                    textAlign: "center",
                    gap: 4,
                    color: "black",
                  }}
                >
                  <Div>{resumeInfo.education.school}</Div>
                  <Div style={{ color }}>{resumeInfo.education.degree}</Div>
                  <Div style={{ color }}>{resumeInfo.education.year}</Div>
                  <Div style={{ color }}>{resumeInfo.education.summary[0]}</Div>
                  <Column
                    gap={5}
                    style={{ marginTop: 7, textAlign: "left" }}
                  >
                    <BulletedList text={resumeInfo.education.summary[1]} />
                    <BulletedList text={resumeInfo.education.summary[2]} />
                    <BulletedList text={resumeInfo.education.summary[3]} />
                  </Column>
                </Column>
              </Column>
            </Column>
            {/* Main */}
            <Column
              style={{
                width: `${100 - sideRatio}%`,
                paddingHorizontal: 20,
                paddingRight: 50,
                marginTop: 40,
              }}
            >
              {/* Name & Title */}
              <Column
                gap={5}
                style={{ fontSize: 14 }}
              >
                <Div
                  style={{
                    color: "black",
                    textTransform: "uppercase",
                    fontWeight: "bold",
                  }}
                >{`${resumeInfo.name}, ${resumeInfo.title}`}</Div>
                <Div style={{ fontSize: 11 }}>
                  {resumeInfo.mainRole
                    .map((item) => item.toUpperCase())
                    .join(" | ")}
                </Div>
              </Column>
              {/* WorkExperiences */}
              <Column style={{ marginTop: 5 }}>
                <Header style={{ textAlign: "left", marginVertical: 3 }}>
                  WORK EXPERIENCE
                </Header>
                {resumeInfo.workExperiences.map((item) => {
                  return (
                    <WorkExperience
                      workExperience={item}
                      key={item.companyName}
                    />
                  );
                })}
              </Column>
              {/* Skills Competencies */}
              <Column
                gap={10}
                style={{ marginTop: 5 }}
              >
                <Header style={{ textAlign: "left", marginVertical: 3 }}>
                  Skills / Competencies
                </Header>
                <Row style={{ flexWrap: "wrap", fontSize: 9, gap: 2 }}>
                  {resumeInfo.skills.map((item) => {
                    return (
                      <BulletedList
                        key={item}
                        style={{ flexBasis: "45%" }}
                        text={item}
                      />
                    );
                  })}
                </Row>
              </Column>
            </Column>
          </Row>
        </Page>
      </Document>
    </PDFDocumentProvider>
  );
};

type ContactRowProps = {
  Icon: ReactNode;
  text: string;
  link?: string;
};

const ContactRow = (props: ContactRowProps) => {
  return (
    <Row
      style={{
        gap: 10,
        paddingHorizontal: 10,
        alignItems: "center",
        position: "relative",
      }}
    >
      {props.Icon}
      <Div style={{ width: "90%", fontSize: 9 }}>
        {props.link ? (
          <Link
            src={props.link}
            style={{ textDecoration: "none" }}
          >
            {props.text}
          </Link>
        ) : (
          props.text
        )}
      </Div>
    </Row>
  );
};

type HeaderProps = {
  children: string;
  style?: ComponentProps<typeof View>["style"];
};

const Header = (props: HeaderProps) => {
  const style = props.style || {};
  //@ts-ignore
  const leftAligned = style.textAlign === "left";

  return (
    <Row
      style={{
        textTransform: "uppercase",
        fontSize: 12,
        textAlign: "center",
        color: "black",
        position: "relative",
        alignItems: "center",
        ...style,
      }}
    >
      <Div
        style={{
          zIndex: 1,
          backgroundColor: "white",
          width: leftAligned ? "auto" : "100%",
        }}
      >
        {props.children}
      </Div>
      {!!leftAligned && (
        <Div
          style={{
            height: 1,
            borderBottom: `1px solid ${color}`,
            width: "100%",
            position: "absolute",
            zIndex: 2,
          }}
        >
          {""}
        </Div>
      )}
    </Row>
  );
};

const WorkExperience = (props: {
  workExperience: (typeof resumeInfo)["workExperiences"][number];
}) => {
  return (
    <Row style={{ gap: 10, marginBottom: 7, position: "relative" }}>
      {props.workExperience.icon ? (
        <Image
          style={{
            height: 24,
            width: 26,
            position: "relative",
            top: 8,
            left: 5,
          }}
          src={props.workExperience.icon}
        />
      ) : (
        <Briefcase />
      )}

      <Column
        style={{
          fontSize: 11,
          color: "black",
        }}
      >
        <Div>{props.workExperience.companyName}</Div>
        <Div
          style={{
            fontSize: 9,
          }}
        >
          {props.workExperience.period}
        </Div>
        <Div
          style={{
            fontSize: 9,
            color,
          }}
        >
          {props.workExperience.position}
        </Div>
        <Column style={{ marginTop: 5, gap: 5 }}>
          {props.workExperience.responsibilities.map((item) => {
            return (
              <BulletedList
                text={item}
                key={item}
              />
            );
          })}
        </Column>
      </Column>
    </Row>
  );
};

const QualificationsRow = (props: { text: string }) => {
  return (
    <Row style={{ gap: 10 }}>
      <StarBullet />
      <Div
        style={{
          width: "90%",
          fontSize: 9,
        }}
      >
        {props.text}
      </Div>
    </Row>
  );
};

const BulletedList = (props: {
  text: string;
  style?: ComponentProps<typeof View>["style"];
}) => {
  const style = props.style || {};
  return (
    <Row style={{ position: "relative" }}>
      <Circle />
      <Div
        style={{
          fontSize: 9,
          flexBasis: `85%`,
          marginLeft: 9,
          flexShrink: 0,
          color,
          ...style,
        }}
      >
        {props.text}
      </Div>
    </Row>
  );
};
