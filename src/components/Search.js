import axios from 'axios'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Loading from './Loading'

const Search = () => {
    const [searchMovies, setSearchMovies] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [isLoading, setIsLoading] = useState(true)
    const imageBaseUrl = 'https://image.tmdb.org/t/p/w600_and_h900_bestv2'

    const getSearch = async () => {
        setIsLoading(true)
        const movieToSearch = document.getElementById('searchMovie').value
        if (movieToSearch === '') {
            const options = {
                method: 'GET',
                url: `https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.REACT_APP_API_KEY}&page=${currentPage}`
            }
            try {
                const response = await axios.request(options)
                setSearchMovies(response.data.results)
                setIsLoading(false)
                setTotalPages(response.data.total_pages)
                document.querySelectorAll('.pagination').forEach((pagination) => {
                    pagination.style.visibility = 'visible'
                    pagination.style.display = 'flex'
                })
                window.scrollTo(0, 0)
            } catch (error) {
                console.log(error)
            }
        } else {
            const options = {
                method: 'GET',
                url: `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_KEY}&query=${movieToSearch}`
            }
            try {
                const response = await axios.request(options)
                setSearchMovies(response.data.results)
                setIsLoading(false)
                document.querySelectorAll('.pagination').forEach((pagination) => {
                    pagination.style.visibility = 'hidden'
                    pagination.style.display = 'none'
                })
            } catch (error) {
                console.log(error)
            }
        }
    }

    const goToPage = (page) => {
        setCurrentPage(page)
    }

    useEffect(() => {
        getSearch()
    }, [currentPage])

    return (
        <div className='trendingContainer'>
            <h2>Discover movies</h2>
            <input type='text' id='searchMovie' placeholder='Search...' onChange={getSearch} />
            {isLoading ? <Loading /> : null}
            <div className='pagination'>
                <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}><img src='/back.svg' alt='Previous' /></button>
                {currentPage >= 4 ? <p className='pageNumber' onClick={() => goToPage(1)}>1...</p> : null}
                {currentPage !== 1 ? <p className='pageNumber' onClick={() => goToPage(currentPage - 1)}>{currentPage - 1}</p> : null}
                <p className='current'>{currentPage}</p>
                {currentPage !== totalPages ? <p className='pageNumber' onClick={() => goToPage(currentPage + 1)}>{currentPage + 1}</p> : null}
                {currentPage >= totalPages - 5 ? null : null}
                <p className='pageNumber' onClick={() => goToPage(totalPages)}>{currentPage === 1000 ? null : `...${totalPages}`}</p>
                <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}><img src='/right.svg' alt='Next' /></button>
            </div>
            {searchMovies.length === 0 ? <h2>No movies found</h2> : null}
            <div className='trending'>
                {searchMovies.map((movie) => {
                    return (
                        <Link to={`/discover/details/${movie.id}`} key={movie.id}>
                            <div className='trendingMovie'>
                                {movie.poster_path === null ? <img src='/altImage.png' alt={movie.title} /> : <img src={imageBaseUrl + movie.poster_path} alt={movie.title} />}
                                <div className='trendingMovieDescription'>
                                    <h3>{movie.title}</h3>
                                    <p className='rdate'>{movie.release_date}</p>
                                    <p className='overview'>{movie.overview}</p>
                                </div>
                            </div>
                        </Link>
                    )
                })}
            </div>
            <div className='pagination'>
                <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}><img src='/back.svg' alt='Previous' /></button>
                {currentPage >= 4 ? <p className='pageNumber' onClick={() => goToPage(1)}>1...</p> : null}
                {currentPage !== 1 ? <p className='pageNumber' onClick={() => goToPage(currentPage - 1)}>{currentPage - 1}</p> : null}
                <p className='current'>{currentPage}</p>
                {currentPage !== totalPages ? <p className='pageNumber' onClick={() => goToPage(currentPage + 1)}>{currentPage + 1}</p> : null}
                {currentPage >= totalPages - 5 ? null : null}
                <p className='pageNumber' onClick={() => goToPage(totalPages)}>{currentPage === 1000 ? null : `...${totalPages}`}</p>
                <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}><img src='/right.svg' alt='Next' /></button>
            </div>
        </div>
    )
}

export default Search