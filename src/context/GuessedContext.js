import { createContext, useState, useEffect } from 'react'

export const MoviesContext = createContext()

export const MoviesContextProvider = ({children}) => {
    const [movieCount, setMovieCount] = useState(0)
    const getScore = () => {
        const score = localStorage.getItem('score')
        if (score) {
            setMovieCount(parseInt(score))
        }
    }
    
    useEffect(() => {
        getScore()
    }, [])

    return (
        <MoviesContext.Provider value={[movieCount, setMovieCount]}>
            {children}
        </MoviesContext.Provider>
    )
}