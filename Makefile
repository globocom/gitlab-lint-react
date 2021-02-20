setup:
	@yarn

run:
	@PORT=8080 yarn start

build:
	@yarn run build

clean:
	@find . -name "*.swp" -delete

.PHONY: setup run build clean
