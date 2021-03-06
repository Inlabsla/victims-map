#
# ---- Base Node ----
FROM node:12.20.0 AS base

# Set working directory
WORKDIR /usr/src/api

# Copy project files
COPY package*.json ./

#
# ---- Dependencies ----
FROM base AS dependencies
# install node packages
RUN npm set progress=false && npm config set depth 0
RUN npm install
# copy production node_modules aside
RUN cp -R node_modules prod_node_modules
# install ALL node_modules, including 'devDependencies'
RUN npm install
#
# ---- Build ----
# build dist and then run linters and tests
FROM dependencies AS build
COPY . .
RUN  npm run build

#
# ---- Release ----
FROM base AS release
# copy production node_modules
COPY --from=dependencies /usr/src/api/prod_node_modules ./node_modules
# copy dist code
COPY --from=build /usr/src/api/dist ./dist
# Copy project files
COPY package*.json ./
# expose port and define CMD
EXPOSE 8080
EXPOSE 443
CMD node .