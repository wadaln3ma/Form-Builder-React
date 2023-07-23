import { useEffect } from "react"
import { useFormContext } from "../hooks/useFormsContext"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import FormCard from "../components/FormCard"
import { Link } from "react-router-dom"
import uuid from "react-uuid"
import { useAuthContext } from "../hooks/useAuthContext"
import plusIcon from '../assets/plus.png'

const Home = ()=>{
  const {forms, dispatch} = useFormContext()
  const {user} = useAuthContext()
  const id = uuid()

  useEffect(()=>{
    const fetchForms = async ()=>{
        const response = await fetch('http://localhost:5000/api/form/all', {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Authorization': `Bearer ${user.token}`
          }
        })

        const json = await response.json()
        
        if(response.ok){
          dispatch({type: "SET_FORMS", payload: json})
        }
    }

    if(user){
      fetchForms()
    }
  },[user,dispatch])
  
  return(
    <div className="h-screen flex flex-col justify-between">
      <Navbar />
      <section className="flex flex-col flex-1 justify-between items-center">
        <div className="flex-1 m-10">
        <div className="flex items-center justify-center w-52 h-52">
          <Link to={"/form-builder/" + id}>
            <div className="flex flex-col items-center border rounded-lg p-4 shadow-xl">
              <img 
                width={200}
                height={200}
                src={plusIcon} />
                <p className="text-center font-bold text-xl">Add New Form</p>
            </div>
            </Link>
          </div>
        </div>
        <hr className="bg-gray-500 w-full h-[1px] my-10"/>
        <div className="flex flex-col gap-5 flex-1 m-5">
          <h1 className="text-center text-sm font-bold">Your Forms:</h1>
          <div className="flex gap-10 flex-wrap mx-10 mb-10">
            {forms && forms.map((form,i) =>(
              <div key={i}>
                
                  <FormCard formTitle={form.formTitle} formId={form._id}/>
                
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}

export default Home