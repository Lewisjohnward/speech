const height = 30;
const width = 40;

const margin = {
  top: 5,
  right: 5,
  bottom: 5,
  left: 5,
};

export const ItFlagIcon = () => {
  return (
    <svg height={height} width={width}>
        <rect height={height} width={width} fill="bisque" rx={5}/>
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        <rect height={20} width={10} fill="green" />
        <rect x={10} height={20} width={10} fill="white" />
        <rect x={20} height={20} width={10} fill="red"/>
      </g>
      
    </svg>
  );
};
