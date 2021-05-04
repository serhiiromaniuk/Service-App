import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    margin: '30px',
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
    padding: '16px',
    fontColor: 'black'
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
    backgroundSize: '170px'
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto 0.5',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  }
}));

function CustomCard(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleName = () => {
    if (!!props.containerName) {
      return props.containerName; 
    } else { 
      return 'Your Container Name';
    }
  };
  
  const handleBody = () => {
    if (!!props.containerBody) { 
      return props.containerBody; 
    } else { 
        return 'Body is empty';
    }
  };

  const handleCreatedAt = () => {
    if (!!props.containerCreatedAt) { 
      // const timestamp = 'Created: ' + props.containerCreatedAt;
      const date = new Date(props.containerCreatedAt);
      return date.toUTCString();
    } else { 
        return 'Created at 0:00';
    }
  };

  return (
    <div>
        <Card className={classes.root}>
        <CardHeader
            subheader={handleName()}
        />
        <CardMedia
            className={classes.media}
            image={'images/newlock.svg'}
            title="Lock Image"
        />
        <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
              {handleCreatedAt()}
            </Typography>
        </CardContent>
        <CardActions disableSpacing>
            <IconButton
            className={clsx(classes.expand, {
                [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
            >
            <ExpandMoreIcon />
            </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
                <Typography paragraph>
                    {handleBody()}
                </Typography>
            </CardContent>
        </Collapse>
        </Card>
    </div>
  );
}

export default CustomCard;