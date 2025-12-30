import { readFile } from "node:fs/promises";
import { createServer } from "node:http";
import { resolve } from "node:path";

const port = Number.parseInt(process.env.REGISTRY_PORT ?? "", 10) || 3333;
const host = process.env.REGISTRY_HOST ?? "127.0.0.1";

const publicDir = resolve(process.cwd(), "public");
const registryDir = resolve(publicDir, "r");

function sendJson(res: import("node:http").ServerResponse, status: number, body: unknown) {
	res.statusCode = status;
	res.setHeader("Content-Type", "application/json; charset=utf-8");
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.end(JSON.stringify(body, null, 2));
}

function sendText(
	res: import("node:http").ServerResponse,
	status: number,
	body: string,
	contentType = "text/plain; charset=utf-8",
) {
	res.statusCode = status;
	res.setHeader("Content-Type", contentType);
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.end(body);
}

const server = createServer(async (req, res) => {
	try {
		const method = req.method ?? "GET";
		const url = new URL(req.url ?? "/", `http://${host}:${port}`);

		if (method !== "GET") {
			sendText(res, 405, "Method Not Allowed");
			return;
		}

		if (url.pathname === "/health") {
			sendJson(res, 200, { ok: true });
			return;
		}

		const match = url.pathname.match(/^\/r\/(?<name>[a-z0-9._-]+)\.json$/i);
		const name = match?.groups?.name;
		if (!name) {
			sendText(res, 404, "Not Found");
			return;
		}

		const filePath = resolve(registryDir, `${name}.json`);
		const file = await readFile(filePath, "utf8");

		res.statusCode = 200;
		res.setHeader("Content-Type", "application/json; charset=utf-8");
		res.setHeader("Access-Control-Allow-Origin", "*");
		res.end(file);
	} catch (err) {
		const e = err as NodeErrorWithCode;
		if (e instanceof Error && e.code === "ENOENT") {
			sendText(res, 404, "Not Found");
			return;
		}

		sendJson(res, 500, {
			error: "Internal Server Error",
			message: err instanceof Error ? err.message : String(err),
		});
	}
});

type NodeErrorWithCode = Error & { code?: string };

server.listen(port, host, () => {
	// eslint-disable-next-line no-console
	console.log(`Registry server listening on http://${host}:${port}`);
	console.log(`Serving registry artifacts from: ${registryDir}`);
});

