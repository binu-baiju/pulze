npx prisma generate --schema ./src/prisma/schema.prisma
npx prisma migrate dev --schema ./src/prisma/schema.prisma
npx prisma migrate deploy --schema ./src/prisma/schema.prisma
