// Copyright (c) 2021, Marcelo Jorge Vieira
// Licensed under the BSD 3-Clause License

import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Card,
  CardActions,
  CardActionArea,
  CardContent,
  CardHeader,
  Grid,
  Typography,
} from "@material-ui/core";

import GitlabLintHttpClient from "../GitlabLintHttpClient";
import Loading from "../Loading";
import levelsStyles from "../theme";

const useStyles = makeStyles(() => ({
  root: {
    maxWidth: 345,
  },
  title: {
    color: "#fff",
  },
  ...levelsStyles,
}));

const Rules = () => {
  const classes = useStyles();
  const [rows, setData] = useState({});
  const fetchData = () => {
    GitlabLintHttpClient("GET_ALL", { entity: "rules" })
      .then((data) => {
        setData(data.data);
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
        Rules
      </Typography>

      <Grid container spacing={4}>
        {rows.map((row) => {
          return (
            <Grid item key={row.ruleId} xs={12} sm={6} md={4}>
              <Card className={classes.root}>
                <CardActionArea href={`/rules/${row.ruleId}`}>
                  <CardHeader className={classes[row.level]} classes={{title: classes["title"]}} title={row.level} />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {row.name}
                    </Typography>
                    {row.description && (
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        {row.description}
                      </Typography>
                    )}
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button
                    size="small"
                    color="primary"
                    href={`/rules/${row.ruleId}`}
                  >
                    Show projects
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </React.Fragment>
  );
};

export default Rules;
