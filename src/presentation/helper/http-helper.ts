import { HttpResponse } from '../protocols/http'

export const sendError = (statusCode: number, error: Error): HttpResponse => ({
  statusCode,
  body: error
})

export const sendOk = (body: any): HttpResponse => ({
  statusCode: 200,
  body
})
