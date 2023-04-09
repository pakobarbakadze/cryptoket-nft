import { useState, useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import Image from "next/image";

import CreatorCard from "./CreatorCard";
import images from "../assets";

const TopSellers = () => {
  const { theme } = useTheme();
  const parentRef = useRef<any>(null);
  const scrollRef = useRef<any>(null);
  const [hideButtons, setHideButtons] = useState(false);

  const handleScroll = (direction: string) => {
    const { current } = scrollRef;

    const scrollAmount = window.innerWidth > 1800 ? 270 : 210;

    if (direction === "left") {
      current.scrollLeft -= scrollAmount;
    } else {
      current.scrollLeft += scrollAmount;
    }
  };

  const isScrollable = () => {
    const { current } = scrollRef;
    const { current: parent } = parentRef;

    if (current?.scrollWidth >= parent?.offsetWidth) {
      setHideButtons(false);
    } else {
      setHideButtons(true);
    }
  };

  useEffect(() => {
    isScrollable();
    window.addEventListener("resize", isScrollable);
    return () => {
      window.removeEventListener("resize", isScrollable);
    };
  }, []);
  return (
    <>
      <h1 className="font-poppins dark:text-white text-nft-black-1 text-2xl minlg:text-4xl font-semibold ml-4 xs:ml-0">
        Top Sellers
      </h1>
      <div ref={parentRef} className="relative flex-1 max-w-full flex mt-3">
        <div
          ref={scrollRef}
          className="flex flex-row w-max overflow-x-scroll no-scrollbar select-none"
        >
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
            <CreatorCard
              key={`creator-${i}`}
              rank={i + 1}
              creatorImg={images[`creator${i}` as keyof typeof images]}
              creatorName={`0x${i}`}
              creatorEths={10 - i * 0.5}
            />
          ))}

          {!hideButtons && (
            <>
              <div
                onClick={() => handleScroll("left")}
                className="absolute w-8 h-8 minlg:w-12 minlg:h-12 top-45 left-0 cursor-pointer"
              >
                <Image
                  src={images.left}
                  style={{ objectFit: "contain" }}
                  fill
                  alt="leftArrow"
                  className={theme === "light" ? "filter invert" : ""}
                />
              </div>
              <div
                onClick={() => handleScroll("right")}
                className="absolute w-8 h-8 minlg:w-12 minlg:h-12 top-45 right-0 cursor-pointer"
              >
                <Image
                  src={images.right}
                  style={{ objectFit: "contain" }}
                  fill
                  alt="leftArrow"
                  className={theme === "light" ? "filter invert" : ""}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default TopSellers;
