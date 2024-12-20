/**
 * @name Function Declarations
 * @description Finds all function declarations in the codebase
 * @kind problem
 * @problem.severity recommendation
 * @id javascript/function-declarations
 */

import javascript

from Function f
where f.getFile().getExtension() = "js"
select f, "Found function: " + f.getName()
