import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';

function App() {
  const waveformRef1 = useRef(null);
  const waveformRef2 = useRef(null);
  const [isPlaying1, setIsPlaying1] = useState(false);
  const [isPlaying2, setIsPlaying2] = useState(false);
  const [waveSurfer1, setWaveSurfer1] = useState(null);
  const [waveSurfer2, setWaveSurfer2] = useState(null);
  const [selectedVibe, setSelectedVibe] = useState('emotional');

  const vibes = [
    { id: 'emotional', label: 'Emotional' },
    { id: 'party', label: 'Party' },
  ];

  useEffect(() => {
    const ws1 = WaveSurfer.create({
      container: waveformRef1.current,
      waveColor: '#00f',
      progressColor: '#0ff',
      height: 100,
    });
    ws1.load('https://www.mfiles.co.uk/mp3-downloads/gs-cd-track2.mp3');
    setWaveSurfer1(ws1);

    const ws2 = WaveSurfer.create({
      container: waveformRef2.current,
      waveColor: '#f00',
      progressColor: '#f0f',
      height: 100,
    });
    ws2.load(getTransformedAudio(selectedVibe));
    setWaveSurfer2(ws2);

    return () => {
      ws1.destroy();
      ws2.destroy();
    };
  }, [selectedVibe]);

  const getTransformedAudio = (vibe) => {
    const vibeData = {
      emotional: 'https://www.mfiles.co.uk/mp3-downloads/gs-cd-track1.mp3',
      party: 'https://www.mfiles.co.uk/mp3-downloads/gs-cd-track3.mp3',
    };
    return vibeData[vibe] || 'https://www.mfiles.co.uk/mp3-downloads/gs-cd-track1.mp3';
  };

  const togglePlayPause1 = () => {
    if (waveSurfer1) {
      if (isPlaying1) waveSurfer1.pause();
      else waveSurfer1.play();
      setIsPlaying1(!isPlaying1);
    }
  };

  const togglePlayPause2 = () => {
    if (waveSurfer2) {
      if (isPlaying2) waveSurfer2.pause();
      else waveSurfer2.play();
      setIsPlaying2(!isPlaying2);
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
      <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
        <div>
          <p>Original</p>
          <div id="waveform1" ref={waveformRef1} style={{ width: '300px' }}></div>
          <button
            onClick={togglePlayPause1}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          >
            {isPlaying1 ? 'Pause' : 'Play'}
          </button>
        </div>
        <div>
          <p>Transformed</p>
          <div id="waveform2" ref={waveformRef2} style={{ width: '300px' }}></div>
          <button
            onClick={togglePlayPause2}
            className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
          >
            {isPlaying2 ? 'Pause' : 'Play'}
          </button>
        </div>
      </div>
      <select
        value={selectedVibe}
        onChange={(e) => setSelectedVibe(e.target.value)}
        className="mt-4 px-4 py-2 bg-gray-700 text-white rounded"
      >
        {vibes.map((vibe) => (
          <option key={vibe.id} value={vibe.id}>
            {vibe.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default App;