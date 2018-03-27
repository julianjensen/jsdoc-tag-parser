/**
 * Syntax types for generic types.
 * @enum {string}
 */
const GenericTypeSyntax = {
  /**
   * From TypeScript and Closure Library.
   * Example: {@code Array<string>}
   */
  ANGLE_BRACKET: 'ANGLE_BRACKET',

  /**
   * From Legacy Closure Library.
   * Example: {@code Array.<string>}
   */
  ANGLE_BRACKET_WITH_DOT: 'ANGLE_BRACKET_WITH_DOT',

  /**
   * From JSDoc and JSDuck.
   * Example: {@code String[]}
   */
  SQUARE_BRACKET: 'SQUARE_BRACKET',
},


/**
 * Syntax types for union types.
 * @enum {string}
 */
UnionTypeSyntax = {
  /**
   * From Closure Library.
   * Example: {@code Left|Right}
   */
  PIPE: 'PIPE',

  /**
   * From JSDuck.
   * Example: {@code Left/Right}
   */
  SLASH: 'SLASH',
},


VariadicTypeSyntax = {
  /**
   * From Closure Library.
   * Example: {@code ...Type}
   */
  PREFIX_DOTS: 'PREFIX_DOTS',

  /**
   * From JSDuck.
   * Example: {@code Type...}
   */
  SUFFIX_DOTS: 'SUFFIX_DOTS',

  /**
   * From Closure Library.
   * Example: {@code ...}
   */
  ONLY_DOTS: 'ONLY_DOTS',
},


OptionalTypeSyntax = {
  PREFIX_EQUALS_SIGN: 'PREFIX_EQUALS_SIGN',
  SUFFIX_EQUALS_SIGN: 'SUFFIX_EQUALS_SIGN',
},


NullableTypeSyntax = {
  PREFIX_QUESTION_MARK: 'PREFIX_QUESTION_MARK',
  SUFFIX_QUESTION_MARK: 'SUFFIX_QUESTION_MARK',
},


NotNullableTypeSyntax = {
  PREFIX_BANG: 'PREFIX_BANG',
  SUFFIX_BANG: 'SUFFIX_BANG',
};


module.exports = {
  GenericTypeSyntax,
  UnionTypeSyntax,
  VariadicTypeSyntax,
  OptionalTypeSyntax,
  NullableTypeSyntax,
  NotNullableTypeSyntax
};
