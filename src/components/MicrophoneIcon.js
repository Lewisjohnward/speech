import { BiMicrophoneOff, BiMicrophone } from "react-icons/bi";

export const MicrophoneIcon = ({playing, stopVideo, startVideo}) => {
    return (
        <>
        {playing ? (
            <BiMicrophoneOff
              className="microphoneButton icon"
              onClick={stopVideo}
              color={playing ? "darkOrchid" : "white"}
            />
          ) : (
            <BiMicrophone
              className="microphoneButton icon"
              onClick={startVideo}
              color={playing ? "darkOrchid" : "white"}
            />
          )}
          </>
    )
}
