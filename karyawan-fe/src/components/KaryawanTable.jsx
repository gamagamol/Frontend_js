/** @format */

import React from 'react';

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
  const date = new Date(isoDateString);
  const dateOnly = date.toISOString().split('T')[0];
  return dateOnly;
};

const KaryawanTable = (data) => {
  return (
    <div className='card mt-3'>
      <div className='card-body'>
        <div className='table-responsive'>
          <table className='table table-striped mb-0'>
            <thead>
              <tr className='text-center'>
                <th>Nama Karyawan</th>
                <th>Nomor Karyawan</th>
                <th>Jabatan</th>
                <th>Departemen</th>
                <th>Tanggal Masuk</th>
                <th>Photo</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {data.data.map((d) => {
                let classBadge;

                if (d.status == 'PROBATION') {
                  classBadge = 'badge badge-pill bg-primary';
                } else if (d.status == 'CONTRACT') {
                  classBadge = 'badge badge-pill bg-warning';
                } else {
                  classBadge = 'badge badge-pill bg-success';
                }
                return (
                  <tr key={d.id} className='text-center'>
                    <td>{d.nama}</td>
                    <td>{d.nomor}</td>
                    <td>{d.jabatan}</td>
                    <td>{d.department}</td>
                    <td>{DateSplit(d.tanggal_masuk)}</td>
                    <td>
                      <img src={checkUrl(d.foto)} alt='' style={{ width: '70px' }} />
                    </td>
                    <td>
                      <span className={classBadge}>{d.status}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default KaryawanTable;
