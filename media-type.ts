import { basename, Extension, extname, LiteralUnion } from "./deps.ts";
import { KnownMediaType, KnownMediaTypeExtensions, MEDIA_TYPE_DATA } from "./media-type-data.ts";

export class MediaType<T extends KnownMediaType> {
  static KNOWN_MEDIA_TYPES = MEDIA_TYPE_DATA.map(({ mediaType, name, extensions }) =>
    new MediaType(mediaType, name, extensions.slice())
  );

  /** Attempt to find a known {@linkcode MediaType} for the given {@linkcode mediaTypeString}. */
  static fromMediaTypeString(mediaTypeString: LiteralUnion<KnownMediaType, string>) {
    return MediaType.KNOWN_MEDIA_TYPES.find((t) => t.type === mediaTypeString);
  }

  /** Attempt to find a known {@linkcode MediaType} for the given {@linkcode ext}. */
  static fromExtension(ext: LiteralUnion<KnownMediaTypeExtensions, Extension>) {
    return MediaType.KNOWN_MEDIA_TYPES.find((t) => t.extensions.includes(ext));
  }

  /** Attempt to find a known {@linkcode MediaType} for the given {@linkcode path}. */
  static fromPath(path: string | URL) {
    const pathString = typeof path === "string" ? path : path.pathname;
    // extname only picks the last extension in a file (i.e `.gz` from `.tar.gz`) and we want
    // to support these chained extensions. So we use basename here first to do a greedy check
    const filename = basename(pathString);
    const [, ...possibleExtensions] = filename.split(".");
    return MediaType.fromExtension(`.${possibleExtensions.join(".")}`)
      ?? MediaType.fromExtension(extname(pathString) as Extension);
  }

  readonly extensions: Extension[];

  constructor(
    readonly type: T,
    readonly name: string,
    extensions?: string | string[] | Extension | Extension[],
  ) {
    if (extensions) {
      const extArray = Array.isArray(extensions) ? extensions : [extensions];
      this.extensions = extArray.map((e) => e.startsWith(".") ? e : `.${e}`) as Extension[];
    } else {
      this.extensions = [];
    }
  }
}
