import Link from "next/link";
import Image from "next/image";

import images from "../../assets";

interface LogoProps {
  isNav?: boolean;
}

const Logo: React.FC<LogoProps> = ({ isNav }) => {
  return (
    <div className="flex flex-1 flex-row justify-start">
      <Link href={"/"}>
        <div className="flexCenter cursor-pointer">
          <Image
            src={images.logo02}
            style={{ objectFit: "contain", width: 32, height: 32 }}
            alt="Logo"
          ></Image>
          <p
            className={`dark:text-white text-nft-black-1 font-semibold text-lg ml-1 ${
              isNav ? "md:hidden" : ""
            }`}
          >
            CryptoKet
          </p>
        </div>
      </Link>
    </div>
  );
};

export default Logo;
