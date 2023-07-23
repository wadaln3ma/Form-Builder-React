import builderImage from '../assets/builder.svg'
import { useAuthContext } from '../hooks/useAuthContext'
import { useFormContext } from '../hooks/useFormsContext'
import { Link } from "react-router-dom"

const FormCard = ({formTitle, formId})=> {
  const { user } = useAuthContext()
  const { dispatch } = useFormContext()

  const deleteForm = async ()=>{
    const url = `http://localhost:5000/api/form/${formId}`
    
    const response = await fetch(url ,{
      method: 'DELETE',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    })

    const json = await response.json()

    if(response.ok){
      dispatch({type: "DELETE_FORM", payload: json})
    }
  }

  return (
    <div className='relative p-3 border rounded-md shadow-xl'>
      <Link to={"/form-builder/" + formId}>
        <img src={builderImage}
            width={300}
            height={200}
            className='' />
      </Link>
      <span onClick={deleteForm}
        className='absolute cursor-pointer right-2 bottom-2 material-icons md-24'>
          delete
      </span>
      
        <p className='text-center p-2 font-bold'>{formTitle}</p>
      
    </div>
  )
}

export default FormCard