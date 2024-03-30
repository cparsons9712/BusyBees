# this folder is to make it so that starting my backend development
# environment also starts up the postgres server & makes sure the
# clock is in sync

#!/bin/bash

# sync clock
sudo hwclock -s

# Start PostgreSQL service
sudo service postgresql start



# Start your development server
npm run actual-start:dev
