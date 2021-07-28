FROM golang:1.16.6-alpine3.14 AS BASE

WORKDIR /go/src/app

FROM BASE AS BUILD

# Get dependencies
RUN apk add --update nodejs npm
COPY package.json .
RUN npm install --include=dev
COPY /src/views ./src/views
COPY /src/controllers/ ./src/controllers/
COPY go.mod go.sum .babelrc webpack.config.js ./
RUN go install -v ./...

# Build
COPY .env ./
RUN npm run react-build
RUN go build -o actions ./src/controllers/

FROM BASE

COPY --from=BUILD /go/src/app/dist/ ./dist
COPY --from=BUILD /go/src/app/actions ./
ENTRYPOINT ["./actions"]
