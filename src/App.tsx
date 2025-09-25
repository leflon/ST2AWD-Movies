import { BrowserRouter, Routes, Route } from 'react-router';
import { FavoritesProvider } from './contexts/FavoritesContext';
import { ThemeProvider } from './contexts/ThemeContext';
import Home from './routes/Home';
import Search from './routes/Search';
import MovieDetails from './routes/MovieDetails';
import TVDetails from './routes/TVDetails';
import Favorites from './routes/Favorites';

function App() {
  return (
    <ThemeProvider>
      <FavoritesProvider>
        <BrowserRouter>
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
