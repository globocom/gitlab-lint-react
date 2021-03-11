// Copyright (c) 2021, Marcelo Jorge Vieira
// Licensed under the BSD 3-Clause License

import React, { useState, useEffect } from "react";

import GitlabLintHttpClient from "../GitlabLintHttpClient";
import Loading from "../Loading";
import Numbers from "./Numbers";
import Stats from "./Stats";

const Dashboard = () => {
  const [rows, setData] = useState({});
  const fetchData = () => {
    GitlabLintHttpClient("GET_ALL", { entity: "stats" })
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
      <Numbers rows={rows} />
      <Stats rows={rows} />
    </React.Fragment>
  );
};

export default Dashboard;
