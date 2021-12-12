# MySQL Database

## Starting MySQL server and phpMyAdmin Services

To start the mysql-server and phpmyadmin services, run the following command:

```
docker-compose up -d
```

To see how the ports are mapped, run the following command:

```
docker-compose ps
```

### Observations

As you can see, for the mysql-server service, the Docker host port 3306 is mapped to the container TCP port 3306.
For the phpmyadmin service, the Docker host port 8080 is mapped to the container TCP port 80.

Accessing phpMyAdmin 5 from Web Browser:

To access phpMyAdmin 5, open your web browser and visit http://localhost:8080 from your Docker host or http://192.168.20.160:8080 from other computers on your network.

## Stopping MySQL Server and phpMyAdmin Services

To stop the mysql-server and phpmyadmin services, run the following command:

```
docker-compose down
```

The mysql-server and phpmyadmin services should be stopped.

## Cleaning Up MySQL Server Data

If you want to remove all the MySQL database data and settings, you must remove the mysql-data volume.

```
rm -rf ./mysql-data/
docker-compose build db && docker-compose rm -fs db && docker-compose up -d db
```

## More info

[Set up a MySQL Server and phpMyAdmin with Docker](https://linuxhint.com/mysql_server_docker/)
