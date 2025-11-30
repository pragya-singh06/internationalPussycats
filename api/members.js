import { PrismaClient } from "@prisma/client";

let prisma;
if (!global._prisma) {
  global._prisma = new PrismaClient();
}
prisma = global._prisma;

export default async function handler(req, res) {
  try {
    if (req.method === "GET") {
      const members = await prisma.member.findMany({ orderBy: { joinedAt: "desc" } });
      return res.status(200).json(members);
    }

    if (req.method === "POST") {
      const { firstname, lastname, city, instrument } = req.body;
      if (!firstname || !lastname || !city || !instrument) {
        return res.status(400).json({ error: "Missing fields" });
      }
      const member = await prisma.member.create({
        data: { firstname, lastname, city, instrument }
      });
      return res.status(200).json({ success: true, member });
    }

    res.setHeader("Allow", "GET, POST");
    return res.status(405).end("Method Not Allowed");
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
