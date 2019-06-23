// tslint:disable-next-line:missing-jsdoc
import { expect } from "chai";
import * as xml_1_0_ed4 from "../src/xml/1.0/ed4";
import * as xml_1_0_ed5 from "../src/xml/1.0/ed5";
import * as xml_1_1_ed2 from "../src/xml/1.1/ed2";
import * as xmlns_1_0_ed3 from "../src/xmlns/1.0/ed3";

interface Fixture {
  name: string;
  data: string;
}

const x: Fixture = {
  name: "simple 'x' case",
  data: "x",
};

const abc: Fixture = {
  name: "simple 'abc' case",
  data: "abc",
};

const poo: Fixture = {
  name: "poo test",
  data: "\u{1F4A9}",
};

const colon: Fixture = {
  name: "colon",
  data: ":",
};

const space: Fixture = {
  name: "space",
  data: " ",
};

const tab: Fixture = {
  name: "tab",
  data: "\t",
};

const newline: Fixture = {
  name: "newline",
  data: "\n",
};

const cr: Fixture = {
  name: "carriage return",
  data: "\r",
};

const ideographic: Fixture = {
  name: "ideographic character",
  data: "我",
};

const combining: Fixture = {
  name: "combining char",
  data: "\u0300",
};

const digit: Fixture = {
  name: "digit",
  data: "1",
};

const extender: Fixture = {
  name: "extender",
  data: "\u00B7",
};

const nameWithColon: Fixture = {
  name: "name with colon",
  data: "foo:bar",
};

const leadingDot: Fixture = {
  name: "leading dot",
  data: ".bar",
};

const leadingDash: Fixture = {
  name: "leading dot",
  data: "-bar",
};

const leadingDigit: Fixture = {
  name: "leading digit",
  data: "1bar",
};

const bom: Fixture = {
  name: "bom",
  data: "\uFFFE",
};

const one: Fixture = {
  name: "\\u0001",
  data: "\u0001",
};

// tslint:disable-next-line:mocha-no-side-effect-code
const ALL_FIXTURES = new Set([
  x,
  abc,
  poo,
  colon,
  space,
  tab,
  newline,
  cr,
  ideographic,
  combining,
  digit,
  extender,
  nameWithColon,
  leadingDot,
  leadingDash,
  leadingDigit,
  bom,
  one,
]);

interface Case {
  matching: Fixture[];
}

function makeTests(re: RegExp, testCase: Case): void {
  describe("matches", () => {
    for (const matchingCase of testCase.matching) {
      if (!ALL_FIXTURES.has(matchingCase)) {
        throw new Error(
          `fixture ${matchingCase.name} is missing from ALL_FIXTURES`);
      }
      it(matchingCase.name, () => {
        expect(re.test(matchingCase.data)).to.be.true;
      });
    }
  });

  describe("does not match", () => {
    for (const f of ALL_FIXTURES) {
      if (!testCase.matching.includes(f)) {
        it(f.name, () => {
          expect(re.test(f.data)).to.be.false;
        });
      }
    }
  });
}

function makeCodePointTestTests(codePointTest: (c: number) => boolean,
                                testCase: Case): void {
  for (const fixture of testCase.matching) {
    const { data, name } = fixture;
    // tslint:disable-next-line:no-non-null-assertion
    const code = data.codePointAt(0)!;
    if (data.length > String.fromCodePoint(code).length) {
      // We skip those fixtures that contain more than one character.
      continue;
    }
    it(`matches ${name}`, () => {
      expect(codePointTest(code)).to.be.true;
    });
  }

  for (const fixture of ALL_FIXTURES) {
    if (!testCase.matching.includes(fixture)) {
      const { data, name } = fixture;
      // tslint:disable-next-line:no-non-null-assertion
      const code = data.codePointAt(0)!;
      if (data.length > String.fromCodePoint(code).length) {
        // We skip those fixtures that contain more than one character.
        continue;
      }
      it(`does not match ${name}`, () => {
        expect(codePointTest(code)).to.be.false;
      });
    }
  }
}

type FilterPropertyName<T, P> =
  { [K in keyof T]: T[K] extends P ? K : never }[keyof T];

