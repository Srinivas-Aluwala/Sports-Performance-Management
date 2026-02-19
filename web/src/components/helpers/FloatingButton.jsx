import React from 'react';
import { Fab } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

function FloatingButton() {
  return (
    <Fab style={{minWidth: '50px'}} color="primary" aria-label="edit">
      <EditIcon />
    </Fab>
  );
}

export default FloatingButton;
