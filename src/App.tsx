import React, {useState} from 'react';
import AppHeader from "./components/AppHeader";
import {Container, createStyles, Grid, Theme, Toolbar} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import List from "./components/List";
import ListCard from "./components/ListCard";
import IList from "./models/IList";

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

function createList(id: number): IList {
  return {
    id,
    title: `List #${id}`,
    cards: Array.from({length: 4}, (v, k) => k)
      .map((_, index) =>
        ({id: parseInt(`${id}0${index}`, 10), title: `Card #${id}_1`})
      )
  }
}

export default function App() {
  const classes = useStyles();
  const [state, ] = useState([createList(1), createList(2)]);
  return (
    <div>
      <AppHeader/>
      <main>
        <Toolbar className={classes.toolbar} variant={"dense"}>

        </Toolbar>
        <Container maxWidth={"xl"} className={classes.container}>
          <Grid className={classes.gridContainer} container>
            {
              state.map(iList => (
                <Grid key={iList.id} item className={classes.gridItem}>
                  <List title={iList.title}>
                    {iList.cards.map(card => (
                      <ListCard title={card.title} key={card.id}/>
                    ))}
                  </List>
                </Grid>))
            }

          </Grid>
        </Container>
      </main>
    </div>
  );
}
