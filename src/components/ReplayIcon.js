import { MdReplay } from "react-icons/md"

export const ReplayIcon = ({replay, setReplay}) => {
    
    return (
        <>
            <MdReplay 
            onClick={setReplay} 
            color={replay ? "darkOrchid" : "white"}
            />
        </>
    )
}


