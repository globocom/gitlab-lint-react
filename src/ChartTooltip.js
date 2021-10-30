// Copyright (c) 2021, Marcelo Jorge Vieira
// Licensed under the BSD 3-Clause License

import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  tooltip: {
    margin: 0,
    padding: 10,
    backgroundColor: theme.palette.background.default,
    color: theme.palette.secondary.main,
    border: `1px solid ${theme.palette.secondary.main}`,
    whiteSpace: "nowrap",
  },
}));

const ChartTooltip = ({ active, payload, label }) => {
  const classes = useStyles();
  if (!active) {
    return null;
  }
  const value = payload[0].value;
  return (
    <div className={classes.tooltip}>
      <p className={classes.label}>{`${payload[0].name}: ${value}`}</p>
    </div>
  );
};

export default ChartTooltip;
