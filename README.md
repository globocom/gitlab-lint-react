# gitlab-lint Frontend

![gitlab-lint Frontend](gitlab-lint-frontend.png)

## Dependencies

- nodejs
- yarn
- [gitlab-lint API and collector][gitlab-lint] \*

\* Althout an API is required for this project to run, we include a stub API if you want to test it locally without the need to run the backend API.

### Installing dependencies

```bash
make setup
```

## Run it

```bash
make run
```

if you have a working backend API, please change your `.env.development` or run:

```
REACT_APP_API_URL=http://localhost:8888/api/v1 make run
```

[gitlab-lint]: https://github.com/globocom/gitlab-lint
