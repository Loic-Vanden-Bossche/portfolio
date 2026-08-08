FROM node:24-alpine AS base
WORKDIR /app
RUN corepack enable

FROM base AS dependencies
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

FROM base AS development
COPY --from=dependencies /app/node_modules ./node_modules
COPY . .
RUN yarn db:generate
EXPOSE 3000
CMD ["yarn", "dev"]

FROM base AS builder
COPY --from=dependencies /app/node_modules ./node_modules
COPY . .
RUN yarn db:generate && yarn build

FROM base AS production
ENV NODE_ENV=production
COPY --from=builder /app/package.json /app/yarn.lock ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/prisma ./prisma
EXPOSE 3000
CMD ["yarn", "start"]
