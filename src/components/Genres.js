import axios from 'axios'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Loading from './Loading'

const Genres = () => {
    const [movies, setMovies] = useState([])
    const [genre, setGenre] = useState('28')
    const [sort, setSort] = useState('desc')
    const [isLoading, setIsLoading] = useState(true)
    const imageBaseUrl = 'https://image.tmdb.org/t/p/w600_and_h900_bestv2'

    const getGenre = () => {
        const genre = document.getElementById('genre').value
        setGenre(genre)
    }

    const getSort = () => {
        const sort = document.getElementById('sort').value
        setSort(sort)
    }

    const getMoviesWithGenreSorted = async (startDate, endDate) => {
        setIsLoading(true)
        const options = {
            method: 'GET',
            url: `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&with_genres=${genre}&sort_by=release_date.${sort}&with_original_language=en&primary_release_date.gte=${startDate}&primary_release_date.lte=${endDate}`
        }
        try {
            const response = await axios.request(options)
            const filteredMovies = response.data.results.filter((movie) => {
                if (movie.poster_path !== null) {
                    return movie
                }
            })
            setMovies(filteredMovies)
            setIsLoading(false)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        const startDate = '1990-01-01'
        const endDate = '2020-12-31'
        getMoviesWithGenreSorted(startDate, endDate)
    }, [genre, sort])

    return (
        <div className='trendingContainer'>
            <h2>Genres</h2>
            {isLoading ? <Loading /> : null}
            <div className='selectsContainer'>
                <div className='selectContainer'>
                    <div className='selectLabel'>Filter by: </div>
                    <select id="genre" className='selectGenre' onChange={getGenre}>
                        <option value="28">Action</option>
                        <option value="35">Comedy</option>
                        <option value="27">Horror</option>
                        <option value="10749">Romance</option>
                        <option value="9648">Mystery</option>
                        <option value="37">Western</option>
                        <option value="16">Animation</option>
                        <option value="18">Drama</option>
                        <option value="53">Thriller</option>
                    </select>
                </div>
                <div className='selectContainer'>
                    <div className='selectLabel'>Sort by: </div>
                    <select id="sort" className='selectGenre' onChange={getSort}>
                        <option value='desc'>Release date descending</option>
                        <option value='asc'>Release date ascending</option>
                    </select>
                </div>
            </div>
            {movies.length === 0 ? <h2>No movies found</h2> : null}
            <div className='trending'>
                {movies.map((movie) => {
                    return (
                        <Link to={`/genres/details/${movie.id}`} key={movie.id}>
                            <div className='trendingMovie'>
                                {movie.poster_path === null ? <img src='/altImage.png' alt={movie.title} /> : <img src={imageBaseUrl + movie.poster_path} alt={movie.title} />}
                                <div className='trendingMovieDescription'>
                                    <h3>{movie.title}</h3>
                                    <p className='rdate'>{movie.release_date}</p>
                                </div>
                            </div>
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}

export default Genres