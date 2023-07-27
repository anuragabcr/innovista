import { MouseEventHandler } from "react";
import Image from "next/image";

type Props = {
  title: string;
  leftIcon?: string | null;
  rightIcon?: string | null;
  handleclick?: MouseEventHandler;
  isSubmitting?: boolean;
  type?: "button" | "submit";
  bgColor?: string;
  textColor?: string;
};

const Button = ({
  title,
  leftIcon,
  rightIcon,
  handleclick,
  isSubmitting,
  type,
  bgColor,
  textColor,
}: Props) => {
  return (
    <button
      type={type || "button"}
      disabled={isSubmitting}
      className={`flexCenter gap-3 px-4 py-3 ${
        isSubmitting ? "bg-black/50" : bgColor || "bg-primary-purple"
      } rounded-xl text-sm font-medium max-md:w-full ${
        textColor || "text-white"
      }`}
      onClick={handleclick}
    >
      {leftIcon && <Image src={leftIcon} width={14} height={14} alt="left" />}
      {title}
      {rightIcon && (
        <Image src={rightIcon} width={14} height={14} alt="right" />
      )}
    </button>
  );
};

export default Button;
