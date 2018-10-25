# react-material-amplify-authenticator
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
  
  const REACT_APP_AWS_AUTH_REGION = process.env.REACT_APP_AWS_AUTH_REGION;
  const REACT_APP_USER_POOL_ID = process.env.REACT_APP_USER_POOL_ID;
  const REACT_APP_CLIENT_APP_ID = process.env.REACT_APP_CLIENT_APP_ID;
  
  Amplify.configure({
    Auth: {
      region: REACT_APP_AWS_AUTH_REGION, // REQUIRED - Amazon Cognito Region
      userPoolId: REACT_APP_USER_POOL_ID, // OPTIONAL - Amazon Cognito User Pool ID
      userPoolWebClientId: REACT_APP_CLIENT_APP_ID, // User Pool App Client ID
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
                  <Authenticator
                    hideDefault={true}
                    hide={[MainLayoutWrapper]}
                    awsAuthRegion={REACT_APP_AWS_AUTH_REGION}
                    userPoolId={REACT_APP_USER_POOL_ID}
                    clientAppId={REACT_APP_CLIENT_APP_ID}
                  >
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
