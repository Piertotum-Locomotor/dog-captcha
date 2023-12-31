import React from 'react';
import { makeStyles } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import { CardMedia } from '@mui/material';

import { useEffect,useState } from "react";


function BodyCard(props) {
    const { title, text, imageUrl, externalUrl } = props;

    const [fav, setFav] = useState(false);
    useEffect (() => {
        setFav(false);
    },[]);

    return(
        <Card sx={{ maxWidth: 345 }}>
            <CardMedia
                component="img"
                height="300"
                image={imageUrl} />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {text}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" variant="text" color="inherit" onClick={() => {print();}}>Share</Button>
                <Button size="small" variant="contained" color="inherit" href={externalUrl} target="_blank">Learn More</Button>
                
                <IconButton aria-label="settings" onClick={() => fav ? setFav(false) : setFav(true)}>
                   {fav ? <StarIcon /> : <StarBorderIcon />}
                </IconButton>
                

            </CardActions>
        </Card>
    )
}

export default BodyCard

