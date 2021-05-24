import { Button, createMuiTheme, Tab, Tabs, TextField, ThemeProvider } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import axios from 'axios';
import SingleContent from '../../components/SingleContent/SingleContent';
import CustomPagination from '../../components/Pagination/CustomPagination';
const Search = () => {
    const [type, setType] = useState(0);
    const [page, setPage] = useState(1);
    const [searchText, setSearchText] = useState("");
    const [content, setContent] = useState([]);
    const [numOfPages, setNumOfPages] = useState();

    const handleTabChange = (e, newValue)=>{
        setType(newValue);
        setPage(1);
    }

    const darkTheme = createMuiTheme({
        palette:{
            type: "dark",
            primary: {
                main: "#fff",
            },
        },
    });

    const fetchSearch = async()=>{
        const {data} = await axios.get(`https://api.themoviedb.org/3/search/${type?"tv":"movie"}?api_key=${process.env.REACT_APP_API_KEY}&query=${searchText}&page=${page}`);
        setContent(data.results);
        setNumOfPages(data.total_pages);
    }

    useEffect(()=>{
        window.scroll(0,0);
        if(searchText!==""){
            fetchSearch();
        }

    },[type,page]);

    return (
        <div>
            <ThemeProvider theme={darkTheme}>
                <div style={{display:"flex"}}>
                    <TextField
                    style={{flex:1}}
                    className="searchBox"
                    label="Search"
                    variant="filled"
                    onChange={(e)=>setSearchText(e.target.value)}
                    />
                    <Button
                    variant="contained" 
                    style={{ marginLeft: 10}}
                    onClick={fetchSearch}
                    > 
                        <SearchIcon/>
                    </Button> 
                </div>
                <Tabs
                value={type} 
                indicatorColor="primary" 
                textColor="primary"
                onChange={(e, newValue)=>handleTabChange(e,newValue)}
                >
                    <Tab style={{width:"50%"}} label="Search movies"></Tab>
                    <Tab style={{width:"50%"}} label="Search series"></Tab>
                </Tabs>
            </ThemeProvider>
            <div className="trending">
                {
                content && content.map((el)=>(
                    <SingleContent
                    key={el.id}
                    id={el.id}
                    poster={el.poster_path}
                    title={el.title || el.name}
                    date={el.release_date || el.first_air_date}
                    media={type?"tv":"movie"}
                    rating={el.vote_average}
                    />
                ))
                }
                {searchText&& content.length[0] && (type? <h1>No series found</h1>:<h1>No movies found</h1>)}
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

export default Search;
