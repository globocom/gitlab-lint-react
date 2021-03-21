// Copyright (c) 2021, Marcelo Jorge Vieira
// Licensed under the BSD 3-Clause License

import React, { useState, useEffect, useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";
import {
  Chip,
  Input,
  List,
  ListItem,
  ListItemText,
  Tooltip,
  Typography,
} from "@material-ui/core";
import debounce from "lodash.debounce";

import GitlabLintHttpClient from "../GitlabLintHttpClient";
import Loading from "../Loading";

const useStyles = makeStyles((theme) => ({
  level: {
    color: "#fff",
  },
  header: {
    float: "left",
  },
  search: {
    float: "right",
    marginBottom: "15px",
  },
  levels: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(0.5),
    },
  },
  pagination: {
    "& > *": {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(8),
    },
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

const Projects = () => {
  const classes = useStyles();

  const [page, setPage] = React.useState(1);
  const [searchInput, setSearchInput] = React.useState("");
  const handleChange = (event, value) => {
    setPage(value);
    fetchData({ query: { page: value, q: searchInput } });
  };
  const debouncedSearch = useCallback(
    debounce((value) => fetchData({ query: { page, q: value } }), 500),
    []
  );
  const handleChangeSearch = (value) => {
    setSearchInput(value);
    debouncedSearch(value);
  };
  const [rows, setData] = useState({});
  const fetchData = ({ query }) => {
    GitlabLintHttpClient("GET_ALL", { entity: "projects", query: query })
      .then((data) => {
        setData(data);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchData({ query: { page: 1 } });
  }, []);

  if (Object.keys(rows).length === 0 && rows.constructor === Object) {
    return <Loading />;
  }

  return (
    <React.Fragment>
      <Typography variant="h4" className={classes.header} paragraph>
        Projects
      </Typography>
      <List>
        <form className={classes.search} noValidate autoComplete="off">
          <Input
            placeholder="Search for a project.."
            value={searchInput}
            onChange={(e) => handleChangeSearch(e.target.value)}
          />
        </form>
        {rows.map((row) => {
          return (
            <ListItem
              button
              component="a"
              href={`/projects/${row.id}`}
              key={row.id}
            >
              <ListItemText primary={row.path_with_namespace} />
              <div className={classes.levels}>
                {Object.keys(row.rules).map((key, index) => {
                  return (
                    <Tooltip key={key} title={key} placement="top-start">
                      <Chip
                        className={`${classes.level} ${classes[key]}`}
                        label={row.rules[key]}
                        size="small"
                      />
                    </Tooltip>
                  );
                })}
              </div>
            </ListItem>
          );
        })}
      </List>
      <div className={classes.pagination}>
        <Pagination
          boundaryCount={2}
          color="primary"
          count={323}
          onChange={handleChange}
          page={page}
          siblingCount={2}
        />
      </div>
    </React.Fragment>
  );
};

export default Projects;
