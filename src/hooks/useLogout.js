import { useAuthContext } from './useAuthContext'
import { useFormContext } from './useFormsContext'
export const useLogout = ()=>{
  const  { dispatch } = useAuthContext()
  const {dispatch: formsDispatch} = useFormContext()

  const logout = ()=>{
    localStorage.removeItem('user')

    dispatch({type: 'LOGOUT'})
    formsDispatch({type: 'SET_FORMS', payload: null})
  }
  return {logout}
}