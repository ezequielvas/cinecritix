// src/App.jsx
import { useState } from "react";
import { Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";

const App = () => {
  const [darkMode, setDarkMode] = useState(true);
  const toggleDarkMode = () => setDarkMode(!darkMode);

  const movies = [
    {
      title: "The Batman",
      image: "https://image.tmdb.org/t/p/w500/74xTEgt7R36Fpooo50r9T25onhq.jpg",
      rating: 4.5,
      description: "Un nuevo caballero oscuro aparece en Gotham.",
    },
    {
      title: "Oppenheimer",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqzPdSwrwUVF0AjKzfnGSeW6VoPT5lrM627A&s",
      rating: 4.8,
      description: "Una exploración del subconsciente en los sueños.",
    },
    {
      title: "Interstellar",
      image: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
      rating: 5.0,
      description: "Una misión épica a través del espacio y el tiempo.",
    },
  ];

  return (
    <div className={darkMode ? "bg-gray-950 text-white min-h-screen" : "bg-gray-100 text-gray-900 min-h-screen"}>
      {/* Header */}
      <header className={`w-full px-6 py-4 flex justify-between items-center shadow-md sticky top-0 z-50 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <h1 className={`text-2xl font-bold tracking-wide ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          🎬 CineCritix
        </h1>
        <button
          onClick={toggleDarkMode}
          className={`p-2 rounded-full transition-colors duration-300 ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-black'}`}
          title="Cambiar modo"
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </header>

      {/* Tarjetas */}
      <main className="p-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {movies.map((movie, index) => (
            <motion.div
              key={index}
              className={`rounded-2xl overflow-hidden shadow-lg transition transform hover:scale-105 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <img src={movie.image} alt={movie.title} className="w-full h-60 object-cover" />
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{movie.title}</h2>
                <p className="text-sm mb-2">{movie.description}</p>
                <p className="text-yellow-400 font-bold">⭐ {movie.rating} / 5</p>
              </div>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default App;
