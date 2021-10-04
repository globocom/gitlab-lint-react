// Copyright (c) 2021, Marcelo Jorge Vieira
// Licensed under the BSD 3-Clause License

import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import titleCase from "../utils";

import levelsStyles from "../theme";

const useStyles = makeStyles((theme) => ({
  title: ({ size }) => ({
    borderRadius: 8,
    fontSize: size === "normal" ? 32 : 16,
    marginRight: 8,
    padding: size === "normal" ? "8px 24px" : "4px 8px",
    minWidth: 100,
    textAlign: "center",
    color: "#fff",
  }),
  root: {
    display: "flex",
    alignItems: "center",
  },
  ...levelsStyles,
}));

const RuleTitle = ({ rule, size }) => {
  if (size === undefined || size !== "small") {
    size = "normal";
  }

  const classes = useStyles({ size });
  const { ruleId, level } = rule;
  const titleVariant = size !== "small" ? "h4" : "subtitle1";

  return (
    <div className={classes.root}>
      <span className={`${classes.title} ${classes[level]}`}>
        {titleCase(level)}
      </span>
      <Typography variant={titleVariant}>{ruleId}</Typography>
    </div>
  );
};

RuleTitle.propTypes = {
  rule: PropTypes.object.isRequired,
  size: PropTypes.oneOf(["normal", "small"]),
};

export default RuleTitle;
