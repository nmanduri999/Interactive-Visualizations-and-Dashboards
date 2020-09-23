function DemoInfo(sample) {
  d3.json("samples.json").then(function(data) {
      var metadata = data.metadata;
      var metaArray = metadata.filter(m => m.id == sample);
      var panelData = metaArray[0];
      var washfreq = panelData.wfreq
      // console.log(washfreq);
      var panel = d3.select("#sample-metadata");
      panel.html("");
      Object.entries(panelData).forEach(([key, value]) => {
        panel
        .append("h5")
        .text(`${key}: ${value}`);
      });
    
      var data3 = [
        {
          domain: { x: [0, 1], y: [0, 1] },
          value: washfreq,
          title: { text: "Belly Button Washing Frequency" },
          type: "indicator",
          mode: "gauge+number",
          gauge: {
            axis: { range: [null, 10] },
            steps: [
              { range: [0, 250], color: "lightgray" },
              { range: [250, 400], color: "gray" }
            ],
          }
        }
      ];
      
      var layout3 = {
        width: 600, 
        height: 500, 
        margin: { t: 0, b: 0 } };
      Plotly.newPlot('gauge', data3, layout3);

     
});
}

function Charts(sample) {
  d3.json("samples.json").then(function(data) {
    var sampleData = data.samples;
    var sampleArray = sampleData.filter(m => m.id == sample);
    var sampleValues = sampleArray[0].sample_values.slice(0,10).reverse();
    var sampleId = sampleArray[0].otu_ids.slice(0,10).reverse();
    var sampleLabels = sampleArray[0].otu_labels.slice(0,10).reverse();
    console.log(sampleLabels);
    console.log(sampleValues);
    console.log(sampleId);
    
    var yValues = sampleId.map(d => `OTU: ${d} `);
    var trace1 = [{
    x: sampleValues,
    y: yValues,
    type: 'bar',
    name: sampleLabels,
    hovertemplate: '%{y}<br>' + '<b>Sample_Value:</b> %{x}<br>',
    text: sampleId,
    orientation:'h'
    }];
    
  
    Plotly.newPlot("bar", trace1);

    var trace2 = [{
      x: sampleId,
      y: sampleValues,
      text: sampleLabels,
      mode: 'markers',
      hovertemplate: '<b>OTU_ID:</b>: %{x}<br>' 
                      + '<b>Sample_Value</b>: %{y}<br>'
                      + '<b>OTU_Labels</b>: %{text}<br>',
      marker: {
        size: sampleValues,
        color: sampleId
      }
    }];
    var layout2 = {
      title: `Test Subject ID:${sample}`,
     
    };
    Plotly.newPlot("bubble", trace2, layout2);

  });
}


function initData() {
    d3.json("samples.json").then(function(data) {
      var names = data.names;
      var dropdown = d3.select("#selDataset");
      names.forEach((name) => {
            dropdown
              .append("option")
              .text(name)
              .property("value", name);
          });
  //   console.log(names);
    var firstValue = names[0];
  //   console.log(firstValue);
    DemoInfo(firstValue);
    Charts(firstValue);

  });
}

function optionChanged(Sample) {
  DemoInfo(Sample);
  Charts(Sample);
 }
initData();