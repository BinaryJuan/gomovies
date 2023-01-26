import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Loading from './Loading'

const Details = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [movieDetails, setMovieDetails] = useState({})
    const [cast, setCast] = useState([])
    
    const getMovieDetails = async () => {
        const options = {
            method: 'GET',
            url: `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
        }
        try {
            const response = await axios.request(options)
            setMovieDetails(response.data)
            await getMovieCredits()
        } catch (error) {
            console.log(error)
        }
    }

    const getMovieCredits = async () => {
        const options = {
            method: 'GET',
            url: `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
        }
        try {
            const response = await axios.request(options)
            const orderedCast = response.data.cast.sort((a, b) => b.popularity - a.popularity).slice(0, 5).map(actor => actor.name)
            setCast(orderedCast)
        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {
        getMovieDetails()
    }, [])

    return (
        <div className='movieDetails'>
            {movieDetails ? null : <Loading />}
            <div className='details'>
                <img src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${movieDetails.backdrop_path}`} alt={movieDetails.title} />
                <div className='information'>
                    <h2>{movieDetails.title} <span className='movieDuration'>({movieDetails.runtime} mins)</span></h2>
                    <p className='rdate'>{movieDetails.release_date}</p>
                    <p className='detailOverview'>{movieDetails.overview}</p>
                    {cast.length > 0 ? <p className='cast'>Cast: {cast.join(', ')}</p> : null}
                    <p className='voteAvg'>⭐ Vote average: {movieDetails.vote_average ? movieDetails.vote_average.toFixed(1) : null} / 10</p>
                    <div className='mt-20'>
                        <p className='budget'>
                            {movieDetails.budget ? 'Budget: ' + movieDetails.budget.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) : null}
                        </p>
                        <p className='budget'>
                            {movieDetails.revenue ? 'Revenue: ' + movieDetails.revenue.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) : null}
                        </p>
                    </div>
                    {movieDetails.genres ? <div className='genres'>{movieDetails.genres.map((genre) => {
                        return (
                            <span key={genre.id} className='genre'>{genre.name}</span>
                        )
                        })}</div> : null
                    }
                    <div className='status'>
                        {movieDetails.status === 'Released' ? <div className='circleGreen'></div> : <div className='circleRed'></div>}
                        <div>{movieDetails.status}</div>
                    </div>
                    <button className='backToTrending' onClick={() => navigate(-1)}>
                        <img src='/back.svg' alt='Go back' />
                        <div>Go back</div>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Details