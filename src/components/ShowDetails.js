import axios from 'axios'
import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Loading from './Loading'

const ShowDetails = ({backUrl}) => {
    const { id } = useParams()
    const [showDetails, setShowDetails] = useState({})
    const [showCast, setShowCast] = useState({})
    
    const getShowDetails = async () => {
        const options = {
            method: 'GET',
            url: `https://api.themoviedb.org/3/tv/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
        }
        try {
            const response = await axios.request(options)
            setShowDetails(response.data)
            await getShowCast()
        } catch (error) {
            console.log(error)
        }
    }

    const getShowCast = async () => {
        const options = {
            method: 'GET',
            url: `https://api.themoviedb.org/3/tv/${id}/credits?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
        }
        try {
            const response = await axios.request(options)
            const orderedCast = response.data.cast.sort((a, b) => b.popularity - a.popularity).slice(0, 5).map(actor => actor.name)
            setShowCast(orderedCast)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getShowDetails()
    }, [])

    return (
        <div className='movieDetails'>
            {showDetails ? null : <Loading />}
            <div className='details'>
                <img src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${showDetails.backdrop_path}`} alt={showDetails.title} />
                <div className='information'>
                    <h2>{showDetails.name} <span className='movieDuration'>({showDetails.number_of_seasons} {showDetails.number_of_seasons > 1 ? 'seasons' : 'season'}, {showDetails.number_of_episodes} {showDetails.number_of_episodes > 1 ? 'episodes' : 'episode'})</span></h2>
                    <p className='rdate'>{showDetails.first_air_date} | {showDetails.last_air_date}</p>
                    <p className='detailOverview'>{showDetails.overview}</p>
                    {showCast.length > 0 ? <p className='cast'>Cast: {showCast.join(', ')}</p> : null}
                    <p className='voteAvg'>⭐ Vote average: {showDetails.vote_average ? showDetails.vote_average.toFixed(1) : null} / 10</p>
                    {showDetails.genres ? <div className='genres'>{showDetails.genres.map((genre) => {
                        return (
                            <span key={genre.id} className='genre'>{genre.name}</span>
                        )
                        })}</div> : null
                    }
                    {showDetails.in_production ? <p className='status yellow'>Status: in production</p> : <p className='status grey'>Status: ended</p>}
                    <Link className='backToTrending' to={backUrl}>
                        <img src='/back.svg' alt='Go back' />
                        <div>Go back</div>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default ShowDetails