// Copyright (c) 2021, Marcelo Jorge Vieira
// Licensed under the BSD 3-Clause License

import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  Typography,
} from "@material-ui/core";

import Loading from "../Loading";
import GitlabLintHttpClient from "../GitlabLintHttpClient";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
  },
  title: {
    fontSize: 14,
  },
  level: {
    color: "#fff",
  },
  warning: {
    backgroundColor: theme.palette.warning.main,
  },
  info: {
    backgroundColor: theme.palette.info.main,
  },
  error: {
    backgroundColor: theme.palette.error.main,
  },
  pedantic: {
    backgroundColor: theme.palette.secondary.main,
  },
  experimental: {
    backgroundColor: theme.palette.success.main,
  },
}));

const Levels = () => {
  const classes = useStyles();
  const [rows, setData] = useState({});
  const fetchData = () => {
    GitlabLintHttpClient("GET_ALL", { entity: "levels" })
      .then((data) => {
        setData(data);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (Object.keys(rows).length === 0 && rows.constructor === Object) {
    return <Loading />;
  }

  return (
    <React.Fragment>
      <Typography variant="h4" paragraph>
        Levels
      </Typography>
      <Grid container spacing={4}>
        {rows.map((level) => {
          return (
            <Grid item key={level.id} xs={12} sm={6} md={4}>
              <Card className={classes.root}>
                <CardHeader
                  className={`${classes.level} ${classes[level.id]}`}
                  title={level.name}
                />
                <CardContent>
                  <Typography variant="h5" component="h2">
                    {level.total}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </React.Fragment>
  );
};

export default Levels;
