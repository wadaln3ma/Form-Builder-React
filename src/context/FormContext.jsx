import { createContext, useReducer } from "react";

export const FormContext = createContext()

export const formsReducer = (state, action)=>{
  switch(action.type){
    case 'SET_FORMS' :
      return {
        forms: action.payload
      }
    case 'CREATE_FORM':
      return {
        forms: [action.payload, ...state.forms]
      }
    case 'DELETE_FORM':
      return {
        forms: state.forms.filter(form => form._id != action.payload._id)
      }
    default:
      return state
  }
}

export const FormContextProvider = ({ children }) =>{
  const [state, dispatch] = useReducer(formsReducer, {forms : null})

  return(
    <FormContext.Provider value={{...state, dispatch}}>
      {children}
    </FormContext.Provider>
  )
}