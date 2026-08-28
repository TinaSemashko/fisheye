import { PrismaClient } from "../app/generated/prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";

const adapter = new PrismaLibSql({
  url: process.env.DATABASE_URL ?? "file:./dev.db",
});

const prisma = new PrismaClient({ adapter });

export function getAllPhotographers() {
  return prisma.photographer.findMany();
}

export function getPhotographer(id: string | number) {
  return prisma.photographer.findUnique({
    where: { id: Number(id) },
  });
}

export function getAllMediasForPhotographer(photographerId: string | number) {
  return prisma.media.findMany({
    where: { photographerId: Number(photographerId) },
  });
}

export function updateNumberOfLikes(mediaId: number, newNumberOfLikes: number) {
  return prisma.media.update({
    where: { id: mediaId },
    data: { likes: newNumberOfLikes },
  });
}