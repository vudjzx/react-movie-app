import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Genres from '../../components/Genres';
import CustomPagination from '../../components/Pagination/CustomPagination';
import SingleContent from '../../components/SingleContent/SingleContent';
import useGenres from '../../hooks/useGenre';

const Series = () => {
    const [content, setContent] = useState([]);
    const [numOfPages, setNumOfPages] = useState();
    const [page, setPage] = useState(1);
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [genres, setGenres] = useState([]);
    const genreURL = useGenres(selectedGenres);
    const fetchSeries = async()=>{
        const {data} = await axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&page=${page}&with_genres=${genreURL}`);
        setContent(data.results);
        setNumOfPages(data.total_pages);
    }
    useEffect(() => {
        fetchSeries();
    }, [page,genreURL])
    return (
        <div>
            <span className="page_title">Series</span>
            <Genres
            type="tv"
            selectedGenres={selectedGenres}
            setSelectedGenres={setSelectedGenres}
            genres={genres}
            setGenres={setGenres}
            setPage={setPage}
            />
            <div className="trending">
                {
                content && content.map((el)=>(
                    <SingleContent
                    key={el.id}
                    id={el.id}
                    poster={el.poster_path}
                    title={el.title || el.name}
                    date={el.release_date || el.first_air_date}
                    media='series'
                    rating={el.vote_average}
                    />
                ))
                }
            </div>
            {numOfPages>1 && (
                <CustomPagination
                setPage={setPage}
                pages={numOfPages}
                />
            )}
        </div>
    )
}

export default Series;
