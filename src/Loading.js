// Copyright (c) 2021, Marcelo Jorge Vieira
// Licensed under the BSD 3-Clause License

import React from "react";

import {
  CircularProgress,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";

const Loading = () => (
  <List>
    <ListItem>
      <CircularProgress disableShrink />
      <ListItemText inset primary="Loading..." />
    </ListItem>
  </List>
);

export default Loading;
