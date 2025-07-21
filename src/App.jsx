import { motion } from 'framer-motion';

function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      <motion.h1
        className="text-4xl font-bold neon-text"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        VibeShift AI
      </motion.h1>
    </div>
  );
}

export default App;