import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import StarBorderOutlinedIcon from '@material-ui/icons/StarBorderOutlined';
import { CardMedia } from '@material-ui/core';


const useStyles = makeStyles({
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
});


function BodyCard(props) {
    const { title, text, imageUrl, externalUrl } = props;

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
                <Button size="small" onClick={() => {print();}}>Share</Button>
                <Button size="small" variant="contained" href={externalUrl} target="_blank">Learn More</Button>
                <IconButton aria-label="settings">
                    <StarBorderOutlinedIcon />
                </IconButton>

            </CardActions>
        </Card>
    )
}

export default BodyCard

