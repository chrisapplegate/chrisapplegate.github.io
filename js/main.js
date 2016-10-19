function setupMap(wrapper) {

    var pi = Math.PI,
    tau = 2 * pi;

    var width = 960,
        height = 480;

    var projection = d3.geoAlbersUsa();

    var path = d3.geoPath()
        .projection(projection);

    var zoom = d3.zoom();

    var svg = d3.select(wrapper).select("svg")
        .attr("width", width)
        .attr("height", height);

    var g = svg.append('g');

    var colors = ['#a6cee3','#1f78b4','#b2df8a','#33a02c','#fb9a99','#e31a1c','#fdbf6f','#ff7f00','#cab2d6','#6a3d9a','#ffff99','#b15928'];

    d3.json('geo/us-states.json', function(error, us) {

        if (error) throw error;

        var units = topojson.feature(us, us.objects.units).features;

        var i = 0;
        var color = function(d, i) { return d3.rgb(colors[i % colors.length]); };

        g.selectAll(".unit")
            .data(units)
            .enter()
            .append("path")
            .attr("id",  function(d) { return "unit-" + d.properties.id.toLowerCase(); })
            .attr("class", function(d) { return "unit unit-" + d.properties.id.substr(0, 1).toLowerCase(); })
            .attr("data-name", function (d) { return ('name' in d.properties) ? d.properties.name : null; })
            .attr("d", path)
            .attr("fill", color)
            .on('click', function (selectedUnit) {
                $('.map-meta span').html(selectedUnit.properties.name);
            });

        var center = projection([-98.5, 39.5]);
        svg
          .call(zoom)
          .call(zoom.transform, d3.zoomIdentity
              .translate(width / 2, height / 2)
              .translate(-center[0], -center[1]));

    });



}

$(function() {
    setupMap($('.map-wrapper').get(0));
});