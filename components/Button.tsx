import React from "react";
import clsx from "clsx";

interface ButtonProps {
  type: "submit" | "button" | "reset" | undefined;
  fullWidth?: boolean;
  children?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  type,
  fullWidth,
  children,
  onClick,
  disabled,
}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={clsx(
        `flex justify-center rounded-xl px-3 py-2 font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 bg-indigo-600 text-white`,
        disabled && "opacity-50 cursor-default",
        fullWidth && "w-full"
      )}
    >
      {children}
    </button>
  );
};

export default Button;
