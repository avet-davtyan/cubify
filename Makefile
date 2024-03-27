up:
	docker compose up

down: 
	docker compose down


studio:
	docker compose exec -it backend npx prisma studio
migrateName := last
migrate:
	docker compose exec -it backend npx prisma migrate dev --name $(migrateName)