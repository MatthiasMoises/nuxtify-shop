import { joinURL } from 'ufo'

export default defineEventHandler(async (event) => {
  // Get runtimeconfig proxy url
  const proxyUrl = useRuntimeConfig().proxyUrl
  // check the path
  const path = event.path.replace(/^\/api\//, '')  // /api/products -> products

  const target = joinURL(proxyUrl, path)

  // proxy it
  return proxyRequest(event, target)
})