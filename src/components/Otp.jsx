import { Button } from "./Buttons";
import { useRef, useState } from "react";

// 1, 2, 3, 6, 10
export function Otp({ number }) {
    const ref = useRef(Array(number).fill(0));

    const [disabled, setDisabled] = useState(true);

    return <div className="flex justify-center">
        
        {Array(number).fill(1).map((x, index) => <SubOtpBox reference={(e) => ref.current[index] = e} key={index} onDone={() => {
            console.log(ref)
            console.log(index)

            if (index + 1 >= number) {
                setDisabled(false);
                return
            }
            ref.current[index + 1].focus();
        }} goBack={() => {
            if (index == 0) {
                return
            }
            ref.current[index - 1].focus();
        }} />)}

        <br />
        <Button disabled={disabled}>Sign up</Button>
    </div>
}

function SubOtpBox({
    reference, onDone, goBack
}) {
    const [inputBoxVal, setInputBoxVal] = useState("");
    const validInputs=[0,1,2,3,4,5,6,7,8,9];
    return <div>
        <input value={inputBoxVal} ref={reference} onKeyUp={(e) => {
            console.log("ASCII"+e.key);
            if (e.key == "Backspace") {
                goBack()
                setInputBoxVal("");
            }
            else if(validInputs.includes(Number(e.key))){
                console.log('hi')
                setInputBoxVal(e.key);
                onDone()
            }
        }}  type="text" className="m-1 w-[40px] h-[50px] rounded-xl bg-blue-500 outline-none px-4 text-white"></input>
    </div>
}