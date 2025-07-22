import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';

function App() {
  const waveformRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [waveSurfer, setWaveSurfer] = useState(null);

  useEffect(() => {
    const ws = WaveSurfer.create({
      container: waveformRef.current,
      waveColor: '#00f',
      progressColor: '#0ff',
      height: 100,
    });
    ws.load('https://www.mfiles.co.uk/mp3-downloads/gs-cd-track2.mp3');
    setWaveSurfer(ws);

    return () => ws.destroy();
  }, []);

  const togglePlayPause = () => {
    if (waveSurfer) {
      if (isPlaying) {
        waveSurfer.pause();
      } else {
        waveSurfer.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center flex-col">
      <motion.h1
        className="text-4xl font-bold neon-text"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        VibeShift AI
      </motion.h1>
      <div id="waveform" ref={waveformRef} style={{ width: '80%', marginTop: '20px' }}></div>
      <button
        onClick={togglePlayPause}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
      >
        {isPlaying ? 'Pause' : 'Play'}
      </button>
    </div>
  );
}

export default App;