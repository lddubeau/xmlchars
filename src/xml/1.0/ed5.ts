/**
 * Character classes and associated utilities for the 5th edition of XML 1.0.
 *
 * @author Louis-Dominique Dubeau
 * @license MIT
 * @copyright Louis-Dominique Dubeau
 */

//
// Fragments.
//
export const CHAR = "\t\n\r\u0020-\uD7FF\uE000-\uFFFD\u{10000}-\u{10FFFF}";

export const S = " \t\r\n";

// tslint:disable-next-line:max-line-length
export const NAME_START_CHAR = ":A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u{10000}-\u{EFFFF}";

export const NAME_CHAR =
  `-${NAME_START_CHAR}.0-9\u00B7\u0300-\u036F\u203F-\u2040`;

//
// Regular expressions.
//

export const CHAR_RE = new RegExp(`^[${CHAR}]$`, "u");

export const S_RE = new RegExp(`^[${S}]+$`, "u");

export const NAME_START_CHAR_RE = new RegExp(`^[${NAME_START_CHAR}]$`, "u");

export const NAME_CHAR_RE = new RegExp(`^[${NAME_CHAR}]$`, "u");

export const NAME_RE = new RegExp(`^[${NAME_START_CHAR}][${NAME_CHAR}]*$`, "u");

export const NMTOKEN_RE = new RegExp(`^[${NAME_CHAR}]+$`, "u");

const TAB = 9;
const NL = 0xA;
const CR = 0xD;
const SPACE = 0x20;

//
// Lists.
//

/** All characters in the ``S`` production. */
export const S_LIST = [SPACE, NL, CR, TAB];

/**
 * Determines whether a codepoint matches the ``CHAR`` production.
 *
 * @param c The code point.
 *
 * @returns ``true`` if the codepoint matches ``CHAR``.
 */
export function isChar(c: number): boolean {
  return (c > SPACE && c <= 0xD7FF) ||
    S_LIST.includes(c) ||
    (c >= 0xE000 && c <= 0xFFFD) ||
    (c >= 0x10000 && c <= 0x10FFFF);
}

/**
 * Determines whether a codepoint matches the ``S`` (space) production.
 *
 * @param c The code point.
 *
 * @returns ``true`` if the codepoint matches ``S``.
 */
export function isS(c: number): boolean {
  return S_LIST.includes(c);
}

const NAME_START_CHAR_LIST = [0x3A, 0x5F, 0x200C, 0x200D];

/**
 * Determines whether a codepoint matches the ``NAME_START_CHAR`` production.
 *
 * @param c The code point.
 *
 * @returns ``true`` if the codepoint matches ``NAME_START_CHAR``.
 */
export function isNameStartChar(c: number): boolean {
  return ((c >= 0x41 && c <= 0x5A) ||
          (c >= 0x61 && c <= 0x7A) ||
          NAME_START_CHAR_LIST.includes(c) ||
          (c >= 0xC0 && c <= 0xD6) ||
          (c >= 0xD8 && c <= 0xF6) ||
          (c >= 0x00F8 && c <= 0x02FF) ||
          (c >= 0x0370 && c <= 0x037D) ||
          (c >= 0x037F && c <= 0x1FFF) ||
          (c >= 0x2070 && c <= 0x218F) ||
          (c >= 0x2C00 && c <= 0x2FEF) ||
          (c >= 0x3001 && c <= 0xD7FF) ||
          (c >= 0xF900 && c <= 0xFDCF) ||
          (c >= 0xFDF0 && c <= 0xFFFD) ||
          (c >= 0x10000 && c <= 0xEFFFF));
}

const NAME_CHAR_LIST = [0x2D, 0x2E, 0xB7];

/**
 * Determines whether a codepoint matches the ``NAME_CHAR`` production.
 *
 * @param c The code point.
 *
 * @returns ``true`` if the codepoint matches ``NAME_CHAR``.
 */
export function isNameChar(c: number): boolean {
  return isNameStartChar(c) ||
    (c >= 0x30 && c <= 0x39) ||
    NAME_CHAR_LIST.includes(c) ||
    (c >= 0x0300 && c <= 0x036F) ||
    (c >= 0x203F && c <= 0x2040);
}
