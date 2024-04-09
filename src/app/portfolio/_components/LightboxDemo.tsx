import Lightbox, { SlideImage } from "yet-another-react-lightbox";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import Inline from "yet-another-react-lightbox/plugins/inline";

import image1 from "/public/Backpack Battles/image-1.png";
import image2 from "/public/Backpack Battles/image-2.png";
import image3 from "/public/Backpack Battles/image-3.png";
import image4 from "/public/Backpack Battles/image-4.png";
import { NextJsImage } from "@/components/NextJsImage";
import React from "react";

type LightboxDemoProps = {
  slides: SlideImage[];
};

/* export const LightboxDemo = ({}: LightboxDemoProps) => {
  const [open, setOpen] = React.useState(true);
  return (
    <Lightbox
      open={open}
      close={() => setOpen(false)}
      slides={[image1, image2, image3, image4]}
      //@ts-ignore
      render={{ slide: NextJsImage, thumbnail: NextJsImage }}
      plugins={[Thumbnails]}
    />
  );
}; */

export const LightboxDemo = ({ slides }: LightboxDemoProps) => {
  const [open, setOpen] = React.useState(false);
  const [index, setIndex] = React.useState(0);

  const toggleOpen = (state: boolean) => () => setOpen(state);

  const updateIndex = ({ index: current }: { index: number }) =>
    setIndex(current);

  return (
    <>
      <Lightbox
        index={index}
        slides={slides}
        plugins={[Inline]}
        on={{
          view: updateIndex,
          click: toggleOpen(true),
        }}
        carousel={{
          padding: 0,
          spacing: 0,
          imageFit: "contain",
        }}
        inline={{
          style: {
            width: "100%",
            maxWidth: "900px",
            aspectRatio: "3 / 2",
            margin: "0 auto",
          },
        }}
      />
      <Lightbox
        open={open}
        close={toggleOpen(false)}
        index={index}
        slides={slides}
        on={{ view: updateIndex }}
        animation={{ fade: 0 }}
        controller={{ closeOnPullDown: true, closeOnBackdropClick: true }}
        //@ts-ignore
        render={{ slide: NextJsImage, thumbnail: NextJsImage }}
        plugins={[Thumbnails]}
      />
    </>
  );
};
