import { assert as denoassert, assertStrictEq } from "https://deno.land/std/testing/asserts.ts";

const describe = (name, testfunc) => {
  console.log('test start: ', name);
  testfunc();
}

const assert = {
  strictEqual: assertStrictEq,
  ok: denoassert,
  deepEqual: assertStrictEq,
};

const it = Deno.test;

const makeDirname = importmetaurl => importmetaurl.substring(0, importmetaurl.lastIndexOf('/')).substring("file://".length)

// const __dirname = import.meta.url.substring(0, import.meta.url.lastIndexOf('/')).substring("file://".length)

const expect = test => {
  const res = {
    deep: {
      equal: chk => {
        denoassert(test, chk);
        return res;
      }
    },
    to: {
      throw: () => {
        try {
          denoassert(false);
          return;
        } catch (e) {
        }
        denoassert(true);
      },
      equal: chk => {
        denoassert(test, chk);
        return res;
      },
      have: {
        lengthOf: n => {
          denoassert(test.length === n);
          return res;
        }
      }
    },
    not: {
      to: {
        throw: () => {
          try {
            denoassert(true);
            return;
          } catch (e) {
          }
          denoassert(false);
        }
      }
    }
  }
  return res;
}

export { describe, assert, it, expect, makeDirname };
