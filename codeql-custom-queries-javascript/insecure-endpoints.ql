/**
 * @name Insecure API Endpoints
 * @description Finds API endpoints that might have security issues
 * @kind problem
 * @problem.severity warning
 * @security-severity 6.0
 * @precision medium
 * @id javascript/insecure-endpoints
 * @tags security
 *       api
 */

import javascript
import semmle.javascript.frameworks.Express
import semmle.javascript.security.dataflow.RequestForgeryCustomizations

from RouteHandler handler, Parameter param
where
  handler.getAParameter() = param and
  not exists(DataFlow::Node validation |
    validation = param.getAReference() and
    validation instanceof RequestForgeryCustomizations::Sanitizer
  )
select handler,
  "This API endpoint uses parameter '" + param.getName() +
  "' without proper validation, which could lead to security vulnerabilities."
