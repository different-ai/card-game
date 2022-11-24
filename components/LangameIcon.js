import Image from "next/image";
import { classNames } from "../components/Input";

export const LangameIcon = ({ className = "" }) => {
  return (
    <Image
      className={classNames(className)}
      src="/langame.png"
      alt="langame"
      width="48"
      height="48" />
  );
};
