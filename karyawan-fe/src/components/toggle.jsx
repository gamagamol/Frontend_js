/** @format */

import React, { forwardRef } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { createPortal } from 'react-dom';

// Create a custom menu component with forwardRef
const CustomMenu = forwardRef(({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {
  return createPortal(
    <div ref={ref} style={style} className={className} aria-labelledby={labeledBy}>
      {children}
    </div>,
    document.body
  );
});

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

      <Dropdown.Menu as={CustomMenu}>
        <Dropdown.Item href={`/karyawan/update/${id}`}>Update</Dropdown.Item>
        <Dropdown.Item onClick={handleClick}>Delete</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default Toggle;
