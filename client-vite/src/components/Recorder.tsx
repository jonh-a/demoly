import { useState } from 'react';
import { AudioRecorder } from 'react-audio-voice-recorder';
import ServerClient from '../apis/server';
// import Button from './Button';

interface Props {
  songID: string;
}

const Recorder: React.FC<Props> = ({ songID }) => {
  const [audioBlob, setAudioBlob] = useState<Blob>(new Blob());
  const [audioBlobUrl, setAudioBlobUrl] = useState<string | null>(null);

  const storeRecordingInBrowser = (blob: Blob) => {
    setAudioBlob(blob);
    const url: string = URL.createObjectURL(blob);
    setAudioBlobUrl(url);
  };

  const uploadRecording = async () => {
    const formData = new FormData();
    const file = new File([audioBlob], 'myfile');
    formData.append('file', file);
    await ServerClient.put(
      `/song/${songID}/take`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      }
    );
  };

  return (
    <div>
      <AudioRecorder
        onRecordingComplete={storeRecordingInBrowser}
        audioTrackConstraints={{
          noiseSuppression: true,
          echoCancellation: true,
        }}
        onNotAllowedOrFound={(err) => console.table(err)}
        downloadOnSavePress={false}
        downloadFileExtension="mp3"
        mediaRecorderOptions={{
          audioBitsPerSecond: 128000,
        }}
        showVisualizer={true}
      />

      {
        audioBlobUrl && (
          <>
            <audio
              src={audioBlobUrl}
              controls={true}
            />
            <button
              type="button"
              onClick={uploadRecording}
            >Upload</button>
          </>
        )
      }
    </div>
  );
};

export default Recorder;