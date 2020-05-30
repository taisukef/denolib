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

function isAsync(func) {
  return func.constructor.name === "AsyncFunction";
}

let asyncflg = false;

const it = (name, func) => {
  asyncflg = isAsync(func);
  Deno.test(name, func);
}

const makeDirname = importmetaurl => importmetaurl.substring(0, importmetaurl.lastIndexOf('/')).substring("file://".length)

// const __dirname = import.meta.url.substring(0, import.meta.url.lastIndexOf('/')).substring("file://".length)

let beforefunc = null;
const before = f => beforefunc = f;
let afterfunc = null;
const after = f => afterfunc = f;

const expect = test => {
  const res = {
    deep: {
      equal: chk => {
        if (!asyncflg) {
          denoassert(test, chk);
        } else {
          if (!Object.is(test. chk)) {
            throw new Error(test + " is not " + chk);
          }
        }
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
        if (!asyncflg) {
          denoassert(test, chk);
        } else {
          if (test !== chk) { // !Object.is(test. chk)) {
            throw new Error(test + " != " + chk);
          }
        }
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

export { describe, assert, it, expect, before, after, makeDirname };
