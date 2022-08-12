import { useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useDataContext } from "../context/DataProvider"
import { loginApi } from "../helpers/apiCalls"
import { storeUserInLocalStorage } from "../helpers/localStorage"
import '../styles/Auth.scss';

export const Login = () => {

  // use setUser to place logged in user in state => login
  const { setUser, errors, setErrors } = useDataContext()

  const refEmail = useRef<HTMLInputElement>(null)
  const refPassword = useRef<HTMLInputElement>(null)

  const navigate = useNavigate()

  const onLoginSubmit: React.FormEventHandler<HTMLFormElement>  = async (e) => {
    e.preventDefault()
    console.log("Login at API...")

    const email = refEmail?.current?.value
    const password = refPassword?.current?.value

    if(!email || !password) {
      setErrors("HEYY! Email und Passwort vergessen? Jetzt aber!")
      return
    }

    // LOGIN against API
    const result = await loginApi(email, password)
    console.log(result)

    if(result.error) {      
      return setErrors(result.error)
    }

    // put logged in user into state
    setErrors("") // clear previous errors
    storeUserInLocalStorage(result) // store user info with token in local storage
    setUser(result) // store result (=user) in user state
    navigate("/dashboard") // go to dashboard on successful login
  }

  return (
    <div className="Login">
      <h2>Login</h2>
      <form onSubmit={onLoginSubmit}>
        <div>
          <input
            ref={refEmail}
            type="text"
            defaultValue={"artur@gmail.com"}
            placeholder="Email.."
          />
        </div>
        <div>
          <input ref={refPassword} type="password" placeholder="Password..." />
        </div>
        <button type="submit">Login</button>
      </form>
      <div className="errors">{errors}</div>
    </div>
  )
}
