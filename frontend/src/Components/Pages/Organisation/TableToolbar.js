import React from 'react'

import AddOrgDialog from './AddOrgDialog'
// import AddBlockContDialog from './AddBlockContDialog'
import clsx from 'clsx'
import DeleteIcon from '@material-ui/icons/Delete'
import GlobalFilter from './GlobalFilter'
import IconButton from '@material-ui/core/IconButton'
import { lighten, makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Tooltip from '@material-ui/core/Tooltip'

const useToolbarStyles = makeStyles(theme => ({
  root: {
    paddingLeft: theme.spacing(),
    paddingRight: theme.spacing(),
    marginLeft: theme.spacing(150)
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 1),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: '1 1 100%',
  },
}))

const TableToolbar = props => {
  const classes = useToolbarStyles()
  const {
    numSelected,
    addHandler,
    deleteUserHandler,
    preGlobalFilteredRows,
    setGlobalFilter,
    globalFilter,
    selectedTable
  } = props;
  if (selectedTable === 'orgs') {
      return (
        <Toolbar
          className={clsx(classes.root, {
            [classes.highlight]: numSelected > 0,
          })}
        >
          <AddOrgDialog addHandler={addHandler} />
          {numSelected > 0 ? (
            <Typography
              className={classes.title}
              color="inherit"
              variant="h6" 
            >
              {numSelected} selected
            </Typography>
          ) : (
            <Typography 
              className={classes.title} 
              variant="h6" 
              id="tableTitle"
            >
              {numSelected} selected
            </Typography>
          )}
            <GlobalFilter
              preGlobalFilteredRows={preGlobalFilteredRows}
              globalFilter={globalFilter}
              setGlobalFilter={setGlobalFilter}
            />
          {/* {numSelected > 0 ? (
            <Tooltip title="Delete">
              <IconButton aria-label="delete" onClick={deleteUserHandler}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          ) : (
            <GlobalFilter
              preGlobalFilteredRows={preGlobalFilteredRows}
              globalFilter={globalFilter}
              setGlobalFilter={setGlobalFilter}
            />
          )} */}
        </Toolbar>
      );
    } else if ( selectedTable === 'blocks') {
      return (
        <Toolbar
          className={clsx(classes.root, {
            [classes.highlight]: numSelected > 0,
          })}
        >
          {/* <AddBlockContDialog addHandler={addHandler} /> */}
          {numSelected > 0 ? (
            <Typography
              className={classes.title}
              color="inherit"
              variant="h6" 
            >
              {numSelected} selected
            </Typography>
          ) : (
            <Typography 
              className={classes.title} 
              variant="h6" 
              id="tableTitle"
            >
              {numSelected} selected
            </Typography>
          )}
            <GlobalFilter
              preGlobalFilteredRows={preGlobalFilteredRows}
              globalFilter={globalFilter}
              setGlobalFilter={setGlobalFilter}
            />
          {/* {numSelected > 0 ? (
            <Tooltip title="Delete">
              <IconButton aria-label="delete" onClick={deleteUserHandler}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          ) : (
            <GlobalFilter
              preGlobalFilteredRows={preGlobalFilteredRows}
              globalFilter={globalFilter}
              setGlobalFilter={setGlobalFilter}
            />
          )} */}
        </Toolbar>
      );
    } else if ( selectedTable === 'roles') {
      return (
        <Toolbar
          className={clsx(classes.root, {
            [classes.highlight]: numSelected > 0,
          })}
        >
          {numSelected > 0 ? (
            <Typography
              className={classes.title}
              color="inherit"
              variant="h6"
            >
              {numSelected} selected
            </Typography>
          ) : (
            <Typography 
              className={classes.title} 
              variant="h6" 
              id="tableTitle"
            >
              {numSelected} selected
            </Typography>
          )}
    
            <GlobalFilter
              preGlobalFilteredRows={preGlobalFilteredRows}
              globalFilter={globalFilter}
              setGlobalFilter={setGlobalFilter}
            />
          {/* {numSelected > 0 ? (
            <Tooltip title="Delete">
              <IconButton aria-label="delete" onClick={deleteUserHandler}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          ) : (
            <GlobalFilter
              preGlobalFilteredRows={preGlobalFilteredRows}
              globalFilter={globalFilter}
              setGlobalFilter={setGlobalFilter}
            />
          )} */}
        </Toolbar>
      );
    }
}


TableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  addHandler: PropTypes.func.isRequired,
  deleteUserHandler: PropTypes.func.isRequired,
  setGlobalFilter: PropTypes.func.isRequired,
  preGlobalFilteredRows: PropTypes.array.isRequired,
  globalFilter: PropTypes.string.isRequired,
  selectedTable: PropTypes.string.isRequired
}

export default TableToolbar;
