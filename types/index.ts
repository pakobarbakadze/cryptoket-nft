import { StaticImageData } from "next/image";

export type NFT = {
  id?: number;
  i: number;
  name: string;
  image?: StaticImageData;
  seller: string;
  owner: string;
  price?: number;
  description: string;
};
