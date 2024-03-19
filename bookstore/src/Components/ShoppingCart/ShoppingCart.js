import {  Stack, Button } from "react-bootstrap"

export function ShoppingCart(props) {
    return (
        <>
            <Stack direction="horizontal" gap={3} className="d-flex align-items-center py-1">
                <img
                    src={props.imageUrl}
                    className=" rounded-3 "
                    style={{ width: "70px", objectFit: "cover" }}
                />
                <div className="me-auto">
                    <h5>
                        {props.title}
                    </h5>
                    <div className="text-muted" style={{ fontSize: ".75rem" }}>
                        <span className="ms-1 mt-3 fs-5">EGP: {props.price}</span>
                    </div>
                </div>
                <button
                    className="btn btn-sm btn-outline-danger">
                    X
                </button>
            </Stack>
        </>
    )
}