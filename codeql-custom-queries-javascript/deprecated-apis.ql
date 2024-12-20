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
import semmle.javascript.frameworks.NodeJS
import semmle.javascript.JSDoc

from DataFlow::CallNode call
where
  // jQuery deprecated methods
  exists(JQuery::MethodCall m |
    m = call and
    m.getMethodName() in [
      "andSelf", "browser", "live", "die", "load", "unload", "size",
      "error", "success", "complete", "bind", "unbind", "delegate", "undelegate"
    ]
  )
  or
  // Node.js deprecated APIs
  exists(NodeModule mod |
    call = mod.getAMemberCall(_) and
    exists(JSDoc::Comment comment |
      comment = call.getACallee().getDocumentation() and
      comment.getATag().getTitle() = "deprecated"
    )
  )
  or
  // General deprecated function calls marked with JSDoc
  exists(JSDoc::Comment comment |
    comment = call.getACallee().getDocumentation() and
    comment.getATag().getTitle() = "deprecated"
  )
select call,
  "Usage of deprecated API: " + call.getCalleeName()
