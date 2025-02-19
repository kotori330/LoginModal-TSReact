import { ChangeEvent, useState } from "react";
import { regexPassword } from "../utils/regex";

type Input = {
  // label: string;
  src: string
  type: string;
  name: string;
  id: string;
  placeholder: string;
  value: string;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  errorMessage: string
};

const Input = ({
  // label,
  src,
  type,
  name,
  id,
  placeholder,
  value,
  handleChange,
  errorMessage
}: Input) => {

  return (
    <>
      <div className="flex my-2 justify-center items-center">
        <img src={src} alt="" className="w-10 " />
        <div className="grid auto-rows-auto">
          <input
            type={type}
            name={name}
            id={id}
            placeholder={placeholder}
            className="rounded-2xl mx-2 p-4 bg-gray-50"
            value={value}
            onChange={handleChange}
          />
          {errorMessage ? (
                    <span className="text-red-600 mx-4">{errorMessage}</span>
                  ) : (
                    <></>
                  )}
        </div>
      </div>
    </>
  );
};

export default Input;
