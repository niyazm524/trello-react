import React from 'react';
import AppHeader from "./components/AppHeader";
import {Grid, Container, createStyles, Theme, Toolbar} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import List from "./components/List";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    control: {
      padding: theme.spacing(2),
    },
    container: {
      padding: '0 3px',
      height: 'calc(100vh - 96px)'
    },
    gridContainer: {
      paddingTop: 10,
      height: '100%'
    },
    gridItem: {
      padding: '2px',
      overflow: 'hidden'
    },
    toolbar: {
      backgroundColor: 'rgba(77,92,143,0.42)'
    }
  }),
);

export default function App() {
  const classes = useStyles();
  return (
    <div>
      <AppHeader/>
      <main>
        <Toolbar className={classes.toolbar} variant={"dense"}>

        </Toolbar>
        <Container maxWidth={"xl"} className={classes.container}>
          <Grid className={classes.gridContainer} container>
            {[0, 1, 2].map((value) => (
              <Grid key={value} item className={classes.gridItem}>
                <List title={`Title #${value + 1}`} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
    </div>
  );
}
