import { Button } from "./Buttons";
import { useRef, useState } from "react";

export function Otp({ number }) {
    const ref = useRef(Array(number).fill(0));
    const [disabled, setDisabled] = useState(true);

    return (
        <div className="flex flex-col items-center">
            <div className="flex sm:flex-row flex-wrap">
                {Array(number).fill(1).map((_, index) => (
                    <SubOtpBox
                        reference={(e) => (ref.current[index] = e)}
                        key={index}
                        onDone={() => {
                            if (index + 1 < number) {
                                ref.current[index + 1].focus();
                            }
                        }}
                        goBack={() => {
                            if (index > 0) {
                                ref.current[index - 1].focus();
                            }
                        }}
                    />
                ))}
            </div>
            <br />
            <Button 
                className="justify-center" 
                disabled={disabled} 
                onClick={() => {
                    // Handle signup logic here
                    console.log("Sign up clicked");
                    setDisabled(true);
                }}
            >
                Sign up
            </Button>
        </div>
    );
}

function SubOtpBox({ reference, onDone, goBack }) {
    const [inputBoxVal, setInputBoxVal] = useState("");

    return (
        <div>
            <input
                value={inputBoxVal}
                ref={reference}
                onKeyUp={(e) => {
                    if (e.key === "Backspace") {
                        if (inputBoxVal === "") {
                            goBack();
                        } else {
                            setInputBoxVal("");
                        }
                    }
                }}
                onChange={(e) => {
                    const val = e.target.value;

                    if (/^\d$/.test(val)) { 
                        setInputBoxVal(val);
                        onDone();
                    } else {
                        setInputBoxVal(val === "" ? "" : val.slice(0, 1)); 
                    }
                }}
                type="text"
                className="m-1 w-[40px] h-[50px] rounded-xl bg-blue-500 outline-none px-4 text-white"
            />
        </div>
    );
}