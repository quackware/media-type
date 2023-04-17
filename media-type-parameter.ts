/**
 * Represents the `parameter` portion of a media type identifier.
 *
 * For example: Given the media type `application/json; charset=utf-8` the parameter would be `charset=utf-8`
 * with the key being `charset` and the value being `utf-8`.
 */
export class MediaTypeParameter {
  static fromMediaType(mediaType: string) {
    const [, param] = mediaType.split(";");
    if (!param) {
      return;
    }
    let [key, value] = param.split("=");
    key = key.trim();
    value = value.trim();
    if (!key || !value) {
      return;
    }
    return new MediaTypeParameter(key, value);
  }

  constructor(readonly key: string, readonly value: string) {}
}
