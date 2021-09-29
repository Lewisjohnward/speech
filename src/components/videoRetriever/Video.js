import {useState, useEffect} from "react"

export default function Video() {
    const [videoUrl, setVideoUrl] = useState(null)

    useEffect(() => {
        handleRetrieveVideo()
    }, [])

    useEffect(() => {
       console.log(videoUrl)
    }, [videoUrl])

  const handleRetrieveVideo = () => {
      console.log("button pressed")
    fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=italiano&key=AIzaSyD1HxJ72xjYLpUuV7JP2KdMKlCs0IdlECM`,
      {
        mode: "cors",
      }
    )
      .then((response) => response.json())
      .then((data) => {
          const num = Math.floor(Math.random() * data.items.length)
          setVideoUrl(data.items[num].id.videoId)
          console.log(data)
        
        });
  };

  if(!videoUrl){
      return <h1>...Loading</h1>
  }

  return (
    <div>
      <iframe
        id="vid"
        width="560"
        height="315"
        src={`https://www.youtube.com/embed/${videoUrl}`}
        frameborder="0"
        allowfullscreen
      ></iframe>
      <button onClick={handleRetrieveVideo}>New video</button>
    </div>
  );
}
