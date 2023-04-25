import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Alert } from '@mui/material';

const MySnackbar = ({ open, handleClose, message, variant }) => {
    const action = (
        <React.Fragment>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );
    return (
        <Snackbar
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            open={open}
            autoHideDuration={3000}
            onClose={handleClose}
            action={action}
        >
            <Alert variant="filled"  onClose={handleClose} severity={variant} sx={{ width: '100%' }}>
                {message}
            </Alert>
        </Snackbar>
    );
};

export default MySnackbar;