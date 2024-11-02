import React, { useRef, useState } from "react";
import { Button } from "./Buttons";

const Otp = ({ number }) => {
  const inputsRef = useRef([]);
  const [disable, setDisable] = useState(false);
  const [inputValue, setInputValue] = useState(Array(number).fill(""));
  const handleChange = (e, index) => {
    const { value } = e.target;

    if (!/^[0-9]$/.test(value) && value) {
      return;
    }
    const newValue = [...inputValue];
    newValue[index] = value;
    setInputValue(newValue);
    if (value && index < number - 1) {
      inputsRef.current[index + 1].focus();
    }
    setDisable(newValue.every((val) => val !== ""));
  };
  const handleBackspace = (e, index) => {
    if (e.key === "Tab") {
      e.preventDefault();
      return;
    }
    if (e.key === "Backspace" && index > 0 && !e.target.value) {
      inputsRef.current[index - 1].focus();
    }
    setDisable(inputValue.every((val) => val !== ""));
  };
  const handleCopyPaste = (e, index) => {
    e.preventDefault();
    const copiedOtp = e.clipboardData.getData("text");
    if (!/^[0-9]+$/.test(copiedOtp)) {
      return;
    }
    const newValue = [...inputValue];
    let idx = 0;
    for (let eachNumber of copiedOtp) {
      const targetIndex = index + idx;
      if (targetIndex < number) {
        newValue[targetIndex] = eachNumber;
        setInputValue(newValue);
        idx++;
        if (targetIndex < number - 1) {
          inputsRef.current[targetIndex + 1].focus();
          setDisable(true);
        }
      }
    }
    setDisable(newValue.every((val) => val !== ""));
  };
  return (
    <>
      <div className="flex justify-center gap-3 mt-10">
        {Array(number)
          .fill(0)
          .map((item, index) => (
            <input
              ref={(each) => {
                inputsRef.current[index] = each;
              }}
              type="text"
              maxLength={1}
              value={inputValue[index]}
              className="w-[40px] h-[50px] rounded-md outline-none text-white text-center bg-slate-600 text-2xl focus:outline-none font-extrabold focus:ring-2 focus:ring-blue-500"
              key={index}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleBackspace(e, index)}
              onPaste={(e) => handleCopyPaste(e, index)}
              pattern="[0-9]*"
            />
          ))}
      </div>
      <Button disabled={disable}>Sign in</Button>
    </>
  );
};

export default Otp;
