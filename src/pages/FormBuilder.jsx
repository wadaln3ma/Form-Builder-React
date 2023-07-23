import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import { useAuthContext } from "../hooks/useAuthContext"
import Switch from "react-switch"
import { toast } from 'react-toastify';

  

const FormBuilder = ()=> {
  
  const { user } = useAuthContext()
  const { id } = useParams()
  const [titleColor, setTitleColor] = useState("black")
  const [formTitle, setFormTitle] = useState("Untitled")
  const [formData, setFormData] = useState([])
  const [error, setError] = useState(null)
  const [sucess, setSucess] = useState(null)
  const [notifications, setNotifications] = useState(false)

  //fetching form data
  useEffect(()=>{
    const fetchFormData = async ()=>{
    
      const response = await fetch(`http://localhost:5000/api/form/${id}`, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Authorization': `Bearer ${user.token}`
        }
      })
  
      const json = await response.json()
      
      if(response.ok){
        setFormData(json.questions)
        setFormTitle(json.formTitle)
        setTitleColor(json.titleColor)
      }
    }

    fetchFormData()
  },[])

  //Setting form Type
  const setFormType = (e, question)=>{
    const options = question.options
    const newType = e.target.value
    options.map(option =>{
      option.type = newType
    })
    setFormData([...formData])
  }

  //Adding more form options
  const addOptions = (e,index,type,name,length)=>{
    e.preventDefault()

    const option = {
      type,
      id: `ques_${index+1}_option_${length+1}`,
      value: "Untitled",
      name,
    }
    formData[index].options.push(option)

    setFormData([...formData])
  }

  //Deleting option
  const removeOption = (e,index,i)=>{
    formData[index].options.splice(i, 1)
    setFormData([...formData])
  }

  //Adding new Question
  const addQuestion = (e)=>{
    e.preventDefault()

    const newElement = {
      questionId: `question_${formData.length+1}`,
      title: "untitled questions",
      options : [
        {
          type: 'radio',
          id: `ques_${formData.length+1}_option_1`,
          value: 'Untitled',
          name: `question_${formData.length+1}`,
        }
      ],
    }

    setFormData(prevState =>{
      const newState = [...prevState, newElement]
      return newState
    })

  }

  //Deleting a Question
  const deleteQuestion = (e,index)=>{
    e.preventDefault()
    formData.splice(index,1)
    
    setFormData([...formData])
  }

  const setOptionName = (e,index,i)=>{

    formData[index].options[i].value = e.target.value

    setFormData([...formData])
  }

  const setQuestionTitle = (e,index)=>{

    formData[index].title = e.target.value

    setFormData([...formData])
  }

  //Saving Form to the Database
  const saveForm = async(e)=>{
    e.preventDefault()
    setError(null)
    setSucess(null)
    
    if(!user){
      setError("Your not Authorized")
      return
    }
    
    const formToSave = {
      idx: id,
      formTitle,
      titleColor,
      questions: formData
    }

    const response = await fetch('http://localhost:5000/api/form/add',{
      method: 'POST',
      body: JSON.stringify(formToSave),
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    })

    const json = await response.json()

    if(!response.ok){
      setError(json.msg)
      setSucess(null)
    }
    
    if(response.ok){
      setError(null)
      setSucess("Form Saved")
    }
    toast.promise(
      resolveAfter3Sec,
      {
        pending: 'Saving Form',
        success: 'Form saved successfully 👌',
        error: 'Form not saved! 🤯'
      }
  )

  }

  //Drage and Drop
  const handleOnDragEnd = (result) =>{
    if (!result.destination) return
    const items = Array.from(formData)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)
    setFormData(items)
  }

  //Set Border Color
  const changeTitleColor = (e,color)=>{
    e.preventDefault()
    setTitleColor(color)
    setFormData([...formData])
  }

  const resolveAfter3Sec = new Promise(resolve => setTimeout(resolve, 4000));

  return (
    <div className="w-full h-screen flex flex-col items-center justify-between">
      <Navbar />
        <main>
          <section >
            <div>

            <div className="flex text-xs items-center gap-2 mt-8 flex-col">
                <p className="font-bold">Set title Color</p>
                  <div className="flex gap-4">
                  <button className="cursor-pointer bg-red-500 rounded-lg px-4 py-1 text-center text-white" 
                    onClick={(e) => changeTitleColor(e, 'red-500')}>
                    Red
                  </button>
                  <button className="cursor-pointer bg-green-500 rounded-lg mx-8 px-4 py-1 text-center text-white"
                    onClick={(e) => changeTitleColor(e, 'gray-500')}>
                    Gray
                  </button>
                  <button className="cursor-pointer bg-blue-500 rounded-lg px-4 py-1 text-center text-white" 
                    onClick={(e) => changeTitleColor(e, 'blue-500')}>
                    Blue
                  </button>
                  <button className="cursor-pointer bg-black ml-8 rounded-lg px-4 py-1 text-center text-white" 
                    onClick={(e) => changeTitleColor(e, 'black')}>
                    Default
                  </button>
                </div>
              </div>

            <div>
                <input type="text" name="form-title" placeholder="Untitled" 
                      className={`w-[500px] sm:w-[780px] mx-8 mt-4 p-2 mb-4 h-14 focus:outline-none border-t-4 border-violet-900 rounded-md text-4xl text-${titleColor}`}
                      value={formTitle}
                      onChange={e => setFormTitle(e.target.value)}/>
              </div>
              
              <form 
                className={`w-[500px] sm:w-[780px] flex-col items-center justify-center border-2 border-gray-300 rounded-md m-8 p-4`}>
                
              <DragDropContext onDragEnd={handleOnDragEnd}>
                <Droppable droppableId="questions">
                  {(provided)=>(
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                      {formData.map((question,index) =>(
                        <Draggable 
                          key={question.questionId} 
                          draggableId={question.questionId}
                          index={index}>
                          {(provided)=>( 
                    <div
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                      className="border-l-4 border-l-violet-600 border-[1px] border-gray-300 rounded-md p-4 mb-8 shadow-lg" key={index}>

                  <div className="flex justify-between">
                    
                    <div>
                      <input 
                        value={question.title}
                        onChange={e => setQuestionTitle(e,index)}
                        type="text" 
                        name="question_title" 
                        placeholder="untitled"
                        className="flex-1 sm:w-96 mb-4 p-2 bg-gray-200 rounded-md focus:outline-none"/>
                    </div>

                    <div className="flex gap-2">
                    <label htmlFor="question_type" className="p-2">Question Type:</label>
                      <select className="rounded-md px-1 hover:bg-slate-400 cursor-pointer"
                              onChange={e=> setFormType(e,question)}>
                        <option value="radio">Single Choice</option>
                        <option value="checkbox">Multi Choice</option>
                        {/**<option value="text">Paragraph</option>**/}
                      </select>
                    </div>
                  </div>

                          <div 
                            className="flex flex-col p-2">
                            {question.options.map((option,i) =>(  
                                <div key={i}
                                  className="flex gap-2 border-b rounded-md shadow-sm w-96" >
                                  <input
                                    className="cursor-pointer p-2 m-2"
                                    type={option.type} 
                                    value={option.value}
                                    id={option.id}
                                    name={option.name} />
                                  <label htmlFor="html">
                                    <input className="focus:outline-none w-72"
                                      id={option.id}
                                      type="text" value={option.value}
                                      onChange={(e)=> setOptionName(e,index,i)} />
                                    </label>
                                    <span onClick={(e) => removeOption(e,index,i)}
                                      className='material-icons md-18 text-xl cursor-pointer'>
                                        delete
                                  </span>
                                </div>
                                
                              )
                            )}
                          </div>
          
                    <div className="flex justify-between">
                      <button 
                      onClick={(e) => addOptions(e,index,question.options[0].type,question.options[0].name,question.options.length)}>
                        <span className="text-xl fornt-bold">+</span> add more
                      </button>
                      <button
                        className="text-red-700 material-icons md-24 text-3xl" 
                        onClick={(e)=> deleteQuestion(e,index)}>
                          delete
                      </button>
                    </div>
                  </div>
                  )}
                  </Draggable>
                  )
                )}

                {provided.placeholder}

                </div>
               )}
               </Droppable>
             </DragDropContext>

                <button
                  className="text-primary-800 border border-primary-800 rounded-md p-2 hover:text-white hover:bg-primary-800 duration-300" 
                  onClick={addQuestion}>
                    Add Question
                </button>

                <button className="block justify-center mx-auto mt-8 text-white font-bold bg-green-600 px-8 py-2 rounded-md hover:text-green-500 hover:bg-white hover:border border-green-500 duration-300"
                onClick={saveForm}>
                  Save Form
                </button>

                {error && <p className="text-center mt-4 px-8 py-1 text-red-800">{error}</p>}
                {sucess && <p className="text-center mt-4 px-8 py-1 text-green-800">{sucess}</p>}

                <div className="flex flex-col items-center gap-2 m-8">
                  <span>Recive Notifications when someone submits</span>
                  <Switch onChange={e => setNotifications(!notifications)} checked={notifications} />
                </div>
              </form>
            </div>
          </section>
        </main>
      <Footer />
    </div>
  )
}

export default FormBuilder