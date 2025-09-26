import { BrowserRouter, Routes, Route } from 'react-router';
import { FavoritesProvider } from './contexts/FavoritesContext';
import { ThemeProvider } from './contexts/ThemeContext';
import Home from './routes/Home';
import Search from './routes/Search';
import MovieDetails from './routes/MovieDetails';
import TVDetails from './routes/TVDetails';
import Favorites from './routes/Favorites';

const BASE_URL = import.meta.env.VITE_PUBLIC_BASE_URL || '/';

function App() {
  return (
    <ThemeProvider>
      <FavoritesProvider>
        <BrowserRouter basename={BASE_URL}>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/search' element={<Search />} />
            <Route path='/movie/:id' element={<MovieDetails />} />
            <Route path='/tv/:id' element={<TVDetails />} />
            <Route path='/favorites' element={<Favorites />} />
          </Routes>
        </BrowserRouter>
      </FavoritesProvider>
    </ThemeProvider>
  );
}

export default App;
