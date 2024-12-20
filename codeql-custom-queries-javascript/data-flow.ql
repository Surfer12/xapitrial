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
import semmle.javascript.security.dataflow.TaintedPath::Configuration
import semmle.javascript.security.dataflow.DomBasedXss::Configuration

class DangerousFlowConfig extends TaintTracking::Configuration {
  DangerousFlowConfig() { this = "DangerousFlowConfig" }

  override predicate isSource(DataFlow::Node source) {
    // Sources include URL parameters, DOM inputs, and file system reads
    source instanceof RemoteFlowSource or
    source instanceof DOM::LocationSource or
    source instanceof FileSystemAccess::FileNameSource
  }

  override predicate isSink(DataFlow::Node sink) {
    // Sinks include HTML injection points and command execution
    sink instanceof DOM::Sink or
    sink instanceof CommandExecution::Sink
  }

  override predicate isAdditionalTaintStep(DataFlow::Node pred, DataFlow::Node succ) {
    // Add custom taint steps if needed
    exists(DataFlow::PropRead read |
      read = succ and
      pred = read.getBase() and
      read.getPropertyName() = "data"
    )
  }
}

from DangerousFlowConfig cfg, DataFlow::PathNode source, DataFlow::PathNode sink
where cfg.hasFlowPath(source, sink)
select sink.getNode(), source, sink,
  "Potentially unsafe data flow from " + source.getNode().toString() +
  " to " + sink.getNode().toString()
