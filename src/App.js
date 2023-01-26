import Navbar from './components/Navbar'
import Home from './components/Home'
import Search from './components/Search'
import Genres from './components/Genres'
import Shows from './components/Shows'
import About from './components/About'
import Details from './components/Details'
import NotFound from './components/NotFound'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { MoviesContextProvider } from './context/GuessedContext'
import ShowDetails from './components/ShowDetails'

const App = () => {
  return (
    <MoviesContextProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/discover' element={<Search />} />
          <Route path='/discover/details/:id' element={<Details backUrl='/discover' />} />
          <Route path='/genres' element={<Genres />} />
          <Route path='/shows' element={<Shows />} />
          <Route path='/about' element={<About />} />
          <Route path='/genres/details/:id' element={<Details backUrl='/genres' />} />
          <Route path='/shows/details/:id' element={<ShowDetails backUrl='/shows' />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </MoviesContextProvider>
  )
}

export default App
