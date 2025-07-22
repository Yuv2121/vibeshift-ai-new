import { motion } from 'framer-motion';
import { useEffect } from 'react';
import WaveSurfer from 'wavesurfer.js';

function App() {
  useEffect(() => {
    const waveform = WaveSurfer.create({
      container: '#waveform',
      waveColor: '#00f',
      progressColor: '#0ff',
      height: 100,
    });
    waveform.load('https://www.mfiles.co.uk/mp3-downloads/gs-cd-track2.mp3'); // Sample audio
    return () => waveform.destroy();
  }, []);

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
      <div id="waveform" style={{ width: '80%', marginTop: '20px' }}></div>
    </div>
  );
}

export default App;