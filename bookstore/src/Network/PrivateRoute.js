import { useContext } from "react"
import { AuthContext } from "../Context/AuthContext"
import { Redirect, Route } from "react-router-dom/cjs/react-router-dom.min"


const PrivateRoute = ({childern, ...rest}) => {

    let {user} = useContext(AuthContext)
    return (
    <Route {...rest}>
        {!user ? <Redirect to="/login"/> : childern}
        {/* {!user ? <Redirect to="/login"/> : user.is_publisher? childern : <Redirect to="/"/>} */}
    </Route>
    )
}

export default PrivateRoute