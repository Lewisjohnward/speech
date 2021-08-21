import { IoDiceOutline } from "react-icons/io5";

export const RandomIcon = ({randomiseTrack}) => {
  return (
    <div>
      <IoDiceOutline
        color="white"
        onClick={randomiseTrack}
      />
    </div>
  );
};
