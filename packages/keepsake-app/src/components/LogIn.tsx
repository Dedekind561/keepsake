import { useState } from "react"

interface User {
      userID: number,
      username: string,
      password: string,
      id: string
}
interface LogInProps {
    username: string;
    setUsername: React.Dispatch<React.SetStateAction<string>>;
}

export default function LogIn({username, setUsername}: LogInProps){
    
    const [password, setPassword] = useState("")
    const [validated, setValidated] = useState(false)

    async function getUsers(){
        const response = await fetch(`http://localhost:3000/usernames`)
        const data: User[] = await response.json()
        return data
    }

    async function handleSubmit(){
        const users = await getUsers()
        console.log(users)
        let match = false;
        users.map((user) => {
            return (username == user.username && password == user.password) ?  match = true : null
        })
        setValidated(match)
    }

    return <div>
        <h3>Log In</h3>
        {validated ? <p>Welcome, {username}!</p> : <>
        <label htmlFor="username">Username</label>
        <input value={username} type="text" name="username" onChange={(e) => {setUsername(e.target.value)}}/>
        <label htmlFor="password">Password</label>
        <input value={password} type="password" name="password" onChange={(e) => {setPassword(e.target.value)}}/>
        <button onClick={handleSubmit}>Log In</button>
        </>
        }
    </div>
}