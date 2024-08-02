/** @format */

import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';

const Toggle = ({ id, handleSetId, handleShowModalDelete }) => {
  const handleClick = () => {
    handleShowModalDelete();
    handleSetId(id);
  };
  return (
    <Dropdown>
      <Dropdown.Toggle id='dropdown-basic' className='bg-white text-dark no-border'>
        ...
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href={`/karyawan/update/${id}`}>update</Dropdown.Item>
        <Dropdown.Item onClick={handleClick}>Delete</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default Toggle;
