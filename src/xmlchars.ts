/**
 * Character classes for XML.
 *
 * @deprecated since 1.3.0. Import from the ``xml`` and ``xmlns`` hierarchies
 * instead.
 *
 * @author Louis-Dominique Dubeau
 * @license MIT
 * @copyright Louis-Dominique Dubeau
 */

import * as ed4 from "./xml/1.0/ed4";
import * as ed5 from "./xml/1.0/ed5";
import * as nsed3 from "./xmlns/1.0/ed3";

// tslint:disable-next-line:no-console
console.warn("DEPRECATION WARNING: the xmlchar *module* is deprecated: please \
replace e.g. require('xmlchars') with require('xmlchars/xml/...')");

/**
 * Character class utilities for XML 1.0.
 */
// tslint:disable-next-line:no-namespace
export namespace XML_1_0 {
  /**
   * Fifth edition.
   */
  export namespace ED5 {
    /**
     * Regular expression fragments. These fragments are designed to be included
     * inside square brackets in a regular expression.
     */
    export namespace fragments {
      export const CHAR = ed5.CHAR;
      export const S = ed5.S;
      export const NAME_START_CHAR = ed5.NAME_START_CHAR;
      export const NAME_CHAR = ed5.NAME_CHAR;
    }

    /**
     * Regular expression. These correspond to the productions of the same name
     * in the specification.
     */
    export namespace regexes {
      export const CHAR = ed5.CHAR_RE;
      export const S = ed5.S_RE;
      export const NAME_START_CHAR = ed5.NAME_START_CHAR_RE;
      export const NAME_CHAR = ed5.NAME_CHAR_RE;
      export const NAME = ed5.NAME_RE;
      export const NMTOKEN = ed5.NMTOKEN_RE;
    }

    /**
     * Lists of characters.
     *
     * The names defined in this namespace are arrays of codepoints which
     * contain the set of codepoints that an XML production encompasses. Note
     * that many productions are too large to be reasonably represented as sets.
     */
    export namespace lists {
      export const S = ed5.S_LIST;
    }

    /**
     * Determines whether a codepoint matches the ``CHAR`` production.
     *
     * @param c The code point.
     *
     * @returns ``true`` if the codepoint matches ``CHAR``.
     */
    export const isChar = ed5.isChar;

    /**
     * Determines whether a codepoint matches the ``S`` (space) production.
     *
     * @param c The code point.
     *
     * @returns ``true`` if the codepoint matches ``S``.
     */
    export const isS = ed5.isS;

    /**
     * Determines whether a codepoint matches the ``NAME_START_CHAR``
     * production.
     *
     * @param c The code point.
     *
     * @returns ``true`` if the codepoint matches ``NAME_START_CHAR``.
     */
    export const isNameStartChar = ed5.isNameStartChar;

    /**
     * Determines whether a codepoint matches the ``NAME_CHAR`` production.
     *
     * @param c The code point.
     *
     * @returns ``true`` if the codepoint matches ``NAME_CHAR``.
     */
    export const isNameChar = ed5.isNameChar;
  }

  /**
   * Fourth edition. These are deprecated in the 5th edition but some of the
   * standards related to XML 1.0 (e.g. XML Schema 1.0) refer to these. So they
   * are still generally useful.
   */
  export namespace ED4 {
    /**
     * Regular expression fragments. These fragments are designed to be included
     * inside square brackets in a regular expression.
     */
    export namespace fragments {
      export const CHAR = ed4.CHAR;
      export const S = ed4.S;
      export const BASE_CHAR = ed4.BASE_CHAR;
      export const IDEOGRAPHIC = ed4.IDEOGRAPHIC;
      export const COMBINING_CHAR = ed4.COMBINING_CHAR;
      export const DIGIT = ed4.DIGIT;
      export const EXTENDER = ed4.EXTENDER;
      export const LETTER = ed4.LETTER;
      export const NAME_CHAR = ed4.NAME_CHAR;
    }

    /**
     * Regular expression. These correspond to the productions of the same
     * name in the specification.
     */
    export namespace regexes {
      export const CHAR = ed4.CHAR_RE;
      export const S = ed4.S_RE;
      export const BASE_CHAR = ed4.BASE_CHAR_RE;
      export const IDEOGRAPHIC = ed4.IDEOGRAPHIC_RE;
      export const COMBINING_CHAR = ed4.COMBINING_CHAR_RE;
      export const DIGIT = ed4.DIGIT_RE;
      export const EXTENDER = ed4.EXTENDER_RE;
      export const LETTER = ed4.LETTER_RE;
      export const NAME_CHAR = ed4.NAME_CHAR_RE;
      export const NAME = ed4.NAME_RE;
      export const NMTOKEN = ed4.NMTOKEN_RE;
    }
  }
}

/**
 * Character class utilities for XML NS 1.0.
 */
// tslint:disable-next-line:no-namespace
export namespace XMLNS_1_0 {

  /**
   * Third edition.
   */
  export namespace ED3 {
    /**
     * Regular expression fragments. These fragments are designed to be included
     * inside square brackets in a regular expression.
     */
    export namespace fragments {
      export const NC_NAME_START_CHAR = nsed3.NC_NAME_START_CHAR;
      export const NC_NAME_CHAR = nsed3.NC_NAME_CHAR;
    }

    /**
     * Regular expression. These correspond to the productions of the same name
     * in the specification.
     */
    export namespace regexes {
      export const NC_NAME_START_CHAR = nsed3.NC_NAME_START_CHAR_RE;
      export const NC_NAME_CHAR = nsed3.NC_NAME_CHAR_RE;
      export const NC_NAME = nsed3.NC_NAME_RE;
    }

    /**
     * Determines whether a codepoint matches
     * [[regexes.NC_NAME_START_CHAR]].
     *
     * @param c The code point.
     *
     * @returns ``true`` if the codepoint matches.
     */
    export const isNCNameStartChar = nsed3.isNCNameStartChar;

    /**
     * Determines whether a codepoint matches [[regexes.NC_NAME_CHAR]].
     *
     * @param c The code point.
     *
     * @returns ``true`` if the codepoint matches.
     */
    export const isNCNameChar = nsed3.isNCNameChar;
  }
}
