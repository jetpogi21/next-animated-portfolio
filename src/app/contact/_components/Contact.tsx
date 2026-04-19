"use client";
import { PageTransitionContainer } from "@/components/PageTransitionContainer";
import { motion, useScroll } from "framer-motion";
import { FormEventHandler, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { Label } from "@/components/ui/Label";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { Loader2 } from "lucide-react";

type ContactProps = {};

const Greetings = () => {
  const text = "Hello World!";
  return (
    <div className="flex items-center justify-center text-6xl flex-1" style={{ color: "var(--color-accent)" }}>
      <div>
        {text.split("").map((letter, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: index * 0.1,
            }}
          >
            {letter}
          </motion.span>
        ))}
        😊
      </div>
    </div>
  );
};

const getButtonCaption = (
  success: boolean,
  error: boolean,
  loading: boolean
) => {
  if (loading) {
    return <Loader2 className="size-4" />;
  }
  if (error) {
    return "something went wrong!";
  }
  return success ? "message sent" : "send";
};

const ContactForm = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const form = useRef(null);

  const buttonCaption = getButtonCaption(success, error, loading);

  const sendEmail: FormEventHandler = async (e) => {
    e.preventDefault();
    console.log("form is current");

    if (!form.current) return;

    setLoading(true); // Start loading

    try {
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_KEY;
      if (!publicKey) {
        throw new Error("EmailJS public key is missing");
      }
      const serviceID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
      if (!serviceID) {
        throw new Error("EmailJS service ID is missing");
      }
      const templateID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
      if (!templateID) {
        throw new Error("EmailJS template ID is missing");
      }
      emailjs
        .sendForm(serviceID, templateID, form.current, {
          publicKey,
        })
        .then(() => {
          setSuccess(true);
        })
        .catch((error) => {
          console.error("Failed to send email:", error);
          setError(true);
        });
    } catch (error) {
      console.error("Error in sending email:", error);
      setError(true);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  //contact_number hidden
  //user_name text
  //user_email text
  //message textarea

  return (
    <form
      onSubmit={sendEmail}
      ref={form}
      className="flex-1 rounded-xl text-xl flex flex-col gap-8 justify-center"
    >
      <input
        type="hidden"
        name="contact_number"
        value="1"
      />
      <div className="flex flex-col gap-2">
        <Label htmlFor="user_name" style={{ color: "var(--color-text-on-dark-muted)", fontFamily: "var(--font-karla)" }}>Your Name</Label>
        <Input
          required
          type="text"
          name="user_name"
          id="user_name"
          placeholder="Your Name"
          className="focus:ring-[#d4956a] focus:border-[#d4956a]"
          style={{ backgroundColor: "var(--color-hero-bg-deep)", color: "var(--color-text-on-dark)", borderColor: "var(--color-border)" }}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="user_email" style={{ color: "var(--color-text-on-dark-muted)", fontFamily: "var(--font-karla)" }}>Your Email</Label>
        <Input
          required
          type="text"
          name="user_email"
          id="user_email"
          placeholder="Your Email"
          className="focus:ring-[#d4956a] focus:border-[#d4956a]"
          style={{ backgroundColor: "var(--color-hero-bg-deep)", color: "var(--color-text-on-dark)", borderColor: "var(--color-border)" }}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="message" style={{ color: "var(--color-text-on-dark-muted)", fontFamily: "var(--font-karla)" }}>Your Message</Label>
        <Textarea
          required
          rows={6}
          name="message"
          id="message"
          placeholder="Your Message"
          className="focus:ring-[#d4956a] focus:border-[#d4956a]"
          style={{ backgroundColor: "var(--color-hero-bg-deep)", color: "var(--color-text-on-dark)", borderColor: "var(--color-border)" }}
        />
      </div>
      <Button
        type="submit"
        className="capitalize"
        style={{ backgroundColor: "var(--color-accent)", color: "var(--color-hero-bg)" }}
      >
        {buttonCaption}
      </Button>
    </form>
  );
};

export const Contact = () => {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({ container: containerRef });

  return (
    <PageTransitionContainer>
      {/* Main container */}
      <div
        className="flex w-full justify-center gap-2 scrollbar-thumb-rounded-sm scrollbar-track-rounded-sm  scrollbar-thumb-slate-400 scrollbar-track-transparent scrollbar-thin pb-8"
        ref={containerRef}
        style={{ backgroundColor: "var(--color-body-bg)" }}
      >
        <Card className="w-full sm:max-w-md mx-auto" style={{ backgroundColor: "var(--color-hero-bg)" }}>
          <CardHeader className="text-3xl mb-4" style={{ color: "var(--color-text-on-dark)" }}>Contact Me</CardHeader>
          <CardContent>
            <ContactForm />
          </CardContent>
        </Card>
      </div>
    </PageTransitionContainer>
  );
};
