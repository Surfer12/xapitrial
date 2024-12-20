/**
 * @name Unsafe Regular Expressions
 * @description Detects regular expressions that could be vulnerable to catastrophic backtracking
 * @kind problem
 * @problem.severity warning
 * @security-severity 7.0
 * @precision high
 * @id javascript/unsafe-regex
 * @tags security
 *       performance
 */

import javascript
import semmle.javascript.RegExp

from RegExpTerm term
where
  // Find nested quantifiers that could cause catastrophic backtracking
  term.isNested() and
  term.isGreedy() and
  (
    // Look for nested quantifiers
    exists(RegExpQuantifier q1, RegExpQuantifier q2 |
      q1.getParent+() = term and
      q2.getParent+() = term and
      q1 != q2
    )
    or
    // Look for repeated character classes with potential overlap
    exists(RegExpCharacterClass cc1, RegExpCharacterClass cc2 |
      cc1.getParent+() = term and
      cc2.getParent+() = term and
      cc1 != cc2 and
      // Check if they could match the same characters
      exists(string char |
        cc1.getAMatchedString() = char and
        cc2.getAMatchedString() = char
      )
    )
  )
select term,
  "This regular expression may be vulnerable to catastrophic backtracking: " + term.toString()
