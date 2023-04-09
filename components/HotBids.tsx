import { useState } from "react";

import SearchBar from "./SearchBar";
import NFTCard from "./NFTCard";

const HotBids = () => {
  const [activeSelect, setActiveSelect] = useState("Recently added");

  return (
    <div className="mt-10">
      <div className="flexBetween mx-4 sm:mx-0 minlg:mx-8 sm:flex-col sm:items-start">
        <h1 className="flex-1 font-poppins dark:text-white text-nft-black-1 text-2xl minlg:text-4xl font-semibold sm:mb-4">
          Hot NFTs
        </h1>
        <div className="flex-2 sm:w-full flex flex-row sm:flex-col">
          <SearchBar
            activeSelect={activeSelect}
            setActiveSelect={setActiveSelect}
          />
        </div>
      </div>
      <div className="mt-3 w-full flex flex-wrap justify-start md:justify-center">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
          <NFTCard
            key={`nft-${i}`}
            nft={{
              i,
              name: `Nifty NFT ${i}`,
              seller: "Seller",
              owner: "Ownder",
              description: "Cool NFT",
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default HotBids;
