// Copyright (c) 2021, Marcelo Jorge Vieira
// Licensed under the BSD 3-Clause License

import React, { useState, useEffect, useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link as RouterLink, useParams } from "react-router-dom";

import {
  Box,
  Breadcrumbs,
  Divider,
  Link,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@material-ui/core";

import GitlabLintHttpClient from "../GitlabLintHttpClient";
import Loading from "../Loading";
import RuleTitle from "./RuleTitle";

const useStyles = makeStyles((theme) => ({
  ruleDescription: {
    alignItems: "center",
    backgroundColor: theme.palette.background.default,
    color: theme.palette.secondary.main,
    border: `1px solid ${theme.palette.secondary.main}`,
    display: "flex",
    padding: 16,
    whiteSpace: "pre-wrap",
  },
}));

const RuleProjects = ({ projects }) => {
  if (projects.length <= 0) {
    return <p>Found no projects matching the criteria.</p>;
  }

  return (
    <React.Fragment>
      <Typography variant="h6" paragraph>
        These {projects.length} repositories in the gitlab trigger this rule:
      </Typography>
      <List>
        {projects.map((row) => {
          return (
            <ListItem
              key={row.projectId}
              button
              component={RouterLink}
              to={`/projects/${row.projectId}`}
            >
              <ListItemText primary={row.pathWithNamespace} />
            </ListItem>
          );
        })}
      </List>
    </React.Fragment>
  );
};

const Rule = () => {
  const classes = useStyles();
  const [rows, setData] = useState({});
  const { id } = useParams();
  const fetchData = useCallback(() => {
    GitlabLintHttpClient("GET_ONE", { entity: "rules", id: id })
      .then((data) => {
        setData(data.data);
      })
      .catch((err) => console.error(err));
  }, [id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (Object.keys(rows).length === 0 && rows.constructor === Object) {
    return <Loading />;
  }

  return (
    <React.Fragment>
      <Breadcrumbs aria-label="breadcrumb">
        <Link component={RouterLink} color="inherit" to="/rules">
          Rules
        </Link>
        <Typography color="textPrimary">{rows.rule.ruleId}</Typography>
      </Breadcrumbs>
      <Box pt={2} pb={2}>
        <Divider />
      </Box>
      <RuleTitle rule={rows.rule} />
      {rows.rule.description && (
        <p className={classes.ruleDescription}>{rows.rule.description}</p>
      )}
      <Box pt={2} pb={2}>
        <Divider />
      </Box>
      <RuleProjects projects={rows.projects} />
    </React.Fragment>
  );
};

export default Rule;
