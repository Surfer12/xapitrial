/**
 * @name Potential Memory Leaks
 * @description Detects event listeners and timers that are not properly cleaned up
 * @kind problem
 * @problem.severity warning
 * @precision medium
 * @id javascript/memory-leak
 * @tags reliability
 *       memory
 */

import javascript
import semmle.javascript.DOM
import semmle.javascript.dataflow.DataFlow

from DataFlow::MethodCallNode addListener, DataFlow::FunctionNode callback
where
  // Find addEventListener calls
  addListener.getMethodName() = "addEventListener" and
  callback.flowsTo(addListener.getArgument(1)) and
  // Check if there's no corresponding removeEventListener
  not exists(DataFlow::MethodCallNode removeListener |
    removeListener.getMethodName() = "removeEventListener" and
    removeListener.getArgument(0).getStringValue() = addListener.getArgument(0).getStringValue()
  )
select addListener,
  "Event listener added here might cause a memory leak if not removed properly."
