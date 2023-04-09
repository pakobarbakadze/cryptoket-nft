import Button from "../Button";

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
  //   const { connectWallet, currentAccount } = useContext(NFTContext);
  const currentAccount = false;

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
      //   handleClick={connectWallet}
      handleClick={() => {}}
    />
  );
};

export default ButtonGroup;
