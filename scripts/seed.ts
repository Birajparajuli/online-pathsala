const { PrismaClient } = require("@prisma/client");

const database = new PrismaClient();

async function main() {
	try {
		console.log("Please wait seeding...");
		await database.category.createMany({
			data: [
				{ name: "Web Devlopment" },
				{ name: "Graphic Design" },
				{ name: "UI/UX Design" },
				{ name: "SEO" },
				{ name: "Photography" },
				{ name: "Social Media Marketing" },
				{ name: "Filming" },
			],
		});

		console.log("Success");
	} catch (error) {
		console.log("Error seeding the database categories", error);
	} finally {
		await database.$disconnect();
	}
}

main();
