import { useEffect, useState } from 'react';
import { AudioRecorder } from 'react-audio-voice-recorder';
import ServerClient from '../apis/server';
import Button from './Button';
import ButtonSet from './ButtonSet';
import CancelButton from './CancelButton';

interface Props {
  songID: string;
}

const Recorder: React.FC<Props> = ({ songID }) => {
  const [audioBlob, setAudioBlob] = useState<Blob>(new Blob());
  const [audioBlobUrl, setAudioBlobUrl] = useState<string>('');
  const [uploadDisabled, setUploadDisabled] = useState<boolean>(true);
  const [alreadyUploaded, setAlreadyUploaded] = useState<boolean>(false);

  const storeRecordingInBrowser = (blob: Blob) => {
    setAudioBlob(blob);
    const url: string = URL.createObjectURL(blob);
    setAudioBlobUrl(url);
    setAlreadyUploaded(false);
    setUploadDisabled(false);
  };

  useEffect(() => console.log(audioBlobUrl));

  const uploadRecording = async () => {
    try {
      setUploadDisabled(true)
      const formData = new FormData();
      const file = new File([audioBlob], 'myfile');
      formData.append('file', file);
      await ServerClient.put(
        `/song/${songID}/take`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          timeout: 50000,
        }
      );
      setUploadDisabled(false)
      setAlreadyUploaded(true)
    } catch {
      setUploadDisabled(false)
      setAlreadyUploaded(false)
    }

  };

  return (
    <div className='col-span-full w-full mx-auto'>
      <label
        htmlFor={'asdf'}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        New take
      </label>
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
          </>
        )
      }
      <ButtonSet justify='start'>
        <CancelButton
          text="View previous takes"
          onClick={() => console.log(true)}
          disabled={false}
        />
        <Button
          type="button"
          onClick={uploadRecording}
          text={alreadyUploaded ? 'Uploaded' : 'Upload'}
          disabled={uploadDisabled || alreadyUploaded}
        />
      </ButtonSet>
    </div>
  );
};

export default Recorder;