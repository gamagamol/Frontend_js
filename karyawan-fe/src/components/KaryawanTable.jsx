/** @format */

import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import React,{useState} from 'react';
import Toggle from './toggle';

const checkUrl = (url) => {
  const regex = /^http|https/;
  const match = url.match(regex);
  if (!match) {
    return `http://localhost:3000/uploads/${url}`;
  } else {
    return url;
  }
};

const DateSplit = (isoDateString) => {
  if (!isoDateString) return '';
  const date = new Date(isoDateString);
  const dateOnly = date.toISOString().split('T')[0];
  return dateOnly;
};

const columns = [
  { field: 'nama', headerName: 'Nama Karyawan', width: 150, filterable: true },
  { field: 'nomor', headerName: 'Nomor Karyawan', width: 150, filterable: true },
  { field: 'jabatan', headerName: 'Jabatan', width: 150, filterable: true },
  { field: 'department', headerName: 'Departemen', width: 150, filterable: true },
  {
    field: 'tanggal_masuk',
    headerName: 'Tanggal Masuk',
    width: 150,
    valueGetter: (params) => DateSplit(params),
    filterable: true,
  },
  {
    field: 'foto',
    headerName: 'Photo',
    width: 100,
    renderCell: (params) => <img src={checkUrl(params.value)} alt='' style={{ width: '70px' }} />,
  },
  {
    field: 'status',
    headerName: 'Status',
    width: 150,
    renderCell: (params) => {
      let classBadge;
      if (params.value === 'PROBATION') {
        classBadge = 'badge badge-pill bg-primary';
      } else if (params.value === 'CONTRACT') {
        classBadge = 'badge badge-pill bg-warning';
      } else {
        classBadge = 'badge badge-pill bg-success';
      }
      return <span className={classBadge}>{params.value}</span>;
    },
    filterable: true,
  },
  {
    field: 'actions',
    headerName: '',
    width: 150,
    renderCell: (params) => <Toggle id={params.row.id} handleSetId={params.row.handleSetId} handleShowModalDelete={params.row.handleShowModalDelete} />,
  },
];

const KaryawanTable = ({ data, handleSetId, handleShowModalDelete }) => {
  const [filterModel, setFilterModel] = useState({
    items: [],
  });

  const rows = data.map((d) => ({
    ...d,
    handleSetId,
    handleShowModalDelete,
  }));

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        filterModel={filterModel}
        onFilterModelChange={(model) => setFilterModel(model)}
        components={{
          Toolbar: GridToolbar,
        }}
        componentsProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
          },
        }}
      />
    </div>
  );
};

export default KaryawanTable;

