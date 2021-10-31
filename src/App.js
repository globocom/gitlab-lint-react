// Copyright (c) 2021, Marcelo Jorge Vieira
// Licensed under the BSD 3-Clause License

import React, { useEffect, useReducer, useMemo } from "react";
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
  IconButton,
  Toolbar,
  Typography,
} from "@material-ui/core";

import { Menu, Close } from "@material-ui/icons";

import Dashboard from "./dashboard/Dashboard";
import NotFound from "./not_found/NotFound";
import Project from "./projects/Project";
import Projects from "./projects/Projects";
import Rule from "./rules/Rule";
import Rules from "./rules/Rules";
import Levels from "./levels/Levels";
import About from "./about/About";
import { Brightness4, Brightness7 } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  title: {
    minHeight: "56px",
    lineHeight: "56px",
    textDecoration: "none",
  },
  navLinks: {
    display: "block",

    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
  navLinksMobile: {
    display: "flex",
    flexDirection: "row",
    width: "unset",

    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
      width: "100%",

      "& > a": {
        borderBottom: "1px solid rgba(225, 225, 225, 0.4)",
        borderRadius: "unset",
        padding: "10px",

        "&:last-child": {
          border: "none",
        },
      },
    },
  },
  mobileMenuIcon: {
    display: "none",

    [theme.breakpoints.down("xs")]: {
      display: "block",
      background: "none",
      border: "none",
      color: "white",
      cursor: "pointer",
      position: "absolute",
      top: "16px",
      right: "8px",
    },
  },
  dFlex: {
    display: "flex",
    justifyContent: "space-between",

    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
    },
  },
  IconButton: {
    order: 1,

    [theme.breakpoints.down("xs")]: {
      position: "absolute",
      top: 0,
      left: "8px",
    },
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
      createMuiTheme({
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
  const [isMobile, setIsMobile] = React.useState(false);

  const handleToggleMenu = () => {
    setIsMobile((isMobile) => !isMobile);
  };

  function closeMenuOnScroll() {
    setIsMobile(false);
  }

  React.useEffect(() => {
    window.addEventListener("scroll", closeMenuOnScroll);

    return () => {
      window.removeEventListener("scroll", closeMenuOnScroll);
    };
  }, []);

  return (
    <Router>
      <MuiThemeProvider theme={theme}>
        <div className={classes.root}>
          <CssBaseline />
          <AppBar position="static" color="primary">
            <Container maxWidth="lg">
              <Toolbar className={classes.dFlex}>
                <IconButton
                  className={classes.IconButton}
                  onClick={() => dispatch({ type: "toggle" })}
                  color="inherit"
                >
                  {theme.palette.type === "dark" ? (
                    <Brightness4 />
                  ) : (
                    <Brightness7 />
                  )}
                </IconButton>
                <Typography
                  component="a"
                  color="inherit"
                  variant="h6"
                  className={classes.title}
                  href="/"
                >
                  gitlab-lint
                </Typography>

                <div
                  className={
                    isMobile ? classes.navLinksMobile : classes.navLinks
                  }
                  onClick={handleToggleMenu}
                >
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
                </div>

                <button
                  className={classes.mobileMenuIcon}
                  onClick={handleToggleMenu}
                >
                  {isMobile ? <Close /> : <Menu />}
                </button>
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
