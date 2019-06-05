FROM mysql:latest
ENV MYSQL_ROOT_PASSWORD root
ENV MYSQL_DATABASE test_dump
ADD script.sql /docker-entrypoint-initdb.d
EXPOSE 3306
