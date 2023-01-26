import axios from 'axios'
import { useState, useRef, useContext } from 'react'
import { MoviesContext } from '../context/GuessedContext'
import LoadingButtons from './LoadingButton'
import Loading from './Loading'

const Home = () => {
    const minId = 2
    const maxId = 1000000
    const [movie, setMovie] = useState({})
    const [randomMovies, setRandomMovies] = useState([])
    const [loading, setLoading] = useState(true)
    const isMovieFetched = useRef(false)
    const imageBaseUrl = 'https://image.tmdb.org/t/p/w600_and_h900_bestv2'
    const [context, setContext] = useContext(MoviesContext)

    const randomId = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1) + min)
    }

    const returnRandomButtons = async (correctMovie) => {
        const randomMovies = []
        randomMovies.push(correctMovie)
        while (randomMovies.length < 3) {
            const randomMovie = await getMovieObject()
            if (!randomMovies.includes(randomMovie)) {
            randomMovies.push(randomMovie)
            }
        }
        for (let i = randomMovies.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [randomMovies[i], randomMovies[j]] = [randomMovies[j], randomMovies[i]];
        }
        setRandomMovies(randomMovies)
    }

    const getRandomPage = async () => {
        // const options = {
        //     method: 'GET',
        //     url: `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en`
        // }
        // try {
        //     const response = await axios.request(options)
        //     const total = response.data.total_pages
        //     return Math.floor(Math.random() * (1000 - 1 + 1) + 1)
        // } catch (error) {
        //     console.log(error)
        // }
        return Math.floor(Math.random() * (5000 - 1 + 1) + 1)
    }

    const getMovie = async () => {
        while (true) {
            const randomPageNumber = await getRandomPage()
            const options = {
                method: 'GET',
                url: `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en&page=${randomPageNumber}`
            }
            try {
                const response = await axios.request(options)
                const randomMovie = response.data.results[Math.floor(Math.random() * response.data.results.length)]
                if (randomMovie.backdrop_path !== null && randomMovie.adult === false) {
                    setMovie({
                        url: imageBaseUrl + randomMovie.backdrop_path,
                        caption: randomMovie.title
                    })
                    setLoading(false)
                    const correctMovie = {title: randomMovie.title, correct: true, id: randomMovie.id}
                    returnRandomButtons(correctMovie)
                    break
                }
            } catch (error) {
                console.log(error)
            }
        }
    }

    const getMovieObject = async () => {
        while (true) {
            const options = {
                method: 'GET',
                url: `https://api.themoviedb.org/3/movie/${randomId(minId, maxId)}?api_key=${process.env.REACT_APP_API_KEY}`
            }
            try {
                const response = await axios.request(options)
                if (response.data.adult === false) {
                    return {title: response.data.title, correct: false, id: response.data.id}
                }
            } catch (error) {
                console.log(error)
            }
        }
    }

    const checkAnswer = (answer) => {
    if (answer.correct) {
        saveScore()
    }
    revealAnswer()
    }

    const handleReload = () => {
        getMovie()
        setRandomMovies([])
        setLoading(true)
    }

    const revealAnswer = () => {
        const correctMovie = randomMovies.find((movie) => movie.correct)
        const buttons = document.querySelectorAll('.optionButton')
        buttons.forEach((button) => {
            if (button.innerText === correctMovie.title) {
                button.style.backgroundColor = 'green'
            } else {
                button.style.backgroundColor = 'red'
            }
        })
    }

    const saveScore = () => {
        const localScore = localStorage.getItem('score')
        if (localScore) {
            localStorage.setItem('score', parseInt(localScore) + 1)
            setContext(parseInt(localScore) + 1)
        } else {
            localStorage.setItem('score', 1)
            setContext(1)
        }
    }

    if (!isMovieFetched.current) {
        getMovie()
        isMovieFetched.current = true
    }

    if (!loading) {
        return (
            <div className='homeContainer'>
                <div className='movieContainer'>
                    <h2>Guess the movie...</h2>
                    <div className='imageBackground'>
                        <img className='celebImage' src={movie.url} alt={movie.caption} />
                    </div>
                    <div className='optionsContainer'>
                        <div className='options'>
                            {randomMovies.length !== 3 ? <LoadingButtons /> : null}
                            {randomMovies.map((movie) => {
                                return <button key={movie.id} className='optionButton' onClick={() => checkAnswer(movie)}>{movie.title}</button>
                            })}
                        </div>
                        {randomMovies.length !== 3 ? null : <button className='retryButton' onClick={handleReload}><img src='./reload.svg' alt='Reload' /></button>}
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <Loading />
        )
    }
}

export default Home