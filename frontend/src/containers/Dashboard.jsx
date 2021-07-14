import React, { useReducer, useEffect, } from 'react';
import clsx from 'clsx';
import { makeStyles, ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';
import teal from '@material-ui/core/colors/teal';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { mainListItems, secondaryListItems } from './ListItems';
import styled from 'styled-components';

//components
import { HeaderParts } from './HeaderParts.jsx';
import { PieCharts } from './PieChart.jsx';
import { HoldingsList } from './HoldingsList.jsx';
import { Total_dividend } from './TotalDividend.jsx';
import { Level } from './Level.jsx';
// import { MyContext } from '../MyContext.js';

//reducers
import {
  initialState,
  holdingsActionTypes,
  holdingsReducer,
} from '../reducers/holdings';

//apis
import { fetchHoldings } from '../apis/holdings';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="">
        Haito-kun
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const drawerWidth = 240;

const theme = createMuiTheme({
  palette: {
    primary: teal,
    secondary: red,
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 300,
  },
}));

//CSS
const Background = styled.div`
  background-color: lightgrey;
`
// const GridWrapper = styled.div`
//   display: grid;
//   grid-template-rows: 300px 300px;
//   grid-template-columns: 400px 300px 1fr;
// `;

// const Chart = styled.div`
//   grid-row: 1 / 2;
//   grid-column: 1 / 2;
//   background-color: lightgrey;
//   padding: 3px;
//   margin: 10px;
//   /* margin-right: -350px; */
//   /* grid-template-rows: 30%; */
// `;

// const TotalWrapper = styled.div`
//   grid-row: 1 / 2;
//   grid-column: 2 / 3;
//   margin: 10px 0 10px 0;
//   padding: 30px 0 0 50px;
//   background-color: lightgrey;
// `;

// const LevelWrapper = styled.div`
//   grid-row: 1 / 2;
//   grid-column: 3 / 4;
//   margin: 10px;
//   padding: 10px 0 0 50px;
//   background-color: lightgrey;
// `;

// const ListWrapper = styled.div`
//   grid-row: 2 / 3;
//   grid-column: 1 / 4;
//   background-color: lightgrey;
//   margin: 0 10px 10px 10px;
//   padding: 0 0 100px 0;
// `;

export const HoldingsData = React.createContext()

export const Dashboard = ({
  match
  }) => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);
    const handleDrawerOpen = () => {
      setOpen(true);
    };
    const handleDrawerClose = () => {
      setOpen(false);
    };
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    const [holdingsState, dispatch] = useReducer(holdingsReducer, initialState);
    useEffect(() => {
      dispatch({ type: holdingsActionTypes.FETCHING});
      fetchHoldings(match.params.user_id)
      .then((data) => {
        dispatch({
          type: holdingsActionTypes.FETCH_SUCCESS,
          payload: {
            holdings: data[0].holdings
          }
        });
      })
    },[match.params.user_id])

  return(
    <ThemeProvider theme={theme}>
    {/* <Background> */}
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            <HeaderParts padding="{theme}.spacing(4)"/>
          </Typography>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>{ mainListItems }</List>
        <Divider />
        <List>{ secondaryListItems }</List>
      </Drawer>

      <HoldingsData.Provider value={{ holdingsState, dispatch }}>
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Container maxWidth="lg" className={classes.container}>
            <Grid container spacing={2}>
              {/* Chart */}
              <Grid item xs={12} md={2} lg={2}>
                <Paper className={fixedHeightPaper}>
                  <Total_dividend />
                </Paper>
              </Grid>
              <Grid item xs={12} md={4} lg={4}>
                <Paper className={fixedHeightPaper}>
                  <PieCharts />
                </Paper>
              </Grid>
              {/* Recent Deposits */}
              <Grid item xs={12} md={6} lg={6}>
                <Paper className={fixedHeightPaper}>
                  <Level />
                </Paper>
              </Grid>
              {/* Recent Orders */}
              <Grid item xs={12}>
                <Paper className={classes.paper}>
                  <HoldingsList />
                </Paper>
              </Grid>
            </Grid>
            <Box pt={4}>
              <Copyright />
            </Box>
          </Container>
        </main>
      </HoldingsData.Provider>
    </div>
    {/* </Background> */}
    </ThemeProvider>
  );

  //     <Background>

  //       <GridWrapper>
  //         <Chart>
  //           <PieCharts match={match}/>
  //         </Chart>
  //         <TotalWrapper>
  //         <Total_dividend match={match}/>
  //         </TotalWrapper>
  //         <LevelWrapper>
  //         <Level match={match}/>
  //         </LevelWrapper>
  //         <ListWrapper>
  //           <HoldingsList />
  //         </ListWrapper>
  //       </GridWrapper>

  //     </Background>
  //   </>
  // )
}