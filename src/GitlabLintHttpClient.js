// Copyright (c) 2021, Marcelo Jorge Vieira
// Licensed under the BSD 3-Clause License

import axios from "axios";
import qs from "qs";

import conf from "./conf";

const GitlabLintHttpClient = (type, payload) => {
  switch (type) {
    case "GET_ALL": {
      const query = payload.query ? `?${qs.stringify(payload.query)}` : "";
      const url = `${conf.gitlabLintApiUrl}/${payload.entity}${query}`;
      return axios.get(url).then((x) => {
        return x.data;
      });
    }
    case "GET_ONE": {
      const query = payload.query ? `?${qs.stringify(payload.query)}` : "";
      const id = payload.slug ? payload.slug : payload.id;
      const url = `${conf.gitlabLintApiUrl}/${payload.entity}/${id}${query}`;
      return axios.get(url).then((x) => {
        return x.data;
      });
    }
    default:
      return Promise.reject(`Unsupported action type "${type}"`);
  }
};

export default GitlabLintHttpClient;
