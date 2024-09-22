import { alpha, createTheme } from '@mui/material';

declare module '@mui/material/styles' {
    interface Palette {
        purple?: string;
        dark?: string;
        green?: string;
        lightGrey?: string;
    }
  
    interface PaletteOptions {
        purple?: string;
        dark?: string;
        green?: string;
        lightGrey?: string;
    }
  }

const theme = createTheme({
	typography: {
		fontFamily: 'JetBrainsMono-Bold, JetBrainsMono-Medium, JetBrainsMono-Regular',
		fontWeightBold: 700,
		fontWeightMedium: 500,
		fontWeightRegular: 400,
		h1: { fontSize: 24 },
		h2: { fontSize: 22 },
		h3: { fontSize: 20 },
		h4: { fontSize: 18 },
		h5: { fontSize: 16 },
		h6: { fontSize: 14 },
		subtitle1: { fontSize: 12 },
	},
        palette: {
          primary: { 
            main: '#FFFFFF',
          },
          error: {
            main: '#FF0000',
          },
          secondary: { 
            main: alpha('#FFFFFF', 0.75),
          },
          common: {
            white: '#FFFFFF',
            black: '#000000',
          },
          dark: '#161616',
          lightGrey: '#343434',
          background: {
            default: '#161616',
          },
          purple: '#AE7AFF',
          green: '#98E9AB',
        },
        breakpoints: {
          values: {
            xs: 0,
            sm: 600,
            md: 900,
            lg: 1200,
            xl: 1536,
          },
        },
        components: {
          MuiButton: {
            styleOverrides: {
              root: {
                backgroundColor: '#AE7AFF',
                borderRadius: 0,
                ':hover': {
                  backgroundColor: '#343434',
                },
              },
            },
          },
        }
	},
);

export default theme;
