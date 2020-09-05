#####################################################
# The purpose of this file is to isolate the environment where our app/tests run
# Needed to do this because I didn't want to update node globally, and docker seemed to make more sense
# then using version managers like nvm, mostly because I'm more familiar with Docker
#####################################################
# Sections
# 1. Running
# 2. Testing
# 3. Debugging
# 4. Internal
#####################################################

########### Section 1: Running
# STARTS THE APP
run: _build
	docker run --rm -it caronsale-dev npm start

# ALIAS OF `make run`
start: run

########### Section 2: Testing
test: _build
	docker run --rm -it caronsale-dev npm test

########### Section 3: Debugging
# `make ssh` puts the user into an interactive shell, in the docker image
# useful for debugging
ssh:
	docker run --rm -it caronsale-dev /bin/bash

########### Section 4: Internal
# just builds the docker container, nothing spectacular
_build:
	docker build -t caronsale-dev .
