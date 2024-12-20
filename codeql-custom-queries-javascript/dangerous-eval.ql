/**
 * @name Dangerous eval() Usage
 * @description Finds usage of eval() which can be dangerous due to code injection risks
 * @kind problem
 * @problem.severity error
 * @security-severity 8.0
 * @precision high
 * @id javascript/dangerous-eval
 * @tags security
 *       external/cwe/cwe-95
 */

import javascript

from CallExpr evalCall
where
  evalCall.getCalleeName() = "eval" or
  evalCall.getCalleeName() = "Function" or
  evalCall.getCalleeName() = "setTimeout" or
  evalCall.getCalleeName() = "setInterval"
select evalCall,
  "Potentially dangerous use of " + evalCall.getCalleeName() +
  ". This could lead to code injection vulnerabilities."
