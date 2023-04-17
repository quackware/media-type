import { MediaType } from "../media-type.ts";
import { assertEquals, assertExists, assertInstanceOf } from "./deps.ts";

Deno.test("MediaType", async (t) => {
  await t.step("fromMediaType find MediaType instance for valid mediaType", () => {
    const mt = MediaType.fromMediaType("application/javascript");
    assertExists(mt);
    assertInstanceOf(mt, MediaType);
  });

  await t.step("fromMediaType not find MediaType instance for invalid mediaType", () => {
    const mt = MediaType.fromMediaType("asd");
    assertEquals(mt, undefined);
  });

  await t.step("fromMediaType find MediaType instance for mediaType with parameter", () => {
    const mt = MediaType.fromMediaType("text/plain;charset=utf-8");
    assertExists(mt);
    assertInstanceOf(mt, MediaType);
  });

  await t.step("fromExtension find MediaType instance for valid extension", () => {
    const mt = MediaType.fromExtension(".ts");
    assertExists(mt);
    assertInstanceOf(mt, MediaType);
    assertEquals(mt.type, "application/typescript");
  });

  await t.step("fromExtension not find MediaType instance for invalid extension", () => {
    const mt = MediaType.fromMediaType(".some-fake-extension");
    assertEquals(mt, undefined);
  });

  await t.step("fromPath find MediaType instance for valid path", () => {
    const mt = MediaType.fromPath("/foo/bar/baz.ts");
    assertExists(mt);
    assertInstanceOf(mt, MediaType);
    assertEquals(mt.type, "application/typescript");

    const anotherMt = MediaType.fromPath("/foo/bar/baz.tgz");
    assertExists(anotherMt);
    assertInstanceOf(anotherMt, MediaType);
    assertEquals(anotherMt.type, "application/x-tar-gz");
  });

  await t.step("fromPath not find MediaType instance for invalid path", () => {
    const mt = MediaType.fromPath("not_path");
    assertEquals(mt, undefined);
  });

  await t.step("fromPath find MediaType instance for chained extension", () => {
    const mt = MediaType.fromPath("/foo/bar/baz.tar.gz");
    assertExists(mt);
    assertInstanceOf(mt, MediaType);
    assertEquals(mt.type, "application/x-tar-gz");
  });
});
