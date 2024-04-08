import { motion } from "framer-motion";
import Image from "next/image";

export const ScrollSvg = ({ elementID }: { elementID: string }) => {
  const handleClick = () => {
    const nextSection = document.getElementById(elementID);

    if (nextSection) {
      nextSection.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "nearest",
      });
    }
  };

  return (
    <motion.button
      onClick={handleClick}
      initial={{ opacity: 0.2, y: 0 }}
      animate={{ opacity: 1, y: "10px" }}
      transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
    >
      <Image
        src="/scroll-down.png"
        alt=""
        width={100}
        height={100}
        className="dark:invert"
      />
    </motion.button>
  );
};
