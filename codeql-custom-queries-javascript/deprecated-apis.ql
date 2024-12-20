/**
 * @name Deprecated API Usage
 * @description Finds calls to deprecated APIs, methods, and properties
 * @kind problem
 * @problem.severity recommendation
 * @precision high
 * @id javascript/deprecated-api-usage
 * @tags maintainability
 *       external/cwe/cwe-477
 */

import javascript
import semmle.javascript.frameworks.jQuery

query predicate problems(DataFlow::CallNode call, string message) {
  exists(string reason |
    (
      // jQuery deprecated methods
      exists(JQuery::MethodCall m |
        m = call and
        m.getMethodName() in [
          "andSelf", "browser", "live", "die", "load", "unload", "size",
          "error", "success", "complete", "bind", "unbind", "delegate", "undelegate"
        ] and
        reason = "jQuery method"
      )
      or
      // Functions with 'deprecated' in their name
      exists(string name |
        name = call.getCalleeName() and
        name.matches("%deprecated%") and
        reason = "function"
      )
    ) and
    message = "Usage of deprecated " + reason + ": " + call.getCalleeName()
  )
}
