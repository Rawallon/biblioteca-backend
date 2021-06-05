import { Controller } from '../../../../presentation/protocols/controller'
import { HttpRequest } from '../../../../presentation/protocols/http'

export async function adaptRoute (
  controller: Controller,
  body?: any,
  params?: any
): Promise<void> {
  return await new Promise(resolve => {
    const httpRequest: HttpRequest = {
      body,
      params
    }
    controller.handle(httpRequest).then(httpResponse => {
      if (httpResponse?.body) {
        console.log(httpResponse.body)
      }
      resolve()
    })
  })
}
