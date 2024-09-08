# syntax = docker/dockerfile:1

# Adjust BUN_VERSION as desired
ARG BUN_VERSION=1.1.25
FROM oven/bun:${BUN_VERSION}-slim AS base

LABEL fly_launch_runtime="Bun"

# Bun app lives here
WORKDIR /app

# Set production environment
ENV NODE_ENV="production"


# Throw-away build stage to reduce size of final image
FROM base AS build

# Install packeges needed to build node modules
# RUN apt-get update --qq && \
#     apt-get install --no-install-recommends -y build-essential node-gyp pkg-config python-is-python3
RUN apt-get update && \
    apt-get install --no-install-recommends -y build-essential node-gyp pkg-config python-is-python3 && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

# Install node modules
COPY --link bun.lockb package.json ./
RUN bun install --cli

# Install frontend node modules
COPY --link frontend/bun.lockb frontend/package.json ./frontend/
RUN cd frontend && bun install --ci

# Copy application code
COPY --link . .

#Change to frontend directory and build the frontend app
WORKDIR /app/frontend
RUN bun run build
# Remove all files in frontend except for the dist folder
# RUN find . -mindepth 1 ! -regex '^./dist\(/.*)?' -delete
RUN find . -mindepth 1 ! -path './dist*' -delete


# Final stage for app image 
FROM base

# Copy built application
COPY --from=build /app /app

# Start the server by default, this can be overwritten at runtime
EXPOSE 3000
CMD [ "bun", "run", "start" ]
