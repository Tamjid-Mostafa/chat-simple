import * as React from 'react';
import Alert from '@mui/material/Alert';

export default function ActionAlert({ message, severity, variant, setData }) {
  return (
    <div className='absolute bottom-5 right-5'>
      <Alert
      variant={variant}
      severity={severity}
      onClose={() => {}}>{message}</Alert>
    </div>
  );
}