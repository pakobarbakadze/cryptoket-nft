import { useContext } from "react";
import Button from "../Button";
import { NFTContext } from "@/context/NFTContext";

interface ButtonGroupProps {
  setActive: (arg0: string) => void;
  router: any;
  setIsOpen: (arg0: boolean) => void;
}

const ButtonGroup: React.FC<ButtonGroupProps> = ({
  setActive,
  router,
  setIsOpen,
}) => {
  const { connectWallet, currentAccount } = useContext(NFTContext);

  return currentAccount ? (
    <Button
      btnName="Create"
      classStyles="mx-2 rounded-xl"
      handleClick={() => {
        setActive("");
        setIsOpen(false);
        router.push("/create-nft");
      }}
    />
  ) : (
    <Button
      btnName="Connect"
      classStyles="mx-2 rounded-xl"
      handleClick={connectWallet}
    />
  );
};

export default ButtonGroup;
