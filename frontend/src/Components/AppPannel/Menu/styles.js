import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';

const linkStyle = {
    color: 'black', 
    textDecoration: 'none'
};
  
const StyledMenu = withStyles({
    paper: {
        border: '2px solid #00eccd',
        marginLeft: '5px'
    },})((props) => (
    <Menu
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
        }}
        transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
        }}
        {...props}
    />
));

const StyledMenuItem = withStyles((theme) => ({
    root: {
        '&:focus': {
        backgroundColor: '#00eccd',
        '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
            color: theme.palette.common.white,
        }
        }
    }
}))(MenuItem);

export {
    linkStyle,
    StyledMenu,
    StyledMenuItem
};