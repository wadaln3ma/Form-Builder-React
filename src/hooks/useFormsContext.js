import { useContext } from "react";
import { FormContext } from "../context/FormContext";

export const useFormContext = ()=>{
  const context = useContext(FormContext)
  if(!context){
    throw Error("Form Context must be used inside a Form context provider")
  }
  return context
}