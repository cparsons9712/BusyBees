# this folder is to make it so that starting my backend development environment also starts up
# the server

#!/bin/bash

# Start PostgreSQL service
sudo service postgresql start

# Start your development server
npm run actual-start:dev
