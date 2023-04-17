import { MediaTypeParameter } from "../media-type-parameter.ts";
import { assertEquals, assertExists, assertInstanceOf } from "./deps.ts";

Deno.test("MediaTypeParameter", async (t) => {
  await t.step("fromMediaType find MediaTypeParameter instance for valid mediaType", () => {
    const mt = MediaTypeParameter.fromMediaType("text/plain;charset=utf-8");
    assertExists(mt);
    assertInstanceOf(mt, MediaTypeParameter);
    assertEquals(mt.key, "charset");
    assertEquals(mt.value, "utf-8");
  });

  await t.step("fromMediaType not find MediaTypeParameter instance for missing mediaType", () => {
    const mt = MediaTypeParameter.fromMediaType("application/javascript");
    assertEquals(mt, undefined);
  });

  await t.step("fromMediaType not find MediaTypeParameter instance for invalid mediaType", () => {
    const mt = MediaTypeParameter.fromMediaType("asd");
    assertEquals(mt, undefined);
  });
});
