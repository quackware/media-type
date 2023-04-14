import { MediaType } from "../media-type.ts";
import { assertEquals, assertExists, assertInstanceOf } from "./deps.ts";

Deno.test("MediaType", async (t) => {
  await t.step("fromMediaTypeString find MediaType instance for valid mediaType", () => {
    const mt = MediaType.fromMediaTypeString("application/javascript");
    assertExists(mt);
    assertInstanceOf(mt, MediaType);
  });

  await t.step("fromMediaTypeString not find MediaType instance for invalid mediaType", () => {
    const mt = MediaType.fromMediaTypeString("asd");
    assertEquals(mt, undefined);
  });

  await t.step("fromExtension find MediaType instance for valid extension", () => {
    const mt = MediaType.fromExtension(".ts");
    assertExists(mt);
    assertInstanceOf(mt, MediaType);
    assertEquals(mt.type, "application/typescript");
  });

  await t.step("fromExtension not find MediaType instance for invalid extension", () => {
    const mt = MediaType.fromMediaTypeString(".some-fake-extension");
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
