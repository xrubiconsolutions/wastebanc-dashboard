import React from "react";

const STYLES = [
  "btn--primary--solid",
  "btn--yellow--solid",
  "btn--primary--outline",
  "btn--gray--outline",
  "btn--danger--outline",
  "btn--grey--outline",
];

const SIZES = ["btn--large", "btn--medium", "btn--small"];

const StyledButton = ({
  children,
  type,
  onClick,
  buttonStyle,
  buttonSize,
  buttonWidth,
  disabled,
}) => {
  const checkButtonStyle = STYLES.includes(buttonStyle)
    ? buttonStyle
    : STYLES[0];

  const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0];

  return (
    <button
      className={`btn flex items-center justify-center gap-2 disabled:cursor-not-allowed disabled:bg-gray-200 ${checkButtonStyle} ${checkButtonSize} ${
        checkButtonStyle === "btn--primary--solid"
          ? "transition duration-300 ease-in-out"
          : ""
      }`}
      onClick={onClick}
      type={type}
      disabled={
        disabled &&
        `hover:text-secondary hover:border-2 hover:bg-white hover:border-secondary disabled:cursor-not-allowed disabled:opacity-50  outline-none text-white bg-secondary rounded-lg text-xl py-3 w-full`
      }
    >
      {children}
    </button>
  );
};
export default StyledButton;
