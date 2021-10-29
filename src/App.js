// Copyright (c) 2021, Marcelo Jorge Vieira
// Licensed under the BSD 3-Clause License

import React, { useEffect, useReducer, useMemo } from "react";
import { HashRouter as Router, Link, Route, Switch } from "react-router-dom";
import {
  createTheme,
  makeStyles,
  MuiThemeProvider,
} from "@material-ui/core/styles";
import {
  AppBar,
  Button,
  Container,
  CssBaseline,
  IconButton,
  Toolbar,
  Typography,
} from "@material-ui/core";

import Dashboard from "./dashboard/Dashboard";
import NotFound from "./not_found/NotFound";
import Project from "./projects/Project";
import Projects from "./projects/Projects";
import Rule from "./rules/Rule";
import Rules from "./rules/Rules";
import Levels from "./levels/Levels";
import About from "./about/About";
import { Brightness4, Brightness7 } from "@material-ui/icons";

const useStyles = makeStyles(() => ({
  title: {
    flexGrow: 1,
  },
  main: {
    paddingTop: 24,
  },
}));

const gloBlue = "#0669de";

const initialState = { mode: "light" };

const initializer = (initialValue = initialState) =>
  JSON.parse(localStorage.getItem("state")) || initialValue;

function reducer(state, action) {
  switch (action.type) {
    case "toggle":
      return { mode: state.mode === "light" ? "dark" : "light" };
    default:
      throw new Error();
  }
}

const App = () => {
  const classes = useStyles();
  const [state, dispatch] = useReducer(reducer, initialState, initializer);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          ...(state.mode === "light"
            ? {
                // light mode
                primary: {
                  main: gloBlue,
                },
                secondary: {
                  main: gloBlue,
                },
                primary1Color: gloBlue,
                type: state.mode,
              }
            : {
                // dark mode
                primary: {
                  main: "#07366E",
                },
                secondary: {
                  main: gloBlue,
                },
                background: {
                  default: "#020c18",
                  paper: "#05182E",
                },
                primary1Color: gloBlue,
                type: state.mode,
              }),
        },
        typography: {
          useNextVariants: true,
        },
      }),
    [state.mode]
  );

  useEffect(() => {
    localStorage.setItem("state", JSON.stringify(state));
  }, [state]);

  return (
    <Router>
      <MuiThemeProvider theme={theme}>
        <div className={classes.root}>
          <CssBaseline />
          <AppBar position="static" color="primary">
            <Container maxWidth="lg">
              <Toolbar>
                <Typography
                  component={Link}
                  color="inherit"
                  variant="h6"
                  className={classes.title}
                  to="/"
                >
                  gitlab-lint
                </Typography>
                <Button component={Link} color="inherit" to="/rules">
                  Rules
                </Button>
                <Button component={Link} color="inherit" to="/projects">
                  Projects
                </Button>
                <Button component={Link} color="inherit" to="/levels">
                  Levels
                </Button>
                <Button component={Link} color="inherit" to="/about">
                  About
                </Button>
                <IconButton
                  onClick={() => dispatch({ type: "toggle" })}
                  color="inherit"
                >
                  {theme.palette.type === "dark" ? (
                    <Brightness4 />
                  ) : (
                    <Brightness7 />
                  )}
                </IconButton>
              </Toolbar>
            </Container>
          </AppBar>
          <main className={classes.main}>
            <Container maxWidth="lg">
              <Switch>
                <Route exact path="/rules/:id">
                  <Rule />
                </Route>
                <Route exact path="/rules">
                  <Rules />
                </Route>
                <Route exact path="/projects/:id">
                  <Project />
                </Route>
                <Route exact path="/projects">
                  <Projects />
                </Route>
                <Route exact path="/levels">
                  <Levels />
                </Route>
                <Route exact path="/about">
                  <About />
                </Route>
                <Route exact path="/">
                  <Dashboard />
                </Route>
                <Route path={"*"} component={NotFound} />
              </Switch>
            </Container>
          </main>
        </div>
      </MuiThemeProvider>
    </Router>
  );
};

export default App;
