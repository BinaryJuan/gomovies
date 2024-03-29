import { Link, NavLink, useLocation } from 'react-router-dom'
import { useContext, useState, useEffect } from 'react'
import { MoviesContext } from '../context/GuessedContext'

const MobileNavbar = () => {
    const [context, setContext] = useContext(MoviesContext)
    const [isOpen, setIsOpen] = useState(false)
    const { pathname } = useLocation()

    useEffect(() => {
        setIsOpen(false)
    }, [pathname])

    return (
        <div>
            <button className='hamToggle' onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? <img src='/close.svg' alt='close' /> : <img src='/ham.svg' alt='open' />}
            </button>
            {isOpen && (
                <aside className='mobileMenu'>
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
                        <NavLink to='/discover' className={({isActive}) => isActive ? 'navbarSection activeNavSection' : 'navbarSection'}>
                            <img src='/discover.svg' alt='Discover' />
                            <div>Discover</div>
                        </NavLink>
                        <NavLink to='/genres' className={({isActive}) => isActive ? 'navbarSection activeNavSection' : 'navbarSection'}>
                            <img src='/genres.svg' alt='Genres' />
                            <div>Genres</div>
                        </NavLink>
                        <NavLink to='/shows' className={({isActive}) => isActive ? 'navbarSection activeNavSection' : 'navbarSection'}>
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
            )}
        </div>
    )
}

export default MobileNavbar