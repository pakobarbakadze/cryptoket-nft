import { useState } from "react";
import { useTheme } from "next-themes";
import Link from "next/link";
import Image from "next/image";
import { DarkModeSwitch } from "react-toggle-dark-mode";

import NoSSR from "../NoSSR";

import images from "../../assets";
import ButtonGroup from "./ButtonGroup";
import MenuItems from "./MenuItems";
import { useRouter } from "next/router";

const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const router = useRouter();

  const [isDarkMode, setDarkMode] = useState(theme === "light" ? false : true);
  const [active, setActive] = useState("Explore NFTs");
  const [isOpen, setIsOpen] = useState(false);

  const toggleDarkMode = (checked: boolean) => {
    setDarkMode(checked);
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <nav className="flexBetween w-full fixed z-10 p-4 flex-row border-b dark:bg-nft-dark bg-white dark:border-nft-black-1 border-nft-gray-1">
      <div className="flex flex-1 flex-row justify-start">
        <Link href={"/"}>
          <div className="flexCenter cursor-pointer">
            <Image
              src={images.logo02}
              style={{ objectFit: "contain", width: 32, height: 32 }}
              alt="Logo"
            ></Image>
            <p className="dark:text-white text-nft-black-1 font-semibold text-lg ml-1 md:hidden">
              CryptoKet
            </p>
          </div>
        </Link>
      </div>

      <div className="mr-2">
        <NoSSR>
          <DarkModeSwitch
            checked={isDarkMode}
            onChange={toggleDarkMode}
            size={30}
          />
        </NoSSR>
      </div>

      <div className="flex md:hidden">
        <MenuItems active={active} setActive={setActive} />
        <div className="ml-4">
          <ButtonGroup
            router={router}
            setActive={setActive}
            setIsOpen={setIsOpen}
          />
        </div>
      </div>

      <NoSSR>
        <div className="hidden md:flex ml-2">
          {isOpen ? (
            <Image
              src={images.cross}
              style={{ objectFit: "contain", width: 20, height: 20 }}
              alt="close"
              onClick={() => setIsOpen(false)}
              className={theme === "light" ? "filter invert" : ""}
            />
          ) : (
            <Image
              src={images.menu}
              style={{ objectFit: "contain", width: 25, height: 25 }}
              alt="menu"
              onClick={() => setIsOpen(true)}
              className={theme === "light" ? "filter invert" : ""}
            />
          )}
          {isOpen && (
            <div className="fixed inset-0 top-65 dark:bg-nft-dark bg-white z-10 nav-h flex justify-between flex-col">
              <div className="flex-1 p-4">
                <MenuItems
                  active={active}
                  setActive={setActive}
                  isMobile
                  setIsOpen={setIsOpen}
                />
              </div>
              <div className="p-4 border-t dark:border-nft-black-1 border-nft-gray-1">
                <ButtonGroup
                  router={router}
                  setActive={setActive}
                  setIsOpen={setIsOpen}
                />
              </div>
            </div>
          )}
        </div>
      </NoSSR>
    </nav>
  );
};

export default Navbar;
