import axios from 'axios';
import React, {useState, useEffect} from 'react';
import CustomPagination from '../../components/Pagination/CustomPagination';
import SingleContent from '../../components/SingleContent/SingleContent';
import "./Trending.css";

const Trending = () => {
    const [content, setContent] = useState([]);
    const [page, setPage] = useState(1);
    const fetchTrending = async() =>{
        const {data} = await axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`);
        setContent(data.results);
    }

    useEffect(()=>{
        fetchTrending();
    },[page])
    return (
        <div>
            <span className="page_title">Trending</span>
            <div className="trending">
                {
                content && content.map((el)=>(
                    <SingleContent
                    key={el.id}
                    id={el.id}
                    poster={el.poster_path}
                    title={el.title || el.name}
                    date={el.release_date || el.first_air_date}
                    media={el.media_type}
                    rating={el.vote_average}
                    />
                ))
                }
            </div>
            <CustomPagination
            setPage={setPage}
            />
        </div>
    )
}

export default Trending;
