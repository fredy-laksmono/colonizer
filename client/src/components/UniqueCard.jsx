const UniqueCard = ({unique,updateMothership}) => {
    const handleClick = () => {
        updateMothership(unique.id)
    }
    return (<div onClick={handleClick} className="click-able">
        <div>{unique.name}</div>
        <div>{unique.description}</div>
    </div>)
}
export default UniqueCard