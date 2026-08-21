// Data access layer. This is the only file that talks to Prisma directly —
// components and pages should always go through these functions instead of
// importing PrismaClient themselves.

import { PrismaClient } from "../app/generated/prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";

const adapter = new PrismaLibSql({
  url: process.env.DATABASE_URL ?? "file:./dev.db",
});

const prisma = new PrismaClient({ adapter });

export function getAllPhotographers() {
  return prisma.photographer.findMany();
}

export function getPhotographer(id) {
  return prisma.photographer.findUnique({
    where: { id: Number(id) },
  });
}

export function getAllMediasForPhotographer(photographerId) {
  return prisma.media.findMany({
    where: { photographerId: Number(photographerId) },
  });
}

export function updateNumberOfLikes(mediaId, newNumberOfLikes) {
  return prisma.media.update({
    where: { id: mediaId },
    data: { likes: newNumberOfLikes },
  });
}