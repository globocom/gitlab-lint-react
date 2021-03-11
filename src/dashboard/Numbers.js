// Copyright (c) 2021, Marcelo Jorge Vieira
// Licensed under the BSD 3-Clause License

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card, CardContent, Grid, Paper, Typography } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  title: {
    fontSize: 14,
  },
});

const Numbers = ({ rows }) => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <h1>Numbers</h1>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6} md={4}>
          <Card className={classes.root}>
            <CardContent>
              <Typography
                className={classes.title}
                color="textSecondary"
                gutterBottom
              >
                Registered Rules
              </Typography>
              <Typography variant="h5" component="h2">
                {rows.registeredRulesCount}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card className={classes.root}>
            <CardContent>
              <Typography
                className={classes.title}
                color="textSecondary"
                gutterBottom
              >
                Rules detected
              </Typography>
              <Typography variant="h5" component="h2">
                {rows.rulesCount}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card className={classes.root}>
            <CardContent>
              <Typography
                className={classes.title}
                color="textSecondary"
                gutterBottom
              >
                Number of Projects
              </Typography>
              <Typography variant="h5" component="h2">
                {rows.gitlabProjectsCount}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card className={classes.root}>
            <CardContent>
              <Typography
                className={classes.title}
                color="textSecondary"
                gutterBottom
              >
                Projects with some rule
              </Typography>
              <Typography variant="h5" component="h2">
                {rows.projectsCount}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default Numbers;
