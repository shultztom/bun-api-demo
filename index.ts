import {nameRouter} from "./controllers/nameController.ts";

console.log(`Starting Bun Server on port 3000`);
Bun.serve({
    fetch(req) {
        const url = new URL(req.url);
        if (url.pathname === "/") return new Response(`Hello World!`);
        if (url.pathname.includes("/name")) return nameRouter(req);
        return new Response(`404!`);
    },
});