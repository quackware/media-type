export const MEDIA_TYPE_DATA = [
  {
    mediaType: "application/typescript",
    name: "TypeScript",
    extensions: [".ts", ".d.ts", ".mts", ".cts"],
  },
  {
    mediaType: "application/javascript",
    name: "JavaScript",
    extensions: [".js", ".mjs", ".cjs"],
  },
  {
    mediaType: "text/plain",
    name: "Text",
    extensions: [".txt"],
  },
  {
    mediaType: "text/csv",
    name: "CSV",
    extensions: [".csv"],
  },
  {
    mediaType: "application/json",
    name: "JSON",
    extensions: [".json"],
  },
  {
    mediaType: "application/vnd.ms-excel",
    name: "Excel",
    extensions: [".xlsx", ".xls"],
  },
  {
    mediaType: "text/markdown",
    name: "Markdown",
    extensions: [".md"],
  },
  {
    mediaType: "text/html",
    name: "HTML",
    extensions: [".html"],
  },
  {
    mediaType: "application/x-gzip",
    name: "GZIP",
    extensions: [".gzip"],
  },
  {
    mediaType: "application/x-tar",
    name: "Tarball",
    extensions: [".tar"],
  },
  {
    mediaType: "application/x-tar-gz",
    name: "GZIP Tarball",
    extensions: [".tgz", ".tar.gz"],
  },
  {
    mediaType: "application/schema+json",
    name: "JSON Schema",
    extensions: [".schema.json"],
  },
] as const;
export type AllMediaTypeData = typeof MEDIA_TYPE_DATA;
export type MediaTypeData = AllMediaTypeData[number];

export type KnownMediaType = MediaTypeData["mediaType"];
export type KnownMediaTypeExtensions = MediaTypeData["extensions"][number];
