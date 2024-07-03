docker build -t hackathon2024-frontend .
docker run -itd --name hackathon2024-frontend -v .:/app -p 127.0.0.1:5010:3000 .
