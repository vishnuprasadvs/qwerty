import React ,{createContext} from 'react'

export const userContext = createContext({
  name:'my name',
  address:'my address'
})
const NewContext = () => {
  return (
    <div>NewContext</div>
  )
}

export default NewContext