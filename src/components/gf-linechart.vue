<template>
  <svg
    :width="width + margin.left + margin.right"
    :height="height + margin.top + margin.bottom"
    class="gf-linechart"
  >
    <g :transform="`translate(${margin.left}, ${10})`">
      <!-- Axes -->
      <g class="x-axis" :transform="`translate(0, ${height})`"></g>
      <g class="y-axis"></g>

      <!-- Line -->
      <g>
        <path class="gf-line" d=""></path>
        <path class="gf-area"></path>
      </g>

      <!-- Grids -->
      <g>
        <g class="gf-x-grid grid" :transform="`translate(0, ${height})`"></g>
        <g class="gf-y-grid grid"></g>
      </g>
    </g>
  </svg>
</template>

<script>
import * as d3 from "d3";
export default {
  name: "GoogleFinanceLineChart",
  data() {
    return {
      width: 0,
      height: 0,
      margin: {
        left: 20,
        right: 10,
        bottom: 10,
        top: 20
      },
      scales: {
        x: null,
        y: null
      },
      data: []
    };
  },
  props: {
    dataset: {
      type: Array,
      required: true
    },
    options: {
      type: Object
    }
  },
  methods: {
    /**
     * setSize: This method will set the width, height
     * and also the margins of the chart.
     */
    setSize() {
      // Width and Height
      this.width =
        this.options.width || 400 - this.margin.left - this.margin.right;
      this.height =
        this.options.height || 250 - this.margin.top - this.margin.top;
    },
    setScales() {
      this.scales.x = d3
        .scaleTime()
        .domain(d3.extent(this.data, d => d.x))
        .range([0, this.width]);

      this.scales.y = d3
        .scaleLinear()
        .domain(d3.extent(this.data, d => d.y))
        .range([this.height, 0]);
    },
    renderAxes() {
      d3.select(".x-axis")
        .call(d3.axisBottom(this.scales.x).ticks(7))
        .selectAll(".tick line")
        .attr("stroke", "#000")
        .attr("stroke-opacity", "0.1");

      d3.select(".y-axis")
        .call(d3.axisLeft(this.scales.y).ticks(6))
        .selectAll(".tick line")
        .attr("stroke", "#000")
        .attr("stroke-opacity", "0.1");

      // Change text color
      d3.selectAll(".y-axis text").attr("color", "#999");
      d3.selectAll(".x-axis text").attr("color", "#999");

      // Change path color
      d3.selectAll(".y-axis path")
        .attr("stroke", "#000")
        .attr("stroke-opacity", "0");
      d3.selectAll(".x-axis path")
        .attr("stroke", "#999")
        .attr("stroke-opacity", "0.1");
    },
    line() {
      const { x, y } = this.scales;
      return d3
        .line()
        .x(d => x(d.x))
        .y(d => y(d.y));
    },
    area() {
      const { x, y } = this.scales;
      return d3
        .area()
        .x(d => x(d.x))
        .y0(this.height)
        .y1(d => y(d.y));
    },
    renderLine() {
      d3.select(".gf-line")
        .datum(this.data)
        .attr("d", this.line());
    },
    renderArea() {
      d3.select(".gf-area")
        .datum(this.data)
        .attr("class", "gf-area")
        .attr("d", this.area());
    },
    renderYGrid() {
      const yGrid = d3
        .axisLeft(this.scales.y)
        .ticks(5)
        .tickSize(-this.width)
        .tickFormat("");

      d3.select(".gf-y-grid")
        .call(yGrid)
        .selectAll("line")
        .attr("stroke", "#000")
        .attr("stroke-opacity", "0.1")
        .attr("stroke-width", "1px");

      // Hide border paths
      d3.select(".gf-y-grid path").attr("stroke-opacity", "0");
      d3.select(".gf-x-grid path").attr("stroke-opacity", "0");
    },
    init() {
      this.setSize();
      this.setScales();
      this.renderYGrid();
      this.renderAxes();
      this.renderLine();
      // this.renderArea();
    }
  },
  watch: {
    /**
     * Re-render the chart on data change
     */
    dataset(data) {
      this.data = data;
      this.init();
    }
  },
  mounted() {
    this.data = this.dataset;
    this.init();
  }
};
</script>

<style lang="scss" scoped>
// Line
.gf-line {
  stroke: #3cba54;
  stroke-width: 2px;
  fill: none;
}

// .grid {
//   fill: red;
// }

.grid line {
  stroke: blue;
  stroke-opacity: 1;
}

.grid path {
  stroke-width: 1;
}

.gf-area {
  fill: lightsteelblue;
}
</style>
