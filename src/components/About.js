const About = () => {
    return (
        <div className='aboutContainer'>
            <h2>About gomovies</h2>
            <p>
                Gomovies is an app built in React that allows you to guess the celebrity from a random picture given.
                The objective is to guess the celebrity and get the highest score.
                The app uses the <a href='https://www.themoviedb.org/' target='_blank' rel='noreferrer'> The Movie Database API </a>
                to fetch the movie pictures.
                You can also check out the trending movies and the movies by genre.
            </p>
            <div className='aboutDivLine'></div>
            <h2>Contact</h2>
            <p>
                If you have any questions or suggestions, please contact me at <a href='mailto:dante.jterranova463@gmail.com'> this email</a>.
            </p>
            <div className='aboutDivLine'></div>
            <h2>Socials</h2>
            <div className='socialMediaContainer'>
                <a href='https://github.com/BinaryJuan' target='_blank' rel='noreferrer'>
                    <img className='whiteSocial' src='/github.svg' alt='Github' />
                </a>
                <a href='https://www.linkedin.com/in/dante-terranova-2383361a4/' target='_blank' rel='noreferrer'>
                    <img className='whiteSocial' src='/linkedin.svg' alt='Linkedin' />
                </a>
            </div>
        </div>
    )
}

export default About