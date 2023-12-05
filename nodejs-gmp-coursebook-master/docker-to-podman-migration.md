# Docker to Podman migration

## Podman

[Podman](https://podman.io/) is a utility which can be used to manage containers, pods and images. It is an open-source, free to use tool that is designed to be a drop-in replacement for [Docker](https://www.docker.com/). Podman supports Dockerfile syntax, can pull and run Docker images. Podman can be used instead of Docker without having to modify existing Dockerfiles or images.

### Installation

Podman is compatible with the most common operating systems, including MacOS, Windows, Linux. Please follow instructions [here](https://podman.io/docs/installation) to install Podman on your local machines.

### Build and run a simple Dockerfile using Podman

1. Create a new directory to host your project:

   `$ mkdir myproject && cd myproject`

2. Create a new file called `Dockerfile` and add the following content:

   ```
   FROM alpine:latest
   CMD ["echo", "Hello, World!"]
   ```

   This Dockerfile uses Alpine Linux as the base image and sets the command to print "Hello, World!" when the container runs.

3. Build the Docker image using Podman:

   `$ podman build -t my-image .`

   This command builds the Docker image using the `Dockerfile` in the current directory (`.`), and tags it with the name `my-image`.

4. Run the Docker container using Podman:

   `$ podman run -it my-image`

   This command runs the Docker container using the `my-image` image we just built, and opens an interactive terminal session (`-it`).

5. Verify that the container printed "Hello, World!" to the terminal. You should see output similar to this:

   ```
   Hello, World!
   ```

That's it! You have successfully built and run a Docker container using Podman. This is just a simple example, but you can use Podman to build and run more complex Dockerfiles easily.

## podman-compose

[podman-compose](https://github.com/containers/podman-compose) is a command-line tool for defining and running multi-container Docker applications with Podman. It is similar to [docker-compose](https://docs.docker.com/compose/), but instead of requiring Docker, it uses Podman container engine to build and run the containers.

Please follow instructions [here](https://github.com/containers/podman-compose#installation) to install podman-compose on your local machines.

### Run simple docker-compose file using Podman

1. Create a new directory for your project and navigate to it:

   ```
   $ mkdir myproject && cd myproject
   ```

2. Create a new file called `docker-compose.yml` and add the following content:

   ```
   version: '3'
   services:
     nginx:
       image: nginx:latest
       container_name: my-nginx
       ports:
         - 8080:80
   ```

   This docker-compose file instructs Podman to create a container running the latest version of the `nginx` image, specifies the container name as `my-nginx`, and binds port 80 inside the container to port 8080 on the host machine.

3. Start the container using podman-compose:

   ```
   $ podman-compose up -d
   ```

   This command starts the container using podman-compose, with the `-d` option running the containers in the background.

4. Verify that the container is running:

   ```
   $ podman ps
   ```

   This command should display a list of running containers, including `my-nginx`.

5. Test the container:

   Open a web browser and navigate to `http://localhost:8080`. You should see the default Nginx homepage.

   Alternatively, run the following command to test the container from the command line:

   ```
   $ curl http://localhost:8080
   ```

   You should see output similar to this:

   ```
   <!DOCTYPE html>
   <html>
   <head>
   <title>Welcome to nginx!</title>
   ...

That's it! You have successfully run a docker-compose file using Podman. You can use podman-compose to run more complex docker-compose files easily.

## Docker to Podman commands

Num | Description | Docker | Podman |
--- | --- | --- | --- |
1 | Build container | docker build -t my-node-app . | podman build -t my-node-app . |
2 | Run container | docker run -p 3000:3000 my-node-app | podman run -p 3000:3000 my-node-app |
3 | Get list of containers running | docker ps | podman ps |
4 | Stop container | docker stop {container_id} | podman stop {container_id} |
5 | Tag image | docker tag myimage:v1 myregistry.com/myimage:v1 | podman tag myimage:v1 myregistry.com/myimage:v1 |
6 | Push image  | docker push myregistry.com/myimage:v1 | podman push myregistry.com/myimage:v1 |
7 | Pull image | docker pull myregistry.com/myimage:v1 | podman pull myimage:v1 myregistry.com/myimage:v1 |

You can see all the commands available by running `podman --help`.

## docker-compose to podman-compose commands

Num | Description | docker-compose | podman-compose |
--- | --- | --- | --- |
1 | Create and start containers | docker-compose up -d | podman-compose up -d |
2 | Get list of containers running | docker-compose ps | podman-compose ps |
3 | Stop and remove containers, networks | docker-compose down | podman-compose down |

You can see all the commands available by running `podman-compose --help`.