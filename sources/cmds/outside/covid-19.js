const Commando = require('discord.js-commando')
const axios = require('axios')
const { CanvasRenderService } = require('chartjs-node-canvas')
const { MessageAttachment }  = require('discord.js')

const width = 800
const height = 600

const chartCallback = (ChartJS) => {
    ChartJS.plugins.register({
        beforeDraw: (chartInstance) => {
            const { chart } = chartInstance
            const { ctx } = chart
            ctx.fillStyle = 'white'
            ctx.fillRect(0, 0, chart.width, chart.height)
        }
    })
}

module.exports = class CovidCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'covid-stats',
            group: 'outside',
            memberName: 'covid-stats',
            description: 'Displays stats about COVID-19'
        })
    }

    run = async (message, args) => {
        const days = parseInt(args) || 30

        const url = 'https://api.covidtracking.com/v1/us/daily.json'
        let { data: results } = await axios.get(url)
        results = results.slice(0, days).reverse()

        const labels = []
        const deaths = []
        const cases = []
        const recovered = []

        for (const result of results) {
            let date = String(result.date)
            const year = date.substring(0, 4)
            const month = date.substring(4, 6)
            const day = date.substring(6, 8)
            labels.push(`${day}/${month}/${year}`)

            deaths.push(result.death)
            cases.push(result.positive)
            recovered.push(result.recovered)
        }

        const canvas = new CanvasRenderService(width, height, chartCallback)

        const configuration = {
            type: 'line',
            data: {
                labels,
                datasets: [
                    {
                        label: 'Cases',
                        data: cases,
                        color: '#C9FF00',
                        backgroundColor: '#C9FF00',
                        borderColor: '#C9FF00',
                        fill: false,
                    },
                    {
                        label: 'Deaths',
                        data: cases,
                        color: '#FF0000',
                        backgroundColor: '#FF0000',
                        borderColor: '#FF0000',
                        fill: false,
                    },
                    {
                        label: 'Recovered',
                        data: cases,
                        color: '#592EC2',
                        backgroundColor: '#592EC2',
                        borderColor: '#592EC2',
                        fill: false,
                    },
                ],
            },
        }

        const image = await canvas.renderToBuffer(configuration)

        const attachment = new MessageAttachment(image)

        message.channel.send(`Here is the COVID-19 chart in the last ${days} days:`, attachment)
    }
}