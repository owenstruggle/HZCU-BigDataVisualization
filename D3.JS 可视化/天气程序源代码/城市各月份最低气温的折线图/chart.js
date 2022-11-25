async function drawLineChart() {
    let rawData = await d3.json("./../nyc_weather_data.json")

    const dateParser = d3.timeParse("%Y-%m-%d")
    const dateParser2 = d3.timeParse("%Y-%m")
    const dateFormat = d3.timeFormat("%Y-%m")

    let dataset = []
    let monthlyMinimumTemperature = 100
    let currentMonth = 0
    for (let i = 0; i < rawData.length; i++) {
        if (dateParser(rawData[i].date).getMonth() !== currentMonth) {
            currentMonth = dateParser(rawData[i].date).getMonth()
            dataset.push({'monthlyMinimumTemperature' : monthlyMinimumTemperature, 'date': dateFormat(dateParser(rawData[i].date))})
            monthlyMinimumTemperature = 100
        }
        if (rawData[i].temperatureMin < monthlyMinimumTemperature) {
            monthlyMinimumTemperature = rawData[i].temperatureMin
        }
    }
    dataset.push({'monthlyMinimumTemperature' : monthlyMinimumTemperature, 'date': dateFormat(dateParser(rawData[rawData.length-1].date))})


    const yAccessor = d => d.monthlyMinimumTemperature
    const xAccessor = d => dateParser2(d.date)

    // 2. Create chart dimensions

    let dimensions = {
        width: window.innerWidth * 0.9,
        height: 400,
        margin: {
            top: 15,
            right: 15,
            bottom: 40,
            left: 60,
        },
    }
    dimensions.boundedWidth = dimensions.width - dimensions.margin.left - dimensions.margin.right
    dimensions.boundedHeight = dimensions.height - dimensions.margin.top - dimensions.margin.bottom

    // 3. Draw canvas

    const wrapper = d3.select("#wrapper")
        .append("svg")
        .attr("width", dimensions.width)
        .attr("height", dimensions.height)

    const bounds = wrapper.append("g")
        .style("transform", `translate(${dimensions.margin.left}px, ${dimensions.margin.top}px)`)

    bounds.append("defs").append("clipPath")
        .attr("id", "bounds-clip-path")
        .append("rect")
        .attr("width", dimensions.boundedWidth)
        .attr("height", dimensions.boundedHeight)

    const clip = bounds.append("g")
        .attr("clip-path", "url(#bounds-clip-path)")

    // 4. Create scales

    const yScale = d3.scaleLinear()
        .domain(d3.extent(dataset, yAccessor))
        .range([dimensions.boundedHeight, 0])

    const xScale = d3.scaleTime()
        .domain(d3.extent(dataset, xAccessor))
        .range([0, dimensions.boundedWidth])

    // 5. Draw data

    const lineGenerator = d3.line()
        .x(d => xScale(xAccessor(d)))
        .y(d => yScale(yAccessor(d)))

    const line = clip.append("path")
        .attr("class", "line")
        .attr("d", lineGenerator(dataset))

    // 6. Draw peripherals

    const yAxisGenerator = d3.axisLeft()
        .scale(yScale)
        .ticks(3)

    const yAxis = bounds.append("g")
        .attr("class", "y-axis")
        .call(yAxisGenerator)

    const yAxisLabel = yAxis.append("text")
        .attr("x", -dimensions.boundedHeight / 2)
        .attr("y", -dimensions.margin.left + 10)
        .attr("class", "y-axis-label")
        .html("Minimum Temperature (&deg;F)")

    const xAxisGenerator = d3.axisBottom()
        .scale(xScale)

    const xAxis = bounds.append("g")
        .attr("class", "x-axis")
        .style("transform", `translateY(${dimensions.boundedHeight}px)`)
        .call(xAxisGenerator)
}

drawLineChart()