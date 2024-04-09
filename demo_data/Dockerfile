FROM postgres:latest


# Copy the dump file into the container
COPY demo_data.sql /docker-entrypoint-initdb.d/

# When the container starts, PostgreSQL will automatically execute scripts in docker-entrypoint-initdb.d
