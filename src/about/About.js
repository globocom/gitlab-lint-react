// Copyright (c) 2021, Marcelo Jorge Vieira
// Licensed under the BSD 3-Clause License

import React from "react";
import { Box, Link, Typography } from "@material-ui/core";

const About = () => {
  return (
    <React.Fragment>
      <Typography variant="h3" gutterBottom>
        About
      </Typography>
      <Typography variant="body1" gutterBottom>
        An open source gitlab linting utility.
      </Typography>

      <Box pt={2} pb={2}>
        <Typography variant="h4" gutterBottom>
          Contribute
        </Typography>
        <Typography variant="body1">
          Fork the repository and send your pull-requests.
        </Typography>
        <ul>
          <li>
            <span>Frontend: </span>
            <Link
              target="_blank"
              href="https://github.com/globocom/gitlab-lint-react"
            >
              https://github.com/globocom/gitlab-lint-react
            </Link>
          </li>
          <li>
            <span>Backend: </span>
            <Link
              target="_blank"
              href="https://github.com/globocom/gitlab-lint"
            >
              https://github.com/globocom/gitlab-lint
            </Link>
          </li>
        </ul>
      </Box>

      <Box pt={2} pb={2}>
        <Typography variant="h4" gutterBottom>
          License
        </Typography>
        <Typography variant="body1" gutterBottom>
          By contributing to gitlab-lint, you agree that your contributions will
          be licensed under its BSD 3-Clause license.
        </Typography>
      </Box>
    </React.Fragment>
  );
};

export default About;
