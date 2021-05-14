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
import { debounce } from "lodash";

import GitlabLintHttpClient from "../GitlabLintHttpClient";
import Loading from "../Loading";
import levelsTheme from "../theme";

const useStyles = makeStyles((theme) => ({
  level: {
    color: "#fff",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
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
  ...levelsTheme,
}));

const Projects = () => {
  const classes = useStyles();

  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
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
  const [meta, setMeta] = useState({});
  const fetchData = ({ query }) => {
    GitlabLintHttpClient("GET_ALL", { entity: "projects", query: query })
      .then((data) => {
        setData(data.data);
        setMeta(data.meta);
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
      <div className={classes.header}>
        <Typography variant="h4" paragraph>
          Projects
        </Typography>
        <form noValidate autoComplete="off">
          <Input
            placeholder="Find a project..."
            value={searchInput}
            onChange={(e) => handleChangeSearch(e.target.value)}
          />
        </form>
      </div>
      <List>
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
                  let colorClassName = row.rules[key] > 0 ? classes[key] : "";
                  return (
                    <Tooltip key={key} title={key} placement="top-start">
                      <Chip
                        className={`${classes.level} ${colorClassName}`}
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
          count={meta.totalOfPages}
          onChange={handleChange}
          page={page}
          siblingCount={2}
        />
      </div>
    </React.Fragment>
  );
};

export default Projects;
