import React, { useReducer, useEffect, useState, Fragment, } from 'react';
import { makeStyles, ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import clsx from 'clsx';
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

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';

// Icons
import DashboardTwoToneIcon from '@material-ui/icons/DashboardTwoTone';
import HomeTwoToneIcon from '@material-ui/icons/HomeTwoTone';
import LibraryAddTwoToneIcon from '@material-ui/icons/LibraryAddTwoTone';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import AssignmentIcon from '@material-ui/icons/Assignment';

//components
import { HeaderParts } from './HeaderParts.jsx';
import { PieCharts } from './PieChart.jsx';
import { HoldingsList } from './HoldingsList.jsx';
import { Total_dividend } from './TotalDividend.jsx';
import { Level } from './Level.jsx';
import { AddDialog } from './AddDialog';

//reducers
import {
  initialState,
  holdingsActionTypes,
  holdingsReducer,
} from '../reducers/holdings';

//apis
import { fetchHoldings } from '../apis/holdings';

//constants
import { REQUEST_STATE } from '../constants';

import CircularProgress from "@material-ui/core/CircularProgress";
import Backdrop from "@material-ui/core/Backdrop";

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
    backgroundColor: 'lightgrey'
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
    backgroundColor: 'grey'
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
    backgroundColor: 'lightgrey'
  },
  fixedHeight: {
    height: 300,
  },
  backdrop: {
    color: "#fff"
  },
}));

// Context
export const HoldingsData = React.createContext()
export const UserIdData = React.createContext()

export const Dashboard = ({
  match
  }) => {
    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    // メニュードロワーの開閉
    const [drawerOpen, setDrawerOpen] = useState(false);
    const handleDrawerOpen = () => {
      setDrawerOpen(true);
    };
    const handleDrawerClose = () => {
      setDrawerOpen(false);
    };

    // 新規保有株追加ダイアログの開閉
    const [dialogOpen, setDialogOpen] = useState(false);
    const handleDialogOpen = () => {
      setDialogOpen(true);
    };
    const handleDialogClose = () => {
      setDialogOpen(false);
    };

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
      <Fragment>

            <div className={classes.root}>
              <CssBaseline />
              <AppBar position="absolute" className={clsx(classes.appBar, drawerOpen && classes.appBarShift)}>
                <Toolbar className={classes.toolbar}>
                  <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    className={clsx(classes.menuButton, drawerOpen && classes.menuButtonHidden)}
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
                  paper: clsx(classes.drawerPaper, !drawerOpen && classes.drawerPaperClose),
                }}
                open={drawerOpen}
              >
                <div className={classes.toolbarIcon}>
                  <IconButton onClick={handleDrawerClose}>
                    <ChevronLeftIcon />
                  </IconButton>
                </div>
                <Divider />
                <List>
                  <ListItem button>
                    <ListItemIcon>
                      <HomeTwoToneIcon />
                    </ListItemIcon>
                      <ListItemText primary="Haito-kunについて" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <DashboardTwoToneIcon />
                    </ListItemIcon>
                      <ListItemText primary="dashboard" />
                  </ListItem>
                  <ListItem button onClick={handleDialogOpen}>
                    <ListItemIcon>
                      <LibraryAddTwoToneIcon />
                    </ListItemIcon>
                      <ListItemText primary="保有株新規登録" />
                  </ListItem>
                </List>
                <Divider />
                <List>
                  <ListItem button>
                    <ListItemIcon>
                      <AssignmentIcon />
                    </ListItemIcon>
                    <ListItemText primary="Reports" />
                  </ListItem>
                </List>
              </Drawer>

              {/* {form} */}
              <HoldingsData.Provider value={{ holdingsState, dispatch }}>
                <main className={classes.content}>
                  <div className={classes.appBarSpacer} />
                  <Container maxWidth="lg" className={classes.container}>
                    <Grid container spacing={2}>
                      {/* 配当合計 */}
                      <Grid item xs={12} md={2} lg={2}>
                        <Paper className={fixedHeightPaper}>
                          <Total_dividend />
                        </Paper>
                      </Grid>
                      {/* 円グラフ */}
                      <Grid item xs={12} md={4} lg={4}>
                        <Paper className={fixedHeightPaper}>
                          <PieCharts />
                        </Paper>
                      </Grid>
                      {/* レベルメッセージ */}
                      <Grid item xs={12} md={6} lg={6}>
                        <Paper className={fixedHeightPaper}>
                          <Level />
                        </Paper>
                      </Grid>
                      {/* 保有株リスト */}
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
        {/* } */}
      </Fragment>
      <UserIdData.Provider value={{ match }}>
      <AddDialog isOpen={dialogOpen} doClose={() => handleDialogClose()}/>
          </UserIdData.Provider>
    </ThemeProvider>
  );
}