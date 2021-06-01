import { MongoClient, Collection } from 'mongodb'

export const MongoHelper = {
  client: null as any,
  uri: null as any,

  async connect (uri: string): Promise<void> {
    this.uri = uri
    this.client = await MongoClient.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
  },

  async disconnect (): Promise<void> {
    await this.client.close()
    this.client = null
  },

  async getCollection (name: string): Promise<Collection> {
    if (!this.client?.isConnected()) {
      await this.connect(this.uri)
    }
    return this.client.db().collection(name)
  },

  mapId: (data: any): any => {
    const { _id, ...rest } = data
    return { ...rest, id: _id }
  }
}
