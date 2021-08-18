import { MdReplay } from "react-icons/md"

export const ReplayIcon = ({replay, setReplay}) => {
    

    const activateReplay = () => {
        const replayPrev = replay
        setReplay(!replayPrev)
    }

    return (
        <>
            <MdReplay 
            onClick={activateReplay} 
            className="replayIcon icon"
            color={replay ? "darkOrchid" : "white"}
            />
        </>
    )
}


