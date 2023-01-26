import axios from 'axios'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Loading from './Loading'

const Shows = () => {
    const [shows, setShows] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [isLoading, setIsLoading] = useState(true)
    const imageBaseUrl = 'https://image.tmdb.org/t/p/w600_and_h900_bestv2'

    const getShows = async () => {
        setIsLoading(true)
        const movieToSearch = document.getElementById('searchShow').value
        if (movieToSearch === '') {
            const options = {
                method: 'GET',
                url: `https://api.themoviedb.org/3/tv/popular?api_key=${process.env.REACT_APP_API_KEY}&with_original_language=en&page=${currentPage}`
            }
            try {
                const response = await axios.request(options)
                setShows(response.data.results)
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
                url: `https://api.themoviedb.org/3/search/tv/?api_key=${process.env.REACT_APP_API_KEY}&with_original_language=en&query=${movieToSearch}`
            }
            try {
                const response = await axios.request(options)
                setShows(response.data.results)
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
        getShows()
    }, [currentPage])

    return (
        <div>
            <div className='trendingContainer'>
                <h2>Popular TV Shows</h2>
                <input type='text' id='searchShow' placeholder='Search...' onChange={getShows} />
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
                {isLoading ? <Loading /> : null}
                {shows.length === 0 ? <h2>No TV shows found</h2> : null}
                <div className='trending'>
                    {shows.map((show) => {
                        return (
                            <Link to={`/shows/details/${show.id}`} key={show.id}>
                                <div className='trendingMovie'>
                                    {show.poster_path === null ? <img src='/altImage.png' alt={show.name} /> : <img src={imageBaseUrl + show.poster_path} alt={show.name} />}
                                    <div className='trendingMovieDescription'>
                                        <h3>{show.name}</h3>
                                        <p className='rdate'>{show.first_air_date}</p>
                                        <p className='overview'>{show.overview}</p>
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
        </div>
    )
}

export default Shows