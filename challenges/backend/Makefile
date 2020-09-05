#####################################################
# The purpose of this file is to isolate the environment where our app/tests run
# Needed to do this because I didn't want to update node globally, and docker seemed to make more sense
# then using version managers like nvm, mostly because I'm more familiar with Docker
#####################################################
# Sections
# 1. Running
# 2. Testing/Linting
# 3. Debugging
# 4. Internal
#####################################################

########### Section 1: Running
# STARTS THE APP
run: _build
	docker run --rm -it caronsale-dev npm start

# ALIAS OF `make run`
start: run

########### Section 2: Testing/Linting
# Run all tests, and dumps coverage to coverage/
test: _build
	docker rm caronsale-dev-container || true
	docker run --name caronsale-dev-container -it caronsale-dev npm test
	rm -r coverage/ || true
	docker cp caronsale-dev-container:/app/coverage ./coverage
	@echo Check out the coverage with: "chromium-browser coverage/index.html"

# Run linting
tslint: _build
	docker run --rm -it caronsale-dev ./node_modules/.bin/tslint -c tslint.json --project .

########### Section 3: Debugging
# `make ssh` puts the user into an interactive shell, in the docker image
# useful for debugging
ssh:
	docker run --rm -it caronsale-dev /bin/bash

########### Section 4: Internal
# just builds the docker container, nothing spectacular
_build:
	docker build -t caronsale-dev .
