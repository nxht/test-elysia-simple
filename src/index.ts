import Elysia, { t } from "elysia";

function printMemory(msg: string) {
	const { rss } = process.memoryUsage();
	console.log(msg, rss / 1024 / 1024, "MB");
}

export const app = new Elysia()
	.get("/", () => "hello world")
	.post(
		"/",
		async ({ body: { IMG_1, IMG_2, IMG_3, IMG_4, IMG_5 } }) => {
			Buffer.from(await IMG_1.arrayBuffer());
			Buffer.from(await IMG_2.arrayBuffer());
			Buffer.from(await IMG_3.arrayBuffer());
			Buffer.from(await IMG_4.arrayBuffer());
			Buffer.from(await IMG_5.arrayBuffer());

			return "test";
		},
		{
			type: "formdata",
			body: t.Object({
				IMG_1: t.File(),
				IMG_2: t.File(),
				IMG_3: t.File(),
				IMG_4: t.File(),
				IMG_5: t.File(),
			}),
		},
	)
	.post(
		"/gc-false",
		async ({ body: { IMG_1, IMG_2, IMG_3, IMG_4, IMG_5 } }) => {
			Buffer.from(await IMG_1.arrayBuffer());
			Buffer.from(await IMG_2.arrayBuffer());
			Buffer.from(await IMG_3.arrayBuffer());
			Buffer.from(await IMG_4.arrayBuffer());
			Buffer.from(await IMG_5.arrayBuffer());

			return "test";
		},
		{
			type: "formdata",
			body: t.Object({
				IMG_1: t.File(),
				IMG_2: t.File(),
				IMG_3: t.File(),
				IMG_4: t.File(),
				IMG_5: t.File(),
			}),
			afterResponse: () => {
				Bun.gc(false);
			},
		},
	)
	.post(
		"/gc-true",
		async ({ body: { IMG_1, IMG_2, IMG_3, IMG_4, IMG_5 } }) => {
			Buffer.from(await IMG_1.arrayBuffer());
			Buffer.from(await IMG_2.arrayBuffer());
			Buffer.from(await IMG_3.arrayBuffer());
			Buffer.from(await IMG_4.arrayBuffer());
			Buffer.from(await IMG_5.arrayBuffer());

			return "test";
		},
		{
			type: "formdata",
			body: t.Object({
				IMG_1: t.File(),
				IMG_2: t.File(),
				IMG_3: t.File(),
				IMG_4: t.File(),
				IMG_5: t.File(),
			}),
			afterResponse: () => {
				Bun.gc(true);
			},
		},
	);
