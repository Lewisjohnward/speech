import { BiMicrophoneOff, BiMicrophone } from "react-icons/bi";

export const MicrophoneIcon = ({playing, stopVideo, startVideo}) => {
    return (
        <>
        {playing ? (
            <BiMicrophoneOff
              onClick={stopVideo}
              color={playing ? "darkOrchid" : "white"}
            />
          ) : (
            <BiMicrophone
              onClick={startVideo}
              color={playing ? "darkOrchid" : "white"}
            />
          )}
          </>
    )
}
