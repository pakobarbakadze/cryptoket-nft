import Image from "next/image";
import Link from "next/link";

import images from "../assets";

import { NFT } from "@/types";

interface NFTCard {
  nft: NFT;
  onProfilePage?: boolean;
}

const NFTCard: React.FC<NFTCard> = ({ nft, onProfilePage }) => {
  const query: any = nft;

  return (
    <Link href={{ pathname: "/nft-details", query: query }}>
      <div className="flex-1 min-w-215 max-w-max xs:max-w-none sm:w-full sm:min-w-155 minmd:min-w-256 minlg:min-w-327 dark:bg-nft-black-3 bg-white rounded-2xl p-4 m-4 minlg:m-8 sm:m-2 cursor-pointer shadow-md">
        <div className="relative w-full h-52 sm:h-36 minmd:h-60 minlg:h-300 rounded-2xl overflow-hidden">
          <Image
            src={nft.image || images[`nft${nft.i}` as keyof typeof images]}
            style={{ objectFit: "cover" }}
            fill
            sizes="auto"
            alt={`nft${nft.i}`}
          />
        </div>
        <div className="mt-3 flex flex-col">
          <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-sm minlg:text-xl">
            {nft.name}
          </p>
          <div className="flexBetween mt-1 minlg:mt-3 flex-row xs:flex-col xs:items-start xs:mt-3">
            <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-xs minlg:text-lg">
              {nft.price} <span className="normal"></span>
            </p>
            <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-xs minlg:text-lg">
              hehe
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default NFTCard;
