import { createTheme } from '@mui/material/styles';

export const createAppTheme = (isDarkMode) => {
    return createTheme({
        palette: {
            mode: isDarkMode ? 'dark' : 'light',
            primary: {
                main: isDarkMode ? '#ffffff' : '#37352f',
                light: isDarkMode ? '#f7f6f3' : '#6f6e69',
                dark: isDarkMode ? '#e1dfdd' : '#1a1a1a',
                contrastText: isDarkMode ? '#37352f' : '#ffffff',
            },
            secondary: {
                main: isDarkMode ? '#a6a6a6' : '#9b9a97',
                light: isDarkMode ? '#c4c4c4' : '#b8b7b4',
                dark: isDarkMode ? '#888888' : '#787774',
            },
            background: {
                default: isDarkMode ? '#191919' : '#ffffff',
                paper: isDarkMode ? '#252525' : '#ffffff',
            },
            text: {
                primary: isDarkMode ? '#ffffff' : '#37352f',
                secondary: isDarkMode ? '#a6a6a6' : '#9b9a97',
            },
            grey: {
                50: isDarkMode ? '#2a2a2a' : '#fbfbfa',
                100: isDarkMode ? '#333333' : '#f7f6f3',
                200: isDarkMode ? '#404040' : '#ebeae5',
                300: isDarkMode ? '#4d4d4d' : '#e1dfdd',
                400: isDarkMode ? '#666666' : '#c4c4c4',
                500: isDarkMode ? '#808080' : '#a6a6a6',
                600: isDarkMode ? '#999999' : '#9b9a97',
                700: isDarkMode ? '#b3b3b3' : '#787774',
                800: isDarkMode ? '#cccccc' : '#6f6e69',
                900: isDarkMode ? '#e6e6e6' : '#37352f',
            },
            error: {
                main: '#eb5757',
                light: '#f48989',
                dark: '#c84444',
            },
            warning: {
                main: '#f2994a',
                light: '#f5b573',
                dark: '#d87e38',
            },
            success: {
                main: '#27ae60',
                light: '#52c278',
                dark: '#1e8449',
            },
            info: {
                main: '#2d9cdb',
                light: '#56b3e3',
                dark: '#2485c7',
            },
        },
        typography: {
            fontFamily: [
                '-apple-system',
                'BlinkMacSystemFont',
                '"Segoe UI"',
                'Helvetica',
                '"Apple Color Emoji"',
                'Arial',
                'sans-serif',
                '"Segoe UI Emoji"',
                '"Segoe UI Symbol"',
            ].join(','),
            h1: {
                fontSize: '2.5rem',
                fontWeight: 700,
                letterSpacing: '-0.03em',
                lineHeight: 1.2,
            },
            h2: {
                fontSize: '2rem',
                fontWeight: 600,
                letterSpacing: '-0.02em',
                lineHeight: 1.3,
            },
            h3: {
                fontSize: '1.5rem',
                fontWeight: 600,
                letterSpacing: '-0.01em',
                lineHeight: 1.4,
            },
            h4: {
                fontSize: '1.25rem',
                fontWeight: 600,
                lineHeight: 1.4,
            },
            h5: {
                fontSize: '1.125rem',
                fontWeight: 600,
                lineHeight: 1.4,
            },
            h6: {
                fontSize: '1rem',
                fontWeight: 600,
                lineHeight: 1.4,
            },
            body1: {
                fontSize: '1rem',
                lineHeight: 1.5,
                color: isDarkMode ? '#ffffff' : '#37352f',
            },
            body2: {
                fontSize: '0.875rem',
                lineHeight: 1.4,
                color: isDarkMode ? '#a6a6a6' : '#9b9a97',
            },
            caption: {
                fontSize: '0.75rem',
                lineHeight: 1.4,
                color: isDarkMode ? '#a6a6a6' : '#9b9a97',
            },
            button: {
                textTransform: 'none',
                fontWeight: 500,
                fontSize: '0.875rem',
            },
        },
        shape: {
            borderRadius: 6,
        },
        components: {
            MuiButton: {
                styleOverrides: {
                    root: {
                        borderRadius: 6,
                        padding: '8px 12px',
                        fontSize: '0.875rem',
                        fontWeight: 500,
                        boxShadow: 'none',
                        textTransform: 'none',
                        minHeight: '32px',
                        '&:hover': {
                            boxShadow: 'none',
                        },
                    },
                    contained: {
                        backgroundColor: isDarkMode ? '#2383e2' : '#2383e2',
                        color: '#ffffff',
                        '&:hover': {
                            backgroundColor: isDarkMode ? '#1a6bc7' : '#1a6bc7',
                        },
                        '&:disabled': {
                            backgroundColor: isDarkMode ? '#404040' : '#e1dfdd',
                            color: isDarkMode ? '#666666' : '#9b9a97',
                        },
                    },
                    outlined: {
                        borderColor: isDarkMode ? '#404040' : '#e1dfdd',
                        color: isDarkMode ? '#ffffff' : '#37352f',
                        backgroundColor: 'transparent',
                        '&:hover': {
                            borderColor: isDarkMode ? '#4d4d4d' : '#c4c4c4',
                            backgroundColor: isDarkMode ? '#2a2a2a' : '#f7f6f3',
                        },
                    },
                    text: {
                        color: isDarkMode ? '#a6a6a6' : '#9b9a97',
                        '&:hover': {
                            backgroundColor: isDarkMode ? '#2a2a2a' : '#f7f6f3',
                        },
                    },
                },
            },
            MuiPaper: {
                styleOverrides: {
                    root: {
                        backgroundImage: 'none',
                        backgroundColor: isDarkMode ? '#252525' : '#ffffff',
                        border: `1px solid ${isDarkMode ? '#404040' : '#e1dfdd'}`,
                        boxShadow: isDarkMode 
                            ? '0 1px 3px rgba(0,0,0,0.3)' 
                            : '0 1px 3px rgba(15,15,15,0.1)',
                    },
                    elevation1: {
                        boxShadow: isDarkMode 
                            ? '0 1px 3px rgba(0,0,0,0.3)' 
                            : '0 1px 3px rgba(15,15,15,0.1)',
                    },
                },
            },
            MuiAppBar: {
                styleOverrides: {
                    root: {
                        backgroundColor: isDarkMode ? '#191919' : '#ffffff',
                        color: isDarkMode ? '#ffffff' : '#37352f',
                        boxShadow: 'none',
                        borderBottom: `1px solid ${isDarkMode ? '#404040' : '#e1dfdd'}`,
                        backdropFilter: 'blur(20px)',
                        background: isDarkMode 
                            ? 'rgba(25, 25, 25, 0.8)' 
                            : 'rgba(255, 255, 255, 0.8)',
                    },
                },
            },
            MuiTextField: {
                styleOverrides: {
                    root: {
                        '& .MuiOutlinedInput-root': {
                            borderRadius: 6,
                            backgroundColor: isDarkMode ? '#2a2a2a' : '#f7f6f3',
                            fontSize: '0.875rem',
                            '& fieldset': {
                                borderColor: 'transparent',
                            },
                            '&:hover fieldset': {
                                borderColor: isDarkMode ? '#4d4d4d' : '#c4c4c4',
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: '#2383e2',
                                borderWidth: 1,
                            },
                            '& input': {
                                padding: '10px 12px',
                                fontSize: '0.875rem',
                            },
                        },
                        '& .MuiInputLabel-root': {
                            color: isDarkMode ? '#a6a6a6' : '#9b9a97',
                            fontSize: '0.875rem',
                            '&.Mui-focused': {
                                color: '#2383e2',
                            },
                        },
                    },
                },
            },
            MuiChip: {
                styleOverrides: {
                    root: {
                        borderRadius: 4,
                        fontSize: '0.75rem',
                        height: 24,
                        fontWeight: 500,
                        backgroundColor: isDarkMode ? '#404040' : '#f7f6f3',
                        color: isDarkMode ? '#ffffff' : '#37352f',
                        border: 'none',
                    },
                    outlined: {
                        borderColor: isDarkMode ? '#404040' : '#e1dfdd',
                        backgroundColor: 'transparent',
                    },
                },
            },
            MuiTableCell: {
                styleOverrides: {
                    root: {
                        borderColor: isDarkMode ? '#404040' : '#e1dfdd',
                        padding: '12px 16px',
                        fontSize: '0.875rem',
                    },
                    head: {
                        backgroundColor: isDarkMode ? '#2a2a2a' : '#f7f6f3',
                        fontWeight: 600,
                        fontSize: '0.75rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        color: isDarkMode ? '#a6a6a6' : '#9b9a97',
                        height: '40px',
                    },
                },
            },
            MuiTableRow: {
                styleOverrides: {
                    root: {
                        '&:hover': {
                            backgroundColor: isDarkMode ? '#2a2a2a' : '#f7f6f3',
                        },
                    },
                },
            },
            MuiDialog: {
                styleOverrides: {
                    paper: {
                        borderRadius: 12,
                        backgroundColor: isDarkMode ? '#252525' : '#ffffff',
                        boxShadow: isDarkMode 
                            ? '0 10px 40px rgba(0,0,0,0.5)' 
                            : '0 10px 40px rgba(15,15,15,0.15)',
                    },
                },
            },
            MuiIconButton: {
                styleOverrides: {
                    root: {
                        borderRadius: 6,
                        padding: '6px',
                        '&:hover': {
                            backgroundColor: isDarkMode ? '#2a2a2a' : '#f7f6f3',
                        },
                    },
                },
            },
            MuiCard: {
                styleOverrides: {
                    root: {
                        borderRadius: 8,
                        border: `1px solid ${isDarkMode ? '#404040' : '#e1dfdd'}`,
                        boxShadow: 'none',
                        backgroundColor: isDarkMode ? '#252525' : '#ffffff',
                    },
                },
            },
        },
    });
};