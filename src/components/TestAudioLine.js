import { scaleLinear } from "d3";

export const TestAudioLine = ({ time, duration }) => {
  const width = 1200;
  const height = 200;

  const margin = {
    top: 10,
    right: 10,
    bottom: 10,
    left: 10,
  };

  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;

  const lineScale = scaleLinear().domain([0, duration]).range([0, innerWidth]);
  return (
    <>
      <svg height={height} width={width}>
        <rect height={height} width={width} stroke="black" fill="none" />
        <g transform={`translate(${margin.left}, ${margin.top})`}>
          {time && (
            <g transform={`translate(${lineScale(time)}, 0)`}>
              <line stroke="darkcyan" y1={innerHeight} />
            </g>
          )}
        </g>
        <text
          x={width - 35}
          y={height - 3}
          stroke="darkmagenta"
          opacity={1}
          fontStyle="italic"
          opacity={0.7}
        >
          {(duration - time).toFixed(2)}
        </text>
      </svg>
    </>
  );
};
