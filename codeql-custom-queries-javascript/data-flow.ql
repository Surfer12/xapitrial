/**
 * @name Dangerous Data Flow
 * @description Detects potentially dangerous data flow from untrusted sources to sensitive sinks
 * @kind path-problem
 * @problem.severity error
 * @security-severity 8.0
 * @precision high
 * @id javascript/dangerous-data-flow
 * @tags security
 *       external/cwe/cwe-079
 */

import javascript
import DataFlow::PathGraph

class DangerousFlowConfig extends DataFlow::Configuration {
  DangerousFlowConfig() { this = "DangerousFlowConfig" }

  override predicate isSource(DataFlow::Node source) {
    exists(DataFlow::Node node |
      // Sources: URL parameters, DOM inputs
      node = source and
      (
        node.(DataFlow::ParameterNode).getName().matches("%url%") or
        node.(DataFlow::PropRead).getPropertyName().matches("%location%") or
        node.(DataFlow::PropRead).getPropertyName().matches("%href%")
      )
    )
  }

  override predicate isSink(DataFlow::Node sink) {
    exists(DataFlow::Node node |
      // Sinks: innerHTML, eval, etc.
      node = sink and
      (
        exists(DataFlow::PropWrite pw |
          pw = node and
          pw.getPropertyName() = "innerHTML"
        )
        or
        exists(DataFlow::CallNode call |
          call = node and
          call.getCalleeName() = "eval"
        )
      )
    )
  }
}

query predicate problems(
  DataFlow::PathNode source, DataFlow::PathNode sink,
  string message
) {
  exists(DangerousFlowConfig cfg |
    cfg.hasFlowPath(source, sink) and
    message =
      "Potentially unsafe data flow from " + source.toString() + " to " +
      sink.toString()
  )
}
