// CineCritixApp.jsx
import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const CineCritixApp = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [search, setSearch] = useState("");
  const [favorites, setFavorites] = useState(() => JSON.parse(localStorage.getItem("favorites")) || []);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [user, setUser] = useState(null);

  const toggleDarkMode = () => setDarkMode(!darkMode);
  const toggleFavorite = (movie) => {
    const exists = favorites.find((fav) => fav.title === movie.title);
    const updated = exists ? favorites.filter((fav) => fav.title !== movie.title) : [...favorites, movie];
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

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

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    const nombreGuardado = localStorage.getItem("cinecritix_user");
    if (nombreGuardado) setUser(nombreGuardado);
  }, []);

  return (
    <div className={`${darkMode ? "bg-gray-950 text-white" : "bg-gray-100 text-gray-900"} min-h-screen transition-colors duration-500`}>
      {/* Header */}
      <header className={`w-full px-6 py-4 flex justify-between items-center sticky top-0 z-50 shadow-lg ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <h1 className="text-2xl font-extrabold">🎬 CineCritix</h1>
        <div className="flex gap-3 items-center">
          <input
            className="rounded-lg px-2 py-1 text-black"
            type="text"
            placeholder="Buscar..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            onClick={toggleDarkMode}
            className={`p-2 rounded-full transition duration-300 ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-300 text-black'}`}
            title="Modo"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </header>

      {/* Bienvenida / Login ficticio */}
      <motion.div className="text-center py-6">
        {user ? (
          <h2 className="text-xl">Bienvenido, <span className="font-bold">{user}</span></h2>
        ) : (
          <div>
            <p className="mb-2">Ingresa tu nombre para comenzar:</p>
            <input
              className="px-3 py-1 rounded text-black"
              placeholder="Tu nombre"
              onKeyDown={(e) => {
                if (e.key === "Enter" && e.target.value.trim()) {
                  localStorage.setItem("cinecritix_user", e.target.value);
                  setUser(e.target.value);
                }
              }}
            />
          </div>
        )}
      </motion.div>

      {/* Favoritos */}
      {favorites.length > 0 && (
        <section className="p-4 max-w-6xl mx-auto">
          <h3 className="text-xl font-bold mb-4">🎖️ Tus favoritas</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {favorites.map((fav, index) => (
              <motion.div
                key={index}
                className={`rounded-xl shadow-lg p-4 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <img src={fav.image} alt={fav.title} className="w-full h-52 object-cover rounded-lg mb-2" />
                <h4 className="text-lg font-semibold">{fav.title}</h4>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* Tarjetas */}
      <main className="p-6 max-w-6xl mx-auto">
        <h2 className="text-xl font-bold mb-4">🎬 Películas disponibles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMovies.map((movie, index) => (
            <motion.div
              key={index}
              className={`rounded-2xl overflow-hidden shadow-lg hover:scale-105 transform transition-all duration-300 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => setSelectedMovie(movie)}
            >
              <img src={movie.image} alt={movie.title} className="w-full h-60 object-cover" />
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{movie.title}</h2>
                <p className="text-sm mb-2">{movie.description}</p>
                <p className="text-yellow-400 font-bold">⭐ {movie.rating} / 5</p>
                <button
                  onClick={(e) => { e.stopPropagation(); toggleFavorite(movie); }}
                  className="mt-2 text-sm hover:underline"
                >
                  {favorites.includes(movie) ? "💔 Quitar de favoritos" : "❤️ Agregar a favoritos"}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </main>

      {/* Modal */}
      <AnimatePresence>
        {selectedMovie && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedMovie(null)}
          >
            <motion.div
              className="bg-white text-black rounded-xl max-w-md w-full p-6 relative"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button onClick={() => setSelectedMovie(null)} className="absolute top-2 right-4 text-xl font-bold">×</button>
              <img src={selectedMovie.image} alt={selectedMovie.title} className="rounded-xl mb-4" />
              <h2 className="text-2xl font-bold mb-2">{selectedMovie.title}</h2>
              <p className="mb-2">{selectedMovie.description}</p>
              <p className="text-yellow-500 font-semibold">⭐ {selectedMovie.rating} / 5</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CineCritixApp;
