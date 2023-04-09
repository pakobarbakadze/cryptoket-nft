import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useTheme } from "next-themes";

import images from "../assets";

interface SearchBarProps {
  activeSelect: string;
  setActiveSelect: (arg0: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  activeSelect,
  setActiveSelect,
}) => {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const [toggle, setToggle] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(debouncedSearch);
    }, 1000);

    return () => clearTimeout(timer);
  }, [debouncedSearch]);

  return (
    <>
      <div className="flex-1 flexCenter dark:bg-nft-black-1 bg-white border dark:border-nft-black-2 border-nft-gray-2 px-4 py-3 rounded-md">
        <Image
          src={images.search}
          alt="search"
          style={{ objectFit: "contain", width: 20, height: 20 }}
          className={theme === "light" ? "filter invert" : ""}
        />
        <input
          type="text"
          placeholder="Search NFT"
          className="dark:bg-nft-black-1 bg-white mx-4 w-full dark:text-white text-nft-black-1 outline-none font-normal text-sm md:text-xs"
          value={debouncedSearch}
          onChange={(e) => setDebouncedSearch(e.target.value)}
        />
      </div>
      <div
        onClick={() => setToggle((prevToggle) => !prevToggle)}
        className="relative flexBetween ml-4 sm:ml-0 sm:mt-2 min-w-190 cursor-pointer dark:bg-nft-black-1 bg-white border dark:border-nft-black-2 border-nft-gray-2 px-4 sm:py-3 rounded-md"
      >
        <p className="font-poppins dark:text-white text-nft-black-1 font-normal text-xs">
          {activeSelect}
        </p>
        <Image
          src={images.arrow}
          alt="arrow"
          style={{ objectFit: "contain", width: 15, height: 15 }}
          className={theme === "light" ? "filter invert" : ""}
        />
        {toggle && (
          <div className="absolute top-full left-0 right-0 w-full mt-3 z-10 dark:bg-nft-black-1 bg-white border dark:border-nft-black-2 border-nft-gray-2 px-4 py-3 rounded-md">
            {[
              "Recently added",
              "Price (low to high)",
              "Price (high to low)",
            ].map((item) => (
              <p
                className="font-poppins dark:text-white text-nft-black-1 font-normal text-xs my-3 cursor-pointer"
                onClick={() => setActiveSelect(item)}
                key={item}
              >
                {item}
              </p>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default SearchBar;
