import React from 'react'
import axios from 'axios'
import CssBaseline from '@material-ui/core/CssBaseline'
import EnhancedTable from './EnhancedTable'
import { api, opt } from '../../Utils'
import AppPannel from '../../AppPannel';
import { CustomTitle } from '../../Styles';

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
          {
            Header: 'Role Id',
            accessor: 'role_id',
          }
        ]
      }
    ],
    []
  )
  
  const [ data, setData ] = React.useState([]);
  const getData = () => {
    axios.get(api.get.auth.user.list, opt)
      .then(
        function(res) {
          return res;
        }
      )
      .then(
        function(data) {
          setData(data.data);
        }
      ).catch(
        function(error) {
            console.log(error.response.data)
            setData([]);
        }
      );
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
      <CustomTitle text='Users list' />
      <CssBaseline/>
      <EnhancedTable
        columns={columns}
        data={data}
        setData={setData}
        updateMyData={updateMyData}
        skipPageReset={skipPageReset}
      />
    </div>
  );
}

export default Users;
