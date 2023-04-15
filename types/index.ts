import { StaticImageData } from "next/image";

export type NFT = {
  tokenId: string;
  id?: number;
  i: number;
  name: string;
  image?: StaticImageData;
  seller: string;
  owner: string;
  price: number | 0;
  description: string;
};
