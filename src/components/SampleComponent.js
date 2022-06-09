import React , {useReducer , useState , useContext} from 'react'
import { userContext } from '../credentials/NewContext';
export const ACTIONS ={
  NEW_TODO: 'new-todo',
  TOGGLE_STATUS :'toggle-status',
  DELETE_TODO:'delete-todo'
}

function reducer(todos , action){

  switch (action.type) {
    case ACTIONS.NEW_TODO :
      return[...todos, newTodo(action.payload.name)]
      break;
    case ACTIONS.DELETE_TODO :
      return todos.filter( todo=> todo.id !== action.payload.id)
      break;
      case ACTIONS.TOGGLE_STATUS :
        return todos.map(todo=>{
          if(todo.id == action.payload.id){
            return {...todo, status: !todo.status}
          }else{
            return todo
          }
        })
        break;
        default:
          return todos
}
}

const newTodo =(name)=>{
  return {id:Math.random() * 10 , name: name , status: false}
}
const SampleComponent = () => {
const submitHandler = (e)=>{
  e.preventDefault();
  updateTodos({type: ACTIONS.NEW_TODO , payload:{ name: name } })
  setname('')
}
 const contextvalue = useContext(userContext)
function deleteTodo(iteemid){
  updateTodos({type:ACTIONS.DELETE_TODO , payload: {id: iteemid}})
}
function updateStatus(iteemid){
  updateTodos({type:ACTIONS.TOGGLE_STATUS , payload: {id: iteemid}})
}
  const [todos , updateTodos] = useReducer(reducer ,[{id:'12323', name:'abc123', status : false}] )
  const [name, setname] = useState()
  return (
    <>
    <section className="todos">
      <div className="container">
      <h1 className='center'>To do</h1>
      {/* <h2>{contextvalue.currentValue}</h2> */}
      {
        // console.log(contextvalue._currentValue)
      }
      <form onSubmit={submitHandler}>
        <input type="text" name='bucketitem' value={name} onChange={(e)=>setname(e.target.value)}/>

      </form>
      <ul className="todo_items">
      {
        todos?.map(todo =>{
            return(
              <li key={todo.id} className={todo.status? 'bg-primary ': 'bg-warning'}>
                <span>{todo.name}</span>
                <div className="btn-wrap">
                <button onClick={()=>updateStatus(todo.id)}>Toggle</button>
                <button onClick={()=>deleteTodo(todo.id)}>Delete</button>
                  </div>
  
              </li>
            )
          })
        }
        </ul>
      </div>  
    </section>
    </>
  )
}

export default SampleComponent;