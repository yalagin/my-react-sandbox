### My react sandbox
the react app is in the client folder 
and the web page is https://localhost/email_messages/


## Install

Sandbox is shipped with a [Docker](https://docker.com) setup that makes it easy to get a containerized development
environment up and running. If you do not already have Docker on your computer, [it's the right time to install it](https://docs.docker.com/install/).

On Mac, only [Docker for Mac](https://docs.docker.com/docker-for-mac/) is supported.
Similarly, on Windows, only [Docker for Windows](https://docs.docker.com/docker-for-windows/) is supported. Docker Machine **is not** supported out of the box.

Open a terminal, and navigate to the directory containing your project skeleton. Run the following command to start all
services using [Docker Compose](https://docs.docker.com/compose/):

    $ docker-compose pull # Download the latest versions of the pre-built images
    $ docker-compose up -d # Running in detached mode
    
###### You'll need to add a security exception in your browser to accept the self-signed TLS certificate that has been generated for this container when installing the framework. Repeat this step for all other services available through HTTPS.

This starts the following services:

| Name     | Description                                                       | Port(s)                                                     | Environment(s)                                     |
|----------|-------------------------------------------------------------------|-------------------------------------------------------------|----------------------------------------------------|
| php      | The API with PHP, PHP-FPM 7.3, Composer and sensitive configs     | n/a                                                         | all                                                |
| db       | A PostgreSQL database server                                      | 5432                                                        | all (prefer using a managed service in prod)       |
| client   | A development server for the Progressive Web App                  | 443                                                         | dev (use a static website hosting service in prod) |
| admin    | A development server for the admin                                | 444                                                         | dev (use a static website hosting service in prod) |
| api      | The HTTP server for the API (NGINX)                               | n/a                                                         | all                                                |
| vulcain  | The [Vulcain](https://vulcain.rocks) gateway                      | 8443                                                        | all                                                |
| mercure  | The Mercure hub, [for real-time capabilities](../core/mercure.md) | 1337                                                        | all (prefer using the managed version in prod)     |





## Troubleshooting

##### Try to update dependencies 
run shell command 

    $ ./update-deps.sh 

##### Editing Permissions on Linux

If you work on linux and cannot edit some of the project files right after the first installation, you can run `docker-compose run --rm php chown -R $(id -u):$(id -g) .` to set yourself as owner of the project files that were created by the docker container.

