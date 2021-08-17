import { useState, useEffect} from "react";
import WaveformData from "waveform-data";
import { scaleLinear, min, max, area } from "d3";

export const Waveform = ({ audio, time, duration }) => {
  const [waveform, setWaveform] = useState(null);

  useEffect(() => {
    if (audio) {
      const audioContext = new AudioContext();

      fetch(audio)
        .then((response) => response.arrayBuffer())
        .then((buffer) => {
          const options = {
            audio_context: audioContext,
            array_buffer: buffer,
            scale: 512, //64 128 256 152
          };

          return new Promise((resolve, reject) => {
            WaveformData.createFromAudio(options, (err, waveform) => {
              if (err) {
                reject(err);
              } else {
                resolve(waveform);
              }
            });
          });
        })
        .then((waveform) => {
          setWaveform(waveform);
          //
          //
        });
    }
  }, [audio]);

  if (!waveform) {
    return null;
  }

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

  const channel = waveform.channel(0);

  // const container = d3.select("#waveform-container");

  const min1 = channel.min_array();
  const max1 = channel.max_array();

  const xScale = scaleLinear()
    .domain([0, waveform.length])
    .range([0, innerWidth]);

  //ranground
  const yScale = scaleLinear()
    .domain([min(min1), max(max1)])
    .range([innerHeight, 0])
    .nice();

  const lineScale = scaleLinear().domain([0, duration]).range([0, innerWidth]);

  return (
    <>
      <svg height={height} width={width}>
        <rect
          x={0}
          y={0}
          height={height}
          width={width}
          stroke="black"
          fill="none"
        />
        <g transform={`translate(${margin.left}, ${margin.top})`}>
          <rect
            x={0}
            y={0}
            height={innerHeight}
            width={innerWidth}
            stroke="black"
            strokeWidth={0.05}
            fill="none"
          />

          <path
            stroke="mediumvioletred"
            d={area()
              .x((d, i) => xScale(i))
              .y0((d) => yScale(d))
              .y1((d) => yScale(d))(max1)}
          />
          <path
            fill="black"
            stroke="mediumvioletred"
            d={area()
              .x((d, i) => xScale(i))
              .y0((d) => yScale(d))
              .y1((d) => yScale(d))(min1)}
          />
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
