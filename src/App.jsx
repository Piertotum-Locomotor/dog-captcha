import './App.css';
  import { Grid } from '@material-ui/core';

  import Header from './components/Header';
  import Content from './components/Content';
  import DogCaptchaDialog  from "./components/DogCaptchaDialog";
  
  function App() {
    return (
        <Grid container direction="column">
        <Grid item>
          <Header />
          <DogCaptchaDialog />
        </Grid>
        <Grid item container>
          <Grid sm={2} />
          <Grid xs={12} sm={8}>
            <Content />
          </Grid>
          <Grid sm={2} />
        </Grid>
      </Grid>
    );
  }
  
  export default App;
  