import { MdMicNone, MdMicOff } from "react-icons/md"

export const MicrophoneIcon = (props) => {
    const recording = props.recording || false
    return (
        <>
        {recording ? <MdMicOff /> : <MdMicNone />}
        </>
    )
}
