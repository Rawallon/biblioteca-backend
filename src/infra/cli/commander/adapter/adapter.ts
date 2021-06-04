import { Controller } from '../../../../presentation/protocols/controller'
import { HttpRequest } from '../../../../presentation/protocols/http'

export async function adaptRoute (
  controller: Controller,
  body?: any,
  params?: any
): Promise<void> {
  const httpRequest: HttpRequest = {
    body,
    params
  }
  console.log(httpRequest)

  const httpResponse = await controller.handle(httpRequest)
  console.log(httpResponse.body)
}
