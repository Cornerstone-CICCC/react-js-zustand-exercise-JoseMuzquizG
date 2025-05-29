import { useState, type ChangeEvent, type FormEvent } from "react"
import { useUserStore } from "../stores/user.store"
import toast from "react-hot-toast"

const User = () => {

    const { users, addUser, deleteUser } = useUserStore()
    const [fnInput, setFnInput] = useState<string>("")
    const [lnInput, setLnInput] = useState<string>("")
    const [ageInput, setAgeInput] = useState<number>(0)
    const [hobbiesInput, setHobbiesInput] = useState<string[]>([])

    const reset = () => {
        setFnInput("")
        setLnInput("")
        setAgeInput(0)
    }

    const handleDelete = (id: string) => {
        deleteUser(id)
        toast.error("Deleted User")
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        addUser({
            firstname: fnInput,
            lastname: lnInput,
            age: ageInput,
            hobbies: hobbiesInput
        })
        reset()
        toast.success("Added new user!")
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = e.target
        setHobbiesInput(prev => {
            const updatedHobbies = checked ? [...prev, value] :
            prev.filter(hobby => hobby !== value)
            return updatedHobbies
        })
        reset()
    }

  return (
    <div>
        <h1>Users:</h1>
        <form onSubmit={handleSubmit}>
            Add new Employees
            <input type="text" value={fnInput} onChange={e => setFnInput(e.target.value)} placeholder="Enter first name"/>
            <input type="text" value={lnInput} onChange={e => setLnInput(e.target.value)} placeholder="Enter first name"/>
            <input type="number" value={ageInput} onChange={e => setAgeInput(Number(e.target.value))} placeholder="Enter first name"/>
            <div>
                Biking: <input type="checkbox" name="biking" value="biking" checked={hobbiesInput.includes("biking")} onChange={handleChange}/>
                Hiking: <input type="checkbox" name="hiking" value="hiking" checked={hobbiesInput.includes("hiking")} onChange={handleChange}/>
                Swimming: <input type="checkbox" name="swimming" value="swimming" checked={hobbiesInput.includes("swimming")} onChange={handleChange}/>
            </div>
            <button>Add User</button>
        </form>
        <ul>
            {users.map(user => (
                <li key={user.id}>
                    <div>
                        <span>{user.firstname} {user.lastname} - {user.age} years old.</span>
                        <div>Hobbies: {user.hobbies.join(", ")}</div>
                    </div>
                    <button onClick={() => handleDelete(user.id)}>Delete</button>
                </li>
            ))}
        </ul>
    </div>
  )
}

export default User