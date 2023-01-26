import { Link, NavLink } from 'react-router-dom'
import { useContext } from 'react'
import { MoviesContext } from '../context/GuessedContext'

const Navbar = () => {
    const [context, setContext] = useContext(MoviesContext)

    return (
        <aside className='menu'>
            <Link to='/' className='logoLink'>
                <img src='/logo.png' alt='gomovies logo' />
            </Link>
            <div className='divLine'></div>
            <h3>Movies guessed: <span className='scoreSpan'>{context}</span></h3>
            <div className='sectionsContainer'>
                <NavLink to='/' className={({isActive}) => isActive ? 'navbarSection activeNavSection' : 'navbarSection'}>
                    <img src='/home.svg' alt='Home' />
                    <div>Home</div>
                </NavLink>
                <NavLink to='/discover/page/1' className={({isActive}) => isActive ? 'navbarSection activeNavSection' : 'navbarSection'}>
                    <img src='/discover.svg' alt='Discover' />
                    <div>Discover</div>
                </NavLink>
                <NavLink to='/genres' className={({isActive}) => isActive ? 'navbarSection activeNavSection' : 'navbarSection'}>
                    <img src='/genres.svg' alt='Genres' />
                    <div>Genres</div>
                </NavLink>
                <NavLink to='/shows/page/1' className={({isActive}) => isActive ? 'navbarSection activeNavSection' : 'navbarSection'}>
                    <img src='/shows.svg' alt='Shows' />
                    <div>TV shows</div>
                </NavLink>
                <NavLink to='/about' className={({isActive}) => isActive ? 'navbarSection activeNavSection' : 'navbarSection'}>
                    <img src='/about.svg' alt='About' />
                    <div>About</div>
                </NavLink>
            </div>
            <div className='divLine second'></div>
            <div className='socialMediaContainer'>
                <a href='https://github.com/BinaryJuan' target='_blank' rel='noreferrer'>
                    <img src='/github.svg' alt='Github' />
                </a>
                <a href='https://www.linkedin.com/in/dante-terranova-2383361a4/' target='_blank' rel='noreferrer'>
                    <img src='/linkedin.svg' alt='Linkedin' />
                </a>
            </div>
            <p className='copyright'>Copyright © 2023 Dante Terranova</p>
        </aside>
    )
}

export default Navbar