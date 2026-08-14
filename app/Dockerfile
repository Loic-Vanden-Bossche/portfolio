FROM node:24-alpine AS base
WORKDIR /app
ENV COREPACK_HOME=/opt/corepack
RUN corepack enable \
    && corepack install --global yarn@4.18.0 \
    && chmod -R a+rX /opt/corepack

FROM base AS dependencies
COPY package.json yarn.lock .yarnrc.yml ./
RUN yarn install --immutable --mode=skip-build

FROM base AS development
COPY --from=dependencies /app/node_modules ./node_modules
COPY --from=dependencies /app/.yarn ./.yarn
COPY . .
RUN yarn db:generate
EXPOSE 3000
CMD ["yarn", "dev"]

FROM base AS builder
COPY --from=dependencies /app/node_modules ./node_modules
COPY --from=dependencies /app/.yarn ./.yarn
COPY . .
RUN yarn db:generate && yarn build

FROM base AS production
ENV NODE_ENV=production
ENV COREPACK_ENABLE_NETWORK=0
LABEL org.opencontainers.image.source="https://github.com/Loic-Vanden-Bossche/portfolio"
COPY --chown=node:node --from=builder /app/package.json /app/yarn.lock /app/.yarnrc.yml /app/next.config.ts ./
COPY --chown=node:node --from=builder /app/node_modules ./node_modules
COPY --chown=node:node --from=dependencies /app/.yarn ./.yarn
COPY --chown=node:node --from=builder /app/.next ./.next
COPY --chown=node:node --from=builder /app/public ./public
COPY --chown=node:node --from=builder /app/prisma ./prisma
USER node
EXPOSE 3000
CMD ["yarn", "start"]
