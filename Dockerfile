FROM node:current-slim AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
WORKDIR /app
COPY . .

FROM base AS build
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm -C chat build && pnpm -C admin build && pnpm -C service build:test

FROM base
RUN echo 'recursive-install=false' > /app/.npmrc && \
  rm /app/chat /app/admin /app/service/public -rf && \
  npm install pm2 -g && \
  pnpm --filter=service install --frozen-lockfile --prod

COPY --from=build /app/chat/dist /app/service/public
COPY --from=build /app/admin/dist /app/service/public/nineai/admin
COPY --from=build /app/service/dist /app/service/dist

ENV PORT=9520 JWT_SECRET=chat-cooper

RUN chmod +x /app/entrypoint.sh
CMD ["/app/entrypoint.sh"]