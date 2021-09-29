import { MdPause, MdPlayArrow } from "react-icons/md";

export const PlayIcon = (props) => {
    const isPlaying = props.isPlaying || false
    return (
        <>
        {isPlaying ? <MdPause /> : <MdPlayArrow />}
        </>
    )
}
