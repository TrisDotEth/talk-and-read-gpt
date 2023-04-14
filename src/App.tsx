import React, { useState } from 'react'

import axios from 'axios'
// import { Configuration, OpenAIApi } from 'openai'
import { ReactMic } from 'react-mic'

function App() {

  const [isRecording, setIsRecording] = useState(false)
  const [airesponse, setAiResponse] = useState('')
  const [blobURL, setBlobURL] = useState('')
  const [recordedBlob, setRecordedBlob] = useState(null)

  const startRecording = () => {
    console.log('startRecording')
    setIsRecording(true)
  }

  const stopRecording = () => {
    setIsRecording(false)
    console.log('stopRecording')
    debugger;
  }

  const onData = (recordedBlob) => {
    setBlobURL(recordedBlob.blobURL)
    console.log('onData')
  }

  const onStop = (recordedBlob) => {
    setBlobURL(recordedBlob.blobURL)
    setRecordedBlob(recordedBlob)
    debugger;
    sendToOpenAI(recordedBlob)
    console.log('onStop')
  }

  const sendToOpenAI = (recordedBlob) => {
    debugger;
    if (recordedBlob) {
      // check if recordedBlob is not null
      const formData = new FormData()
      formData.append('file', recordedBlob.blob, 'MY-VOICE-HERE.mp3')
      formData.append('model', 'whisper-1')
      debugger;
      axios
        .post('https://api.openai.com/v1/audio/transcriptions', formData, {
          headers: {
            Authorization:
              'Bearer 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',
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((response) => {
          console.log(response)
          voice(response.data)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
  const textArea = document.querySelector('textarea[rows="1"]');
  const voice = (voiceInput) => {
    console.log('voiceInput', voiceInput)
    debugger;
    setTimeout(() => {
      // @ts-ignore
      textArea.value = voiceInput.text;

      

      

      setTimeout(() => {
        console.log("Whattttttt")
        // const form = document.querySelectorAll('[data-form-type="contact"]');
        // // @ts-ignore
        // form[0].submit();
        
        const button = document.querySelector('button.absolute');
        button.removeAttribute('disabled');
        // @ts-ignore
        button.click()
      }, 3000);



      // const button = document.querySelector('textarea[rows="1"] + button.absolute');
      // // @ts-ignore
      // button.click(); 
    }, 1000); // Delay the update by 1 second (1000 milliseconds)
  }


  return (
    <div>
      <div>
        <ReactMic
          record={isRecording}
          onData={onData}
          onStop={onStop}
          mimeType="audio/mp3"
        />
        <button onClick={startRecording}>Start Recording</button>
        <button onClick={stopRecording}>Stop Recording</button>
        {blobURL && (
          <div>
            <h1>{blobURL}</h1>
            <audio src={blobURL} controls />
            <button onClick={sendToOpenAI}>Send to OpenAI1111111111111</button>
          </div>
        )}
      </div>
      <h1>AI reply</h1>
      <p>{airesponse}</p>
    </div>
  );
}

export default App;