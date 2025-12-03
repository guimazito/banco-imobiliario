DOCKER_COMPOSE := docker compose
ifeq (, $(shell which $(DOCKER_COMPOSE)))
    DOCKER_COMPOSE := docker-compose
endif

up:
	$(DOCKER_COMPOSE) -f docker-compose.yml up -d --remove-orphans

build:
	$(DOCKER_COMPOSE) down -v
	$(DOCKER_COMPOSE) -f docker-compose.yml up -d --build

down:
	$(DOCKER_COMPOSE) down

clear-db:
	$(DOCKER_COMPOSE) exec hemotrack_backend npx ts-node scripts/clear-db.ts

seed:
	$(DOCKER_COMPOSE) exec hemotrack_backend npx ts-node prisma/seed.ts

logs-%:
	docker logs -f hemotrack_$*

prune:
	docker system prune -a --volumes -f

clear-next:
	sudo chmod 777 -R frontend/.next
	rm -rf frontend/.next

migrate:
	$(DOCKER_COMPOSE) exec hemotrack_backend npx prisma migrate dev

swagger:
	$(DOCKER_COMPOSE) exec hemotrack_backend npx ts-node src/swagger.ts

swagger-prod:
	$(DOCKER_COMPOSE) exec hemotrack_backend bash -c "NODE_ENV=production npx ts-node src/swagger.ts && NODE_ENV=production node scripts/generate-swagger.js"