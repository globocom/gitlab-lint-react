setup:
	@yarn

run:
	@PORT=8080 yarn start

build:
	@yarn run build

clean:
	@find . -name "*.swp" -delete

docker-build:
	@COMPOSE_DOCKER_CLI_BUILD=1 DOCKER_BUILDKIT=1 docker-compose build

docker-run:
	@docker-compose up -d

docker-logs:
	@docker-compose logs -f

.PHONY: setup run build clean
