


function PublishButtonComponent(props)
{

    return(
        <div className={`${props.display}`}>
            <button className={`fw-bold  filled-button`} onClick={props.clickFunc} disabled={props.disable}>{props.title}</button>
        </div>
    )
}
export default PublishButtonComponent