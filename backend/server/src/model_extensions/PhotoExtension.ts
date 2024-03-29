import { Prisma, Photo } from "@prisma/client";
import { storage } from "../storage.js";
import { hash, getFileExtension } from "../util/utils.js";
import { v4 as uuidv4 } from "uuid";
import { fileTypeFromBuffer } from "file-type";

type PhotoQuery = {
  include?: Prisma.PhotoInclude | undefined;
  select?: Prisma.PhotoSelect | undefined;
};
export const photoExtension = Prisma.defineExtension((client) => {
  return client.$extends({
    model: {
      photo: {
        async uploadPhoto(
          file: Buffer,
          fileName: string,
          query?: PhotoQuery
        ): Promise<Photo> {
          const hashValue = hash(file);

          // Check the DB to see if we already have it
          const record = await client.photo.findUnique({
            where: { hash: hashValue },
            ...query,
          });
          if (record) {
            return record;
          }

          const metaData = await fileTypeFromBuffer(file);
          const ext = getFileExtension(fileName);

          // If not, save to storage. Then return photo record.
          const name = `${uuidv4()}.${metaData?.ext ?? ext}`;
          await storage.putObject("images", name, file, {
            "Content-Type": metaData?.mime,
          });
          return await client.photo.create({
            data: {
              path: `images/${name}`,
              hash: hashValue,
            },
            ...query,
          });
        },
      },
    },
  });
});
