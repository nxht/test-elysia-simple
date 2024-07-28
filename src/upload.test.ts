import { afterEach, beforeAll, test } from "bun:test";
import { app } from ".";

let image: Blob;

const waitSleepDuration = 1000;

beforeAll(async () => {
	// Downloaded from https://sample-videos.com/img/Sample-jpg-image-10mb.jpg
	image = Bun.file("./sample.jpg");

	// initialize app
	await app.handle(new Request("http://localhost/"));
});

afterEach(async () => {
	Bun.gc(true);
	await Bun.sleep(waitSleepDuration);
});

async function testRequest(path: string, t: number) {
	const form = new FormData();
	form.append("IMG_1", image);
	form.append("IMG_2", image);
	form.append("IMG_3", image);
	form.append("IMG_4", image);
	form.append("IMG_5", image);

	const request = new Request(`http://localhost/${path}`, {
		method: "POST",
		body: form,
	});

	await Bun.sleep(t * 100);
	await app.handle(request);
}

async function testRequestFull(path: string) {
	console.log(path);
	const s = process.memoryUsage().rss;
	console.log("start memory", s / 1024 / 1024, "MB");

	const responseList = Promise.all([
		testRequest(path, 0),
		testRequest(path, 1),
		testRequest(path, 2),
		testRequest(path, 3),
		testRequest(path, 4),
	]);

	await responseList;
	await Bun.sleep(waitSleepDuration);
	const rss = process.memoryUsage().rss;
	console.log("end   memory", rss / 1024 / 1024, "MB");
	console.log("diff", (rss - s) / 1024 / 1024, "MB");
}

test("upload-gc-true", async () => {
	await testRequestFull("gc-true");
});

test("upload-gc-false", async () => {
	await testRequestFull("gc-false");
});

test("upload", async () => {
	await testRequestFull("");
});
