import pathToRegexp from "path-to-regexp"
import { goTo, addRoutes, initFirstRoute, onRouteChanged } from "./index.ts"

export const initDomRouter = ({ routes, initialRoute }) => {
  const pathToRoute = path => {
    for (const [name, route] of Object.entries(routes)) {
      const regexp = pathToRegexp(route.meta.path)
      const parsed = pathToRegexp.parse(route.meta.path).slice(1)
      const allTokens = regexp.exec(path)
      if (allTokens) {
        const tokens = allTokens.slice(1)
        const params = parsed.reduce((res, { name }, idx) => {
          res[name] = tokens[idx]
          return res
        }, {})
        return { name, params }
      }
    }
    return null
  }

  const lastRoute = pathToRoute(location.pathname) || initialRoute
  addRoutes(routes)
  initFirstRoute(lastRoute)
  onRouteChanged(newRoute => {
    history[newRoute.pop ? "replaceState" : "pushState"](
      { name: newRoute.name, params: newRoute.params },
      null,
      pathToRegexp.compile(newRoute.routeInfo.meta.path)(newRoute.params)
    )
  })

  window.onpopstate = evt => {
    if (!evt.state) {
      return
    }
    const route = pathToRoute(location.pathname)
    return goTo({ ...route, pop: true })
  }
}
