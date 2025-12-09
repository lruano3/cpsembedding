const spec1 = {
  $schema: "https://vega.github.net/schema/vega-lite/v5.json",
  data: {
    url: "embeddings_2d.csv"
  },
  hconcat: [
    {
      title: "Chicago Public School Embedding",
      width: 500,
      height: 400,
      mark: "circle",
      params: [{name: "my_brush",select: {type: "interval"}}],
      encoding: {
        x: {field: "Dimension_1", type: "quantitative"},
        y: {field: "Dimension_2", type: "quantitative"},
        color: {
          condition: {
            param: "my_brush",
            field: "Rating_Status",
            type: "nominal"
          },
          value: "lightgray"
        },
        tooltip: [
          {field: "Short_Name"},
          {field: "Graduation_Rate_School", title: "Grad Rate"},
          {field: "Year", title: "School Year"}
        ]
      }
    },
    {
      vconcat: [
        {
          title: "School Ratings",
          width: 300,
        height: 200,
          transform: [
            {filter: {param: "my_brush"}}
          ],
          mark: "bar",
          encoding: {
            x: {field: "Rating_Status", type: "nominal", axis: {"labelAngle": 0}},
            y: {aggregate: "count", title: "Count"},
            color: {field: "Rating_Status"}
          }
        },
        {
          title: "Graduation Rates",
          width: 300,
          height: 200,
          transform: [
            {filter: {param: "my_brush"}},
            {filter: "datum.Graduation_Rate_School > 0"}
          ],
          mark: "bar",
          encoding: {
            x: {
                field: "Graduation_Rate_School", 
                bin: {maxbins: 20},
                title: "Graduation Rate (%)"
            },
            y: {aggregate: "count", title: "Count"},
            color: {value: "#4c78a8"}
          }
        }
      ]
    }
  ]
};
vegaEmbed("#vis1", spec1);