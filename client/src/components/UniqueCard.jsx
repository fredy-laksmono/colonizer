import { useState,useEffect } from "react"
const UniqueCard = ({unique,updateMothership,mothership}) => {
    const [isSelected, setIsSelected] = useState(false)
    const handleClick = () => {
        updateMothership(unique.id)
    }

    useEffect(() => {
        if (mothership === unique.id) {
            setIsSelected(true)
        } else {
            setIsSelected(false)
        }
    }, [mothership])

    return (<div>
        {isSelected ? 
            <div onClick={handleClick} className="click-able card-small-selected" style={{borderRadius: "1rem",boxShadow: "0px 10px 30px rgba(0,0,0,0.5)"}}>
                <div>{unique.name}</div>
                <div>{unique.description}</div>
            </div> 
            : 
            <div onClick={handleClick} className="click-able card-small" style={{borderRadius: "1rem",boxShadow: "0px 10px 30px rgba(0,0,0,0.5)"}}>
                <div>{unique.name}</div>
                <div>{unique.description}</div>
            </div>}
        
    </div>)
}
export default UniqueCard