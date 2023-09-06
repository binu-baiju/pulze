# commands

npx prisma generate --schema ./src/prisma/schema.prisma
npx prisma migrate dev --schema ./src/prisma/schema.prisma
npx prisma migrate deploy --schema ./src/prisma/schema.prisma

npx prisma db push --schema ./src/prisma/schema.prisma

## view prisma studio

npx prisma studio --schema ./src/prisma/schema.prisma
