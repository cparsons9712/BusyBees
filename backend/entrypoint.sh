#!/bin/bash
# Run TypeORM migrations
npm run build

npm run typeorm migration:run -- -d dist/config/typeorm.js
# Start your application
exec npm run start:dev

exec "$@"
