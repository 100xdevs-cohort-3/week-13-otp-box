import { Button } from "./Buttons";
import { useEffect, useRef, useState } from "react";

// 1, 2, 3, 6, 10
export function Otp({ number }) {
    const ref = useRef(Array(number).fill(1));

    const [disabled, setDisabled] = useState(false);
    const [inputValues,setInputvalues]=useState([]);
  
    useEffect(()=>{
        ref.current[0].focus()
    },[])

    useEffect(()=>{
       if(inputValues.length===number){
         setDisabled(true)
       }else{
         setDisabled(false)
       }
    },[inputValues.length])

    return <div className="flex justify-center item-center flex-col">
        <div className="flex">
            {Array(number).fill(1).map((x, index) => <SubOtpBox setInputvalues={setInputvalues} inputValues={inputValues} index={index} reference={(e) => ref.current[index] = e} key={index} 

            onDone={(index,value) => {
                if (index + 1 > number) {
                    return
                }else if(index+1===number){
                    inputValues[index]=value
                    setInputvalues([...inputValues]);
                }else{
                    inputValues[index]=value
                    setInputvalues([...inputValues]);
                    ref.current[index + 1].focus();
                }    
            }} 

            goBack={(index) => {
                if (index <0) {
                    return
                }
                if(inputValues[index]===undefined){
                    ref.current[index - 1].focus();
                }else{
                    inputValues.splice(index,1);
                    setInputvalues(inputValues);
                    ref.current[index - 1].focus();
                }
            }} 
            />)}
        </div>
        <br />
        <div className="mt-[3rem] flex justify-center item-center">
        <Button disabled={disabled}>Sign up</Button>
        </div>
    </div>
}

function SubOtpBox({
    reference, onDone, goBack,inputValues,index
}) {
    
    return <div>
        
        <input maxLength={1} value={inputValues[index]}  ref={reference} 
        
        onKeyUp={(e) => {
            if (e.key == "Backspace") {
                goBack(index)
            }
        }} 
        
        onChange={(event) => {
            
            const val = event.target.value
            if (val == "1" || val == "2" || val == "3" || val == "4" || val == "5" || val == "6" || val == "7" || val == "8" || val  == "9") {
                onDone(index,val)
            }
        }} type="text" className="m-1 w-[40px] h-[50px] rounded-xl bg-blue-500 outline-none px-4 text-white" ></input>
    </div>
}