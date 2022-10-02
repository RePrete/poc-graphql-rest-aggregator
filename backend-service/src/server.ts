import express from 'express';
import bodyParser from 'body-parser'

const main = async () => {
    const app = express();

    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    let images = [
        {
            imageUuid: 'b228cef9-e8b3-4f0d-b1ac-983ad28b9462',
            url: 'https://cdn.pastemagazine.com/www/system/images/photo_albums/silicon-valley-memes/large/unspecified-1.jpg?1384968217'
        },
        {
            imageUuid: '0bed02f0-53b0-432c-9a6c-3c3fdcc4f3ff',
            url: 'https://lesjoiesducode.fr/wp-content/uploads/2020/04/pUk30T7.jpg'
        },
        {
            imageUuid: 'db077d40-fc3a-4cc1-8aaf-83d03e81d67f',
            url: 'https://i.pinimg.com/600x315/78/3f/a5/783fa50427050800de4ebabb826c761b.jpg'
        },
        {
            imageUuid: 'b04ab411-2e35-4492-a5ce-c96691e73d68',
            url: 'https://media.giphy.com/media/Ju7l5y9osyymQ/giphy.gif'
        }
    ];

    app.get('/images', (_req, res) => {
        res.send({
            images
        })
    });

    app.get('/restaurants', (_req, res) => {
        let result = [
            {
                id: 1,
                name: "Cacio e peppe",
                country_code: "IT",
                owner: "1"
            },
            {
                id: 2,
                name: "Carbonarola",
                country_code: "IT",
                owner: "1"
            },
            {
                id: 3,
                name: "Bras",
                country_code: "FR",
                owner: "3"
            },
            {
                id: 4,
                name: "Con Gracia",
                country_code: "ES",
                owner: "3"
            }
        ]

        if (_req.query.id !== undefined) {
            // @ts-ignore
            result = result.filter( restaurant => restaurant.id === parseInt(_req.query.id))
        }
        if (_req.query.country_code !== undefined) {
            // @ts-ignore
            result = result.filter( restaurant => restaurant.country_code === _req.query.country_code)
        }

        res.send({
            result
        });
    })

    app.get('/countries', (_req, res) => {
        let result = [
            {
                name: "Italy",
                country_code: "IT"
            },
            {
                name: "France",
                country_code: "FR"
            },
            {
                name: "Spain",
                country_code: "ES"
            }
        ]

        console.log(_req.query)
        if (_req.query.country_code !== undefined) {
            // @ts-ignore
            let countryCodeQuery: any = _req.query.country_code;
            if (countryCodeQuery.includes("[")) {
                countryCodeQuery = JSON.parse(countryCodeQuery)
            } else {
                countryCodeQuery = [countryCodeQuery]
            }
            result = result.filter( restaurant => countryCodeQuery.includes(restaurant.country_code))
        }

        res.send({
            result
        });
    })
    
    app.get('/owners', (_req, res) => {
        let result = [
            {
                id: "1",
                name: "Giuseppe",
            },
            {
                id: "2",
                name: "Marco",
            },
            {
                id: "3",
                name: "Pippo",
            }
        ]

        if (_req.query.id !== undefined) {
            // @ts-ignore
            let idQuery: any = _req.query.id;
            if (idQuery.includes("[")) {
                idQuery = JSON.parse(idQuery)
            } else {
                idQuery = [idQuery]
            }
            result = result.filter( result => idQuery.includes(result.id))
        }

        res.send({
            result
        });
    })

    app.listen({ port: 3010 }, () => console.info(
        `🚀 Server ready and listening at ==> http://localhost:3010`,
    ));
};

main().catch((error) => {
    console.error('Server failed to start', error);
});
