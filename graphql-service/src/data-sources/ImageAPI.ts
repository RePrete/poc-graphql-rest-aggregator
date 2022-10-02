import {HTTPDataSource} from 'apollo-datasource-http'

export default class ImageAPI extends HTTPDataSource {
    async getImages() {
        const response = await this.get("/images")
        const body = await response.body;
        // @ts-ignore
        return body.images;
    }
    async getRestaurants(query: any = {}) {
        const response = await this.get(
            "/restaurants",
            {
                query: query
            }
        )
        const body = await response.body;
        // @ts-ignore
        return body;
    }
    async getCountries(query: any = {}) {
        const response = await this.get(
            "/countries",
            {
                query: query
            }
        )
        const body = await response.body;
        // @ts-ignore
        return body;
    }
}