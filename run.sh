docker stop hackathon2024-frontend
docker rm hackathon2024-frontend
docker image rm hackathon2024-frontend
docker build -t hackathon2024-frontend .
docker run -d --name hackathon2024-frontend -p 127.0.0.1:5010:3000 hackathon2024-frontend
