


function PublishInputComponent(props) {
    return (
        <>
            <div className="mb-1">
                <label htmlFor={props.labelFor} className="form-label ">{props.labelContent}</label>
                <input type={props.type} min={props.min} className={` form-control  mb-1 ${props.className}`} name={props.name} aria-describedby={props.aria} value={props.value}
                    onChange={props.changeFunction} placeholder={props.placeholder} disabled={props.disabled}></input>
                <p className="error text-danger m-0 p-0">{props.errorMess}</p>
            </div>
        </>
    )
}
export default PublishInputComponent