import React from 'react'

import CssBaseline from '@material-ui/core/CssBaseline'
import MaUTable from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import axios from 'axios';
import { useTable } from 'react-table';
import { backend_url } from '../../utils';

function Table({ columns, data }) {
  // Use the state and functions returned from useTable to build your UI
  const { getTableProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data
  });

  // Render the UI for your table
  return (
    <MaUTable {...getTableProps()}>
      <TableHead>
        {headerGroups.map(headerGroup => (
          <TableRow {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <TableCell {...column.getHeaderProps()}>
                {column.render('Header')}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableHead>
      <TableBody>
        {rows.map((row, i) => {
          prepareRow(row)
          return (
            <TableRow {...row.getRowProps()}>
              {row.cells.map(cell => {
                return (
                  <TableCell {...cell.getCellProps()}>
                    {cell.render('Cell')}
                  </TableCell>
                )
              })}
            </TableRow>
          )
        })}
      </TableBody>
    </MaUTable>
  )
}

function Users() {
  const columns = React.useMemo(
    () => [
      {
        Header: 'Users info table',
        columns: [
          {
            Header: 'Id',
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
            Header: 'Avtive',
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
            Header: 'Role',
            accessor: 'role',
          }
        ],
      },
    ],
    []
  )

  const url = backend_url + 'auth/list';
  var data = [];

  async function getRequest() {
    const res = await axios.get(url);
    for (let i = 0; i < res.data.length; i++) {
      data.push(JSON.stringify(res.data[i]));
    }
  }

  getRequest();
  // console.log(data);
  // eslint-disable-next-line 
  const table_data = React.useMemo(() => data, [])

  return (
      <div>
        <CssBaseline />
        <Table columns={columns} data={table_data} />
      </div>
    );
}

export default Users;
