import { useState, useEffect } from "react";
import WaveformData from "waveform-data";
import { scaleLinear, scaleBand, min, max, range } from "d3";

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

const innerHeight1 = innerHeight / 2;

export const WaveformBars = ({ audio, time, duration, trackNum }) => {
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
        <rect height={height} width={width} stroke="black" fill="none" />
        <g transform={`translate(${margin.left}, ${margin.top})`}>
          <text className="svg-label">Waveform</text>
          <rect
            height={innerHeight}
            width={innerWidth}
            stroke="black"
            strokeWidth={0.05}
            fill="none"
          />
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
        <rect height={height} width={width} stroke="black" fill="none" />
        <g transform={`translate(${margin.left}, ${margin.top})`}>
          <text
            x={innerWidth}
            style={{ textAnchor: "end" }}
            className="svg-label"
            opacity={0.4}
          >
            {trackNum}
          </text>
          <text className="svg-label">Waveform</text>
          <rect
            height={innerHeight}
            width={innerWidth}
            stroke="black"
            strokeWidth={0.05}
            fill="none"
          />

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
