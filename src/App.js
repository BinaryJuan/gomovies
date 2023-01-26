import Navbar from './components/Navbar'
import MobileNavbar from './components/MobileNavbar'
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
        <MobileNavbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/discover' element={<Search />} />
          <Route path='/discover/details/:id' element={<Details />} />
          <Route path='/genres' element={<Genres />} />
          <Route path='/shows' element={<Shows />} />
          <Route path='/about' element={<About />} />
          <Route path='/genres/details/:id' element={<Details backUrl='/genres' />} />
          <Route path='/shows/details/:id' element={<ShowDetails />} />
          <Route path='/discover/page/:page' element={<Search />} />
          <Route path='/shows/page/:page' element={<Shows />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </MoviesContextProvider>
  )
}

export default App
