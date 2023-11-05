import { readCSV } from "../io/Readers.js";
import { getFileMetaData } from "./ImportService.js";
import { hash } from "./ImportService.js";

// Does hashing the buffer or string result in a different hash

async function importCronometer(source: File) {
  const fileMeta = getFileMetaData(source.name);
  const stringHash = hash(await source.text());
  const bufferHash = hash(Buffer.from(await source.arrayBuffer()));
  const records = await readCSV(source);
}
