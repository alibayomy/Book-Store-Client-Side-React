import { useContext } from "react"
import { AuthContext } from "../Context/AuthContext"
import { Redirect, Route } from "react-router-dom/cjs/react-router-dom.min"



const PublicRoute = ({childern, ...rest}) => {

    let {user} = useContext(AuthContext)

    return (
        <Route {...rest}>
            {user ? <Redirect to="/"/> : childern}
        </Route>

    )
}
export default PublicRoute