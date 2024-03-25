import { useContext, useEffect, useState } from "react";
import { Stack, Button } from "react-bootstrap"
import useAxios from "../../Network/AxiosInstance";
import { AuthContext } from "../../Context/AuthContext";
import { useSelector, useDispatch } from "react-redux";

export function Publishers(props) {

    const dispatch = useDispatch();
    let api = useAxios()

    const category = useSelector((state) => state.categoryFilter);

    const Category_filter = (test) => {
        console.log(test);
        dispatch({ type: "PUBLISHER_FILTER", payload: test });
    };

    return (
        <>
            <li class="w-100">
                <div class="form-check">
                    <label
                        class="form-check-label mySmallText"
                        for={props.id} >
                        {props.f_name}{props.l_name}
                    </label>
                    <input
                        class="form-check-input mySmallCheckbox"
                        type="radio"
                        name="flexRadioDefault"
                        id={props.id}
                        onChange={() => Category_filter(props.id)}
                        value={category}
                    />
                </div>
            </li>
        </>
    )
}