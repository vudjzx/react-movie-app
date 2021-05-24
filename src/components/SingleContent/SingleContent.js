import { Badge } from '@material-ui/core';
import React from 'react';
import { img_300, unavailable } from '../../config/config';
import ContentModal from '../ContentModal/ContentModal';
import "./SingleContent.css";
const SingleContent = ({
    id,
    poster,
    title,
    date,
    media,
    rating,
}) => {
    return (
        <ContentModal
        media={media}
        id={id}
        >
            <Badge 
            badgeContent={rating}
            color={rating>6?"primary":"secondary"}
            />
            <img className="poster" src={poster?`${img_300}${poster}`:unavailable} alt={title} />
            <b className="title">{title}</b>
            <span className="sub_title">
                {media!=="movie"?"Series":"Movie"}
                <span className="sub_title">
                    {date}
                </span>
            </span>
        </ContentModal>
    )
}

export default SingleContent
