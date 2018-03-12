# react-material-datatable
A basic aws amplify authenticator for reactjs built on material ui.


## Install
`npm install --save react-material-amplify-authenticator`

## Usage
More details to follow. This is still a work in progress.


Basic Usage:
```aidl
  import {...}
  
  
  const theme = createMuiTheme({
    palette: {
      primary: {
        main: process.env.REACT_APP_PRIMARY_MAIN || customTheme.palette.primary.main,
        light: process.env.REACT_APP_PRIMARY_LIGHT || customTheme.palette.primary.light,
        dark: process.env.REACT_APP_PRIMARY_DARK || customTheme.palette.primary.dark,
        contrastText: process.env.REACT_APP_PRIMARY_CONTRAST_TEXT || customTheme.palette.primary.contrastText
      },
      secondary: {
        main: process.env.REACT_APP_SECONDARY_MAIN || customTheme.palette.primary.main,
        light: process.env.REACT_APP_SECONDARY_LIGHT || customTheme.palette.primary.light,
        dark: process.env.REACT_APP_SECONDARY_DARK || customTheme.palette.primary.dark,
        contrastText: process.env.REACT_APP_PRIMARY_TEXT || customTheme.palette.primary.contrastText
      }
    }
  });
  
  Amplify.configure({
    Auth: {
      region: process.env.REACT_APP_AWS_AUTH_REGION, // REQUIRED - Amazon Cognito Region
      userPoolId: process.env.REACT_APP_USER_POOL_ID, // OPTIONAL - Amazon Cognito User Pool ID
      userPoolWebClientId: process.env.REACT_APP_CLIENT_APP_ID, // User Pool App Client ID
    },
  });
  
  class AppWithAuth extends React.Component {
  
    constructor(props, context) {
      super(props, context);
  
      this.state = {
        renderApp: false
      };
    }
  
  
    render() {
      return (
  
        <MuiThemeProvider theme={theme}>
          <Router>
            <Authenticator hideDefault={true} hide={[MainLayoutWrapper]}>
              <MainLayoutWrapper/>
            </Authenticator>
          </Router>
        </MuiThemeProvider>
  
      );
    }
  }
  
  const MainLayoutWrapper = (props) => {
    return (
      <DrawerLayout {...props} title={appName}>
          <Route
            path="/dashboard"
            component={DashboardContainer}
            icon={<Dashboard/>}
            title="Dashboard"
          />
      </DrawerLayout>
    );
  };
  
  
  const WithProvider = () => (
        <AppWithAuth/>
  );
  
  export default WithProvider;

```