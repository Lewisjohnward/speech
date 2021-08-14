mediaRecorder = new MediaRecorder(stream)
            let chunks = []
            mediaRecorder.start()
            mediaRecorder.stop()
            mediaRecorder.ondataavailable = function(ev) {
              chunks.push(ev.data)
            }
            console.log(mediaRecorder)
            setAudioStream(stream)

            mediaRecorder.onstop = (ev) => {
              let blob = new Blob(chunks, {'type': 'audio/mp3'})
              chunks = []
              let audioUrl = window.URL.createObjectURL(blob)
              video.src = audioUrl
            }