# The purpose of this file is to isolate the environment where our app/tests run
# Needed to do this because I didn't want to update node globally, and docker seemed to make more sense
# then using version managers like nvm, mostly because I'm more familiar with Docker

build:
	docker build -t caronsale-dev .

test: build
	docker run --rm -it caronsale-dev npm test