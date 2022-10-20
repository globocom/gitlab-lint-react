// Copyright (c) 2021, Marcelo Jorge Vieira
// Licensed under the BSD 3-Clause License

import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  title: {
    backgroundColor: theme.palette.info.light,
    borderRadius: 5,
    fontSize: 32,
    marginRight: 5,
    padding: "8px 24px",
    minWidth: 30,
    textAlign: "center",
  },
  root: {
    display: "flex",
    alignItems: "center",
    marginBottom: 24,
  },
}));

const ProjectTitle = ({ project }) => {
  const classes = useStyles();
  const { name, id } = project;

  return (
    <div className={classes.root}>
      <span className={classes.title}>{name.charAt(0).toUpperCase()}</span>
      <div>
        <Typography variant="h4">{name}</Typography>
        <Typography variant="caption">Project ID: {id}</Typography>
      </div>
    </div>
  );
};

ProjectTitle.propTypes = {
  project: PropTypes.object.isRequired,
};

export default ProjectTitle;
