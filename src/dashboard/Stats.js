// Copyright (c) 2021, Marcelo Jorge Vieira
// Licensed under the BSD 3-Clause License

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card, CardContent, Grid, Typography } from "@material-ui/core";

import PieChart from "../PieChart";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  title: {
    fontSize: 14,
  },
  pieChart: {
    fontSize: 13,
    height: 160,
  },
});

const Stats = ({ rows }) => {
  const classes = useStyles();

  const noRuleTriggered = rows.gitlabProjectsCount - rows.projectsCount;
  const projects = [
    { name: "no rule triggered", value: noRuleTriggered },
    { name: "triggered some rule", value: rows.projectsCount },
  ];

  const levels = Object.keys(rows.levelsCount).map((key) => {
    return { name: key, value: rows.levelsCount[key] };
  });

  return (
    <React.Fragment>
      <h1>Stats</h1>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6} md={4}>
          <Card className={classes.root}>
            <CardContent>
              <Typography
                className={classes.title}
                color="textSecondary"
                gutterBottom
              >
                Levels
              </Typography>
              <Typography variant="h5" component="h2">
                <div className={classes.pieChart}>
                  <PieChart data={levels} outerRadius={50} />
                </div>
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
                Projects
              </Typography>
              <Typography variant="h5" component="h2">
                <div className={classes.pieChart}>
                  <PieChart data={projects} outerRadius={50} />
                </div>
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default Stats;
