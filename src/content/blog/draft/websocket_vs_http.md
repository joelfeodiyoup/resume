---
title: client-server communication patterns
---

Recently, during an interview, I've been asked "why wouldn't you use websockets here" and honestly, my thinking is that I would only consider web sockets if I needed the ability for the server to push data to the client. But it's quite possible my thinking on this is incomplete. So I'll research a bit more, and see if I missed something:

Firstly a listing of all the different possibilities.

## http/https (traditional request-response)

- standard REST apis
- simple, stateless
- built-in caching
- standard tooling (curl, postman, browser devtools)
- client initiates every request

## http keep-alive

## http/2 persistent + multiplexing

for local dev you need to do a few things to enable this.

## http/3 (over QUIC)

for local dev you need to do even a bit more to enable this.

## websockets( full-dupliex, bidirectional)

- 'full duplex'
- persistent connection
- real-time bidirectional communication
- server can push to client

## server-sent events

- one-way: server pushes to client
- built on http
- simpler than websockets for one-directional updates
- auto-reconnects

## long polling

- client makes http requests, server holds it open until data available
- fallback technique before websockets
- more overhead than websockets

## http/2 server push (deprecated/rarely used now)

- server could push resources without client requesting
- largely replaced by other techniques

## gRPC / HTTP/2 streams

- bidirectional streaming over http/2
- protocol buffers
- more common in backend-to-backend
