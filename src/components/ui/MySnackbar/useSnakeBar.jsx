// useSnackbar.js
import React, { createContext, useContext, useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import { Alert } from '@mui/material';

// Snackbar context
const SnackbarContext = createContext();

// Snackbar provider
const SnackbarProvider = ({ children }) => {
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

    const showSnackbar = (message, severity = 'success') => {
        setSnackbar({ open: true, message, severity });
    };

    const closeSnackbar = () => {
        setSnackbar({ ...snackbar, open: false });
    };

    return (
        <SnackbarContext.Provider
            value={{
                snackbar,
                showSnackbar,
                closeSnackbar,
            }}
        >
            {children}
        </SnackbarContext.Provider>
    );
};
//   // Use an effect to handle auto-closing the Snackbar
//   useEffect(() => {
//     if (snackbar.open) {
//       const timer = setTimeout(() => {
//         closeSnackbar();
//       }, 3000);

//       return () => {
//         clearTimeout(timer);
//       };
//     }
//   }, [snackbar, closeSnackbar]);
// Snackbar component
const MySnackbar = () => {
    const { snackbar, closeSnackbar } = useContext(SnackbarContext);

    return (
        <Snackbar
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            open={snackbar.open} autoHideDuration={3000} onClose={closeSnackbar}>
            <Alert onClose={closeSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
                {snackbar.message}
            </Alert>
        </Snackbar>
    );
};

// Custom hook
const useSnackbar = () => {
    const context = useContext(SnackbarContext);

    if (!context) {
        throw new Error('useSnackbar must be used within a SnackbarProvider');
    }

    return context;
};

export { SnackbarProvider, MySnackbar, useSnackbar };
