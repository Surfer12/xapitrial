/**
 * @name Hardcoded Credentials
 * @description Detects hardcoded credentials in the code
 * @kind problem
 * @problem.severity warning
 * @security-severity 7.0
 * @precision medium
 * @id javascript/hardcoded-credentials
 * @tags security
 *       external/cwe/cwe-798
 */

import javascript

predicate isSensitiveVariableName(string name) {
  name.toLowerCase().matches([
    "%password%", "%secret%", "%token%", "%key%", "%credential%",
    "%auth%", "%apikey%", "%api_key%"
  ])
}

from Variable var, Expr init
where
  var.getInit() = init and
  (
    isSensitiveVariableName(var.getName()) or
    isSensitiveVariableName(var.getAPropertyName())
  ) and
  (
    init instanceof StringLiteral or
    init instanceof NumberLiteral
  )
select var, "Possible hardcoded credential in variable " + var.getName()
