import React from 'react'
import axios from 'axios';
import CssBaseline from '@material-ui/core/CssBaseline';
import EnhancedTable from './EnhancedTable';
import { api, opt } from '../../Utils';
import AppPannel from '../../AppPannel';
import { CustomTitle, CustomParagraph } from '../../Pages/Styles';

const Organisation = () => {
  const orgColumns = React.useMemo(
    () => [
      {
        Header: 'Organisations table',
        columns: [
          {
            Header: 'Organisation Id',
            accessor: 'id'
          },
          {
            Header: 'Organisation Name',
            accessor: 'org_name',
          },
          {
            Header: 'Organisation Country',
            accessor: 'org_country',
          },
          {
            Header: 'Created At',
            accessor: 'created_at',
          },
          {
            Header: 'Updated At',
            accessor: 'updated_at',
          }
        ]
      }
    ],
    []
  );

  const roleColumns = React.useMemo(
    () => [
      {
        Header: 'User roles table',
        columns: [
          {
            Header: 'Auth Role Id',
            accessor: 'id'
          },
          {
            Header: 'Auth Role Name',
            accessor: 'role',
          }
        ]
      }
    ],
    []
  );

  const blockColumns = React.useMemo(
    () => [
      {
        Header: 'Block Containers table',
        columns: [
          {
            Header: 'Container Id',
            accessor: 'id'
          },
          {
            Header: 'Container Name',
            accessor: 'name',
          },
          {
            Header: 'Container Body',
            accessor: 'body',
          },
          {
            Header: 'Created At',
            accessor: 'created_at',
          },
          {
            Header: 'Updated At',
            accessor: 'updated_at',
          }
        ]
      }
    ],
    []
  );
  
  const [ orgData, setOrgData ] = React.useState([]);
  const getOrgData = () => {
    axios.get(api.get.auth.org.list, opt)
      .then(
        function(res) {
          return res;
        }
      ).then(
        function(data) {
          setOrgData(data.data);
        }
      ).catch(
        function(error) {
            console.log(error.response.data)
            setOrgData([]);
        }
      );
  };

  React.useEffect(() => {
    getOrgData()
  },[])

  const [ roleData, setRoleData ] = React.useState([]);
  const getRoleData = () => {
    axios.get(api.get.auth.role.list, opt)
      .then(
        function(res) {
          return res;
        }
      ).then(
        function(data) {
          setRoleData(data.data);
        }
      ).catch(
        function(error) {
            console.log(error.response.data)
            setRoleData([]);
        }
      );
  };

  React.useEffect(() => {
    getRoleData()
  },[])
  
  const [ blockData, setBlockData ] = React.useState([]);
  const getBlockData = () => {
    axios.get(api.get.block.container.list, opt)
      .then(
        function(res) {
          return res;
        }
      ).then(
        function(data) {
          setBlockData(data.data);
        }
      ).catch(
        function(error) {
            console.log(error.response.data)
            setBlockData([]);
        }
      );
  };
  React.useEffect(() => {
    getBlockData()
  },[])
  
  const [skipPageReset, setSkipPageReset] = React.useState(false)
  const updateOrgData = (rowIndex, columnId, value) => {
    setSkipPageReset(true)
    setOrgData(old =>
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
  };

  const updateRoleData = (rowIndex, columnId, value) => {
    setSkipPageReset(true)
    setRoleData(old =>
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
  };

  const updateBlockData = (rowIndex, columnId, value) => {
    setSkipPageReset(true)
    setBlockData(old =>
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
  };

  return (
    <div>
      <AppPannel/>

      <CssBaseline/>
      <CustomTitle text='Organisations' />
      <EnhancedTable
        columns={orgColumns}
        data={orgData}
        setData={setOrgData}
        updateMyData={updateOrgData}
        skipPageReset={skipPageReset}
        selectedTable={'orgs'}
      />

      <CustomTitle text='User Container Blocks' />
      <EnhancedTable
        columns={blockColumns}
        data={blockData}
        setData={setBlockData}
        updateMyData={updateBlockData}
        skipPageReset={skipPageReset}
        selectedTable={'blocks'}
      />

      <CustomTitle text='Auth Roles' />
      <EnhancedTable
        columns={roleColumns}
        data={roleData}
        setData={setRoleData}
        updateMyData={updateRoleData}
        skipPageReset={skipPageReset}
        selectedTable={'roles'}
      />

    </div>
  );
}

export default Organisation;
