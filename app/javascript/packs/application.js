import ReactRailsUJS from "react_ujs"

// // Support component names relative to this directory:
var componentRequireContext = require.context("components", true)
ReactRailsUJS.useContext(componentRequireContext)