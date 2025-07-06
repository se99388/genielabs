import React from "react";

type Props = {
  onClick: () => void;
  disabled: boolean;
};

const GenerateButton = ({ onClick, disabled }: Props) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-6 py-2 text-lg text-white bg-blue-500 rounded hover:bg-blue-600 disabled:bg-blue-300 cursor-pointer`}
    >
      Generate Image
    </button>
  );
};

export default GenerateButton;
