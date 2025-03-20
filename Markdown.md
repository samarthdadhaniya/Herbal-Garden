1.	Build the Docker Image:

    docker build -t herbal-garden .

2.	Run the Docker Container:

    docker run -d -p 8080:80 --name herbal-garden-container herbal-garden

