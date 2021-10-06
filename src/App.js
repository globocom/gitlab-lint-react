// Copyright (c) 2021, Marcelo Jorge Vieira
// Licensed under the BSD 3-Clause License

import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {
  createMuiTheme,
  makeStyles,
  MuiThemeProvider,
} from "@material-ui/core/styles";
import {
  AppBar,
  Button,
  Container,
  CssBaseline,
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

const useStyles = makeStyles(() => ({
  title: {
    flexGrow: 1,
  },
  main: {
    paddingTop: 24,
  },
}));

const gloBlue = "#0669de";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: gloBlue,
    },
    secondary: {
      main: "#dc004e",
    },
    primary1Color: gloBlue,
    type: "light",
  },
  typography: {
    useNextVariants: true,
  },
});

const App = () => {
  const classes = useStyles();

  return (
    <Router>
      <MuiThemeProvider theme={theme}>
        <div className={classes.root}>
          <CssBaseline />
          <AppBar position="static" color="primary">
            <Container maxWidth="lg">
              <Toolbar>
                <Typography
                  component="a"
                  color="inherit"
                  variant="h6"
                  style={{ textDecoration: "none", textTransform: "uppercase" }}
                  className={classes.title}
                  href="/"
                >
                  gitlab-lint
                </Typography>
                <Button color="inherit" href="/rules">
                  Rules
                </Button>
                <Button color="inherit" href="/projects">
                  Projects
                </Button>
                <Button color="inherit" href="/levels">
                  Levels
                </Button>
                <Button color="inherit" href="/about">
                  About
                </Button>
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
