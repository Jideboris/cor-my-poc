

# References
# https://scotch.io/tutorials/react-docker-with-security-in-10-minutes
# https://docs.docker.com/engine/reference/commandline/logs/
# https://www.digitalocean.com/community/tutorials/how-to-remove-docker-images-containers-and-volumes
# Tagging format
# https://jhooq.com/requested-access-to-resource-is-denied/#3-step-2---build-and-tag-docker-image-correctly
# docker build -t <my-created-image .>
# docker tag my-created-image jideborisdocker/my-created-image:my-created-image
#  docker push  jideborisdocker/my-created-image:my-created-image

FROM node:14.1-alpine AS builder

WORKDIR /opt/web
COPY package.json package-lock.json ./
RUN npm install

ENV PATH="./node_modules/.bin:$PATH"

COPY . ./
RUN npm run build

FROM nginx:1.17-alpine
RUN apk --no-cache add curl
RUN curl -L https://github.com/a8m/envsubst/releases/download/v1.1.0/envsubst-`uname -s`-`uname -m` -o envsubst && \
    chmod +x envsubst && \
    mv envsubst /usr/local/bin
COPY ./nginx.config /etc/nginx/nginx.template
CMD ["/bin/sh", "-c", "envsubst < /etc/nginx/nginx.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"]
COPY --from=builder /opt/web/build /usr/share/nginx/html