export interface ITheme {
  color: {
    primary: string;
    darkPrimary: string;

    black: string;
    
    white: string;
    lightGrey: string;
    gray: string;
    red: string;
  };
}

const theme: ITheme = {
  color: {
    primary: '#0095ff',
    darkPrimary: '#07C',

    black: '#1B1F3B',
    
    white: '#ffffff',
    gray: 'rgba(0, 0, 0, 0.25)',
    lightGrey: '#ededed',

    red: '#E62652',
  }
};

export default theme;
