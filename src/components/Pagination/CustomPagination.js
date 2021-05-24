import React from 'react';
import Pagination from "@material-ui/lab/Pagination";
import { createMuiTheme, ThemeProvider } from '@material-ui/core';

const darkTheme = createMuiTheme({
    palette:{
        type:"dark"
    },
});
const CustomPagination = ({setPage, pages=10}) => {
    const handlePageChange = (page) =>{
        setPage(page);
        window.scroll(0,0);
    }
    return (
        <div 
        style={{
            width:"100%",
            display:"flex",
            justifyContent:"center",
            marginTop:10
        }}
        >
            <ThemeProvider theme={darkTheme}>
                <Pagination
                color={"primary"}
                hideNextButton={true}
                hidePrevButton={true}
                count={pages} 
                onChange={(e)=> handlePageChange(e.target.textContent)}
                />
            </ThemeProvider>
            
        </div>
    )
}

export default CustomPagination
