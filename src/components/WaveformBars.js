import { useState, useEffect } from "react";
import WaveformData from "waveform-data";
import { scaleLinear, scaleBand, min, max, range } from "d3";


const margin = {
  top: 10,
  right: 0,
  bottom: 10,
  left: 0,
};

export const WaveformBars = ({
  audio,
  time,
  duration,
  completed,
  parentWidth,
  parentHeight,
}) => {
  const [waveform, setWaveform] = useState(null);

  const width = parentWidth || 1200;
  const height = parentHeight || 200;

  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;

  const innerHeight1 = innerHeight / 2;

  useEffect(() => {
    if (audio) {
      const audioContext = new AudioContext();

      fetch(audio)
        .then((response) => response.arrayBuffer())
        .then((buffer) => {
          const options = {
            audio_context: audioContext,
            array_buffer: buffer,
            scale: 1024, //64 128 256 152
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
        });
    }
  }, [audio]);

  if (!waveform || !audio) {
    return (
      <svg height={height} width={width}>
        <g transform={`translate(${margin.left}, ${margin.top})`}>
          <text x={innerWidth / 2} y={innerHeight / 2}>
            {completed}
          </text>
          
        </g>
      </svg>
    );
  }

  const channel = waveform.channel(0);

  // const container = d3.select("#waveform-container");

  const min1 = channel.min_array();
  const max1 = channel.max_array();

  const xScale = scaleBand()
    .domain(range(waveform.length))
    .range([0, innerWidth]);

  //ranground
  const yScale1 = scaleLinear()
    .domain([0, max(max1, (d) => d)])
    .range([innerHeight1, 0])
    .nice();

  const yScale2 = scaleLinear()
    .domain([0, min(min1, (d) => d)])
    .range([innerHeight, innerHeight1])
    .nice();

  const lineScale = scaleLinear().domain([0, duration]).range([0, innerWidth]);
  return (
    <>
      <svg height={height} width={width}>
        
        <g transform={`translate(${margin.left}, ${margin.top})`}>
          

          {max1.map((d, i) => {
            return (
              <rect
                fill="greenyellow"
                stroke="black"
                strokeWidth={0.05}
                x={xScale(i)}
                y={yScale1(d)}
                width={xScale.bandwidth()}
                height={innerHeight1 - yScale1(d)}
              />
            );
          })}
          {min1.map((d, i) => {
            return (
              <rect
                fill="greenyellow"
                stroke="black"
                strokeWidth={0.05}
                x={xScale(i)}
                y={innerHeight1}
                width={xScale.bandwidth()}
                height={innerHeight - yScale2(d)}
              />
            );
          })}
          {time && (
            <g transform={`translate(${lineScale(time)}, 0)`}>
              <line stroke="darkcyan" y1={innerHeight} />
            </g>
          )}
        </g>
        <text
          x={width - 5}
          y={height - 3}
          style={{ textAnchor: "end" }}
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
