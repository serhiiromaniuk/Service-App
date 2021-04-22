import React from 'react'
import axios from 'axios'
import CssBaseline from '@material-ui/core/CssBaseline'
import EnhancedTable from './EnhancedTable'
import { backend } from '../Utils'
import AppPannel from '../AppPannel';

const Users = () => {
  const columns = React.useMemo(
    () => [
      {
        Header: 'Users info table',
        columns: [
          {
            Header: 'User Id',
            accessor: 'uuid',
          },
          {
            Header: 'Username',
            accessor: 'username',
          },
          {
            Header: 'Org Id',
            accessor: 'org_id'
          },
          {
            Header: 'Email',
            accessor: 'email',
          },
          {
            Header: 'Country',
            accessor: 'country',
          },
          {
            Header: 'Active',
            accessor: 'active',
          },
          {
            Header: 'Password',
            accessor: 'password',
          },
          {
            Header: 'Created At',
            accessor: 'created_at',
          },
          // {
          //   Header: 'Role',
          //   accessor: 'role',
          // }
        ],
      },
    ],
    []
  )
  
  const [ data, setData ] = React.useState([]);
  const getData = () => {
    axios.get(backend.get.list, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
      .then(function(res){
        return res
      })
      .then(function(data) {
        setData(data.data)
      });
  }

  React.useEffect(() => {
    getData()
  },[])

  const [skipPageReset, setSkipPageReset] = React.useState(false)
  const updateMyData = (rowIndex, columnId, value) => {

    setSkipPageReset(true)
    setData(old =>
      old.map((row, index) => {
        if (index === rowIndex) {
          return {
            ...old[rowIndex],
            [columnId]: value,
          }
        }
        return row
      })
    )
  }

  return (
    <div>
      <AppPannel/>
      <CssBaseline/>
      <EnhancedTable
        columns={columns}
        data={data}
        setData={setData}
        updateMyData={updateMyData}
        skipPageReset={skipPageReset}
      />
    </div>
  )
}

export default Users;