describe("xml/1.0", () => {
  describe("ed5", () => {
    // tslint:disable-next-line:mocha-no-side-effect-code
    const cases: Record<FilterPropertyName<typeof xml_1_0_ed5, RegExp>,
    Case> = {
      CHAR_RE: {
        matching: [x, poo, colon, space, tab, newline, cr, ideographic,
                   combining, digit, extender],
      },
      S_RE: {
        matching: [space, tab, newline, cr],
      },
      NAME_START_CHAR_RE: {
        matching: [x, ideographic, poo, colon],
      },
      NAME_CHAR_RE: {
        matching: [x, ideographic, poo, colon, combining, extender, digit],
      },
      NAME_RE: {
        matching: [x, abc, ideographic, colon, nameWithColon, poo],
      },
      NMTOKEN_RE: {
        matching: [x, abc, ideographic, colon, nameWithColon, leadingDot,
                   leadingDash, leadingDigit, combining, extender, digit, poo],
      },
    };

    describe("regexes", () => {
      // tslint:disable-next-line:mocha-no-side-effect-code
      for (const name of (Object.keys(cases) as (keyof typeof cases)[])) {
        describe(name, () => {
          // tslint:disable-next-line:mocha-no-side-effect-code
          makeTests(xml_1_0_ed5[name], cases[name]);
        });
      }
    });

    describe(".isChar", () => {
      // tslint:disable-next-line:mocha-no-side-effect-code
      makeCodePointTestTests(xml_1_0_ed5.isChar, cases.CHAR_RE);
    });

    describe(".isS", () => {
      // tslint:disable-next-line:mocha-no-side-effect-code
      makeCodePointTestTests(xml_1_0_ed5.isS, cases.S_RE);
    });

    describe(".isNameStartChar", () => {
      // tslint:disable-next-line:mocha-no-side-effect-code
      makeCodePointTestTests(xml_1_0_ed5.isNameStartChar,
                             cases.NAME_START_CHAR_RE);
    });

    describe(".isNameChar", () => {
      // tslint:disable-next-line:mocha-no-side-effect-code
      makeCodePointTestTests(xml_1_0_ed5.isNameChar, cases.NAME_CHAR_RE);
    });
  });

  describe("ed4 regexes", () => {
    // tslint:disable-next-line:mocha-no-side-effect-code
    const cases: Record<FilterPropertyName<typeof xml_1_0_ed4, RegExp>,
    Case> = {
      CHAR_RE: {
        matching: [x, poo, colon, space, tab, newline, cr, ideographic,
                   combining, digit, extender],
      },
      S_RE: {
        matching: [space, tab, newline, cr],
      },
      BASE_CHAR_RE: {
        matching: [x],
      },
      IDEOGRAPHIC_RE: {
        matching: [ideographic],
      },
      COMBINING_CHAR_RE: {
        matching: [combining],
      },
      DIGIT_RE: {
        matching: [digit],
      },
      EXTENDER_RE: {
        matching: [extender],
      },
      LETTER_RE: {
        matching: [x, ideographic],
      },
      NAME_CHAR_RE: {
        matching: [x, ideographic, colon, digit, extender, combining],
      },
      NAME_RE: {
        matching: [x, abc, ideographic, colon, nameWithColon],
      },
      NMTOKEN_RE: {
        matching: [x, abc, ideographic, colon, nameWithColon, leadingDot,
                   leadingDash, leadingDigit, combining, extender, digit],
      },
    };

    // tslint:disable-next-line:mocha-no-side-effect-code
    for (const name of (Object.keys(cases) as (keyof typeof cases)[])) {
      describe(name, () => {
        // tslint:disable-next-line:mocha-no-side-effect-code
        makeTests(xml_1_0_ed4[name], cases[name]);
      });
    }
  });
});

describe("xml/1.1", () => {
  describe("ed2", () => {
    // tslint:disable-next-line:mocha-no-side-effect-code
    const cases: Record<FilterPropertyName<typeof xml_1_1_ed2, RegExp>,
    Case> = {
      CHAR_RE: {
        matching: [one, x, poo, colon, space, tab, newline, cr, ideographic,
                   combining, digit, extender],
      },
      S_RE: {
        matching: [space, tab, newline, cr],
      },
      NAME_START_CHAR_RE: {
        matching: [x, ideographic, poo, colon],
      },
      NAME_CHAR_RE: {
        matching: [x, ideographic, poo, colon, combining, extender, digit],
      },
      NAME_RE: {
        matching: [x, abc, ideographic, colon, nameWithColon, poo],
      },
      NMTOKEN_RE: {
        matching: [x, abc, ideographic, colon, nameWithColon, leadingDot,
                   leadingDash, leadingDigit, combining, extender, digit, poo],
      },
    };

    describe("regexes", () => {
      // tslint:disable-next-line:mocha-no-side-effect-code
      for (const name of (Object.keys(cases) as (keyof typeof cases)[])) {
        describe(name, () => {
          // tslint:disable-next-line:mocha-no-side-effect-code
          makeTests(xml_1_1_ed2[name], cases[name]);
        });
      }
    });

    describe(".isChar", () => {
      // tslint:disable-next-line:mocha-no-side-effect-code
      makeCodePointTestTests(xml_1_1_ed2.isChar, cases.CHAR_RE);
    });

    describe(".isS", () => {
      // tslint:disable-next-line:mocha-no-side-effect-code
      makeCodePointTestTests(xml_1_1_ed2.isS, cases.S_RE);
    });

    describe(".isNameStartChar", () => {
      // tslint:disable-next-line:mocha-no-side-effect-code
      makeCodePointTestTests(xml_1_1_ed2.isNameStartChar,
                             cases.NAME_START_CHAR_RE);
    });

    describe(".isNameChar", () => {
      // tslint:disable-next-line:mocha-no-side-effect-code
      makeCodePointTestTests(xml_1_1_ed2.isNameChar, cases.NAME_CHAR_RE);
    });
  });
});

describe("xmlns/1.0", () => {
  describe("ed3", () => {
    // tslint:disable-next-line:mocha-no-side-effect-code
    const cases: Record<FilterPropertyName<typeof xmlns_1_0_ed3, RegExp>,
    Case> = {
      NC_NAME_START_CHAR_RE: {
        matching: [x, ideographic, poo],
      },
      NC_NAME_CHAR_RE: {
        matching: [x, ideographic, poo, combining, extender, digit],
      },
      NC_NAME_RE: {
        matching: [x, abc, ideographic, poo],
      },
    };

    describe("regexes", () => {
      // tslint:disable-next-line:mocha-no-side-effect-code
      for (const name of (Object.keys(cases) as (keyof typeof cases)[])) {
        describe(name, () => {
          // tslint:disable-next-line:mocha-no-side-effect-code
          makeTests(xmlns_1_0_ed3[name], cases[name]);
        });
      }
    });

    describe(".isNCNameStartChar", () => {
      // tslint:disable-next-line:mocha-no-side-effect-code
      makeCodePointTestTests(xmlns_1_0_ed3.isNCNameStartChar,
                             cases.NC_NAME_START_CHAR_RE);
    });

    describe(".isNCNameChar", () => {
      // tslint:disable-next-line:mocha-no-side-effect-code
      makeCodePointTestTests(xmlns_1_0_ed3.isNCNameChar, cases.NC_NAME_CHAR_RE);
    });
  });
});
