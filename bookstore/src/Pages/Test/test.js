import axios from "axios";
import { useContext, useEffect } from "react";
import useAxios from "../../Network/AxiosInstance";
import { AuthContext } from "../../Context/AuthContext";



function test(){

    let api = useAxios()

    useEffect(() => {
        api.get("/account/authors-all/")
        .then((res)=> console.log(res))
        .catch((err)=> console.log("Error", err))
    }, [])
   
}
export default test
