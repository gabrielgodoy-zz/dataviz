import * as d3 from 'd3';
import {getCurrencies} from '../../api/api';
import {getCountryIcon} from './flags';

/**
 * @param {Object} windowSize
 */
let Chart = (function() {
  let width;
  let height;
  let margin = {};
  let svg;
  let data;
  let scale = {};
  let axisX;
  let axisY;
  let innerContainer;
  let bars;
  let barRects;
  let barText;

  let breakpoint = 768;

  init();

  /**
   */
  async function init() {
    let {data: response} = await getCurrencies();
    data = objPropsToArray(response.rates);

    svg = d3.select('.section.section-1 .fp-tableCell').append('svg');

    // scales return functions to be inserted in axis
    // scaleBand creates distributed bands for string domains
    scale = {
      x: d3.scaleBand().domain(data.map((d) => d.currency)), // domain is data space
      y: d3.scaleLinear().domain([0, d3.max(data, (d) => d.value)]),
    };

    innerContainer = svg.append('g');
    axisX = innerContainer.append('g').attr('class', 'main-axis main-axis-x');
    axisY = innerContainer.append('g').attr('class', 'main-axis main-axis-y');

    // Bind data
    bars = innerContainer.selectAll('g.bar')
                         .data(data)
                         .enter()
                         .append('g')
                         .classed('bar', true);

    barRects = bars.append('rect');
    barText = bars.append('text')
                  .classed('bar-text', true)
                  .attr('text-anchor', 'middle')
                  .text((d) => d.value.toFixed(2));

    render();
  }

  /**
   *
   */
  function render() {
    updateDimensions(window.innerWidth); // Get dimensions based on window size

    // Updates SVG attributes
    svg.attr('width', width + margin.left + margin.right)
       .attr('height', height + margin.top + margin.bottom);

    innerContainer.attr('transform', `translate(${margin.left}, ${margin.top})`);

    // Pixel space of scales
    scale.x.range([0, width]).padding(0.5);
    scale.y.range([height, 0]); // Creates a crescent range

    if (window.innerWidth < breakpoint) {
      axisY.remove();
      axisY = innerContainer.append('g').attr('class', 'main-axis main-axis-y');
      axisY.call(d3.axisRight(scale.y));
    } else {
      axisY.remove();
      axisY = innerContainer.append('g').attr('class', 'main-axis main-axis-y');
      axisY.call(d3.axisLeft(scale.y));
    }

    axisX.attr('transform', `translate(0, ${height})`)
         .call(d3.axisBottom(scale.x).tickFormat((d, i) => data[i].flag))
         .selectAll('text')
         .append('tspan') // Create tspan to break line on x axis label
         .attr('dy', 13)
         .attr('x', 0.5)
         .text((d, i) => data[i].currency);

    barRects.attr('x', (d) => scale.x(d.currency))
            .attr('y', (d) => scale.y(d.value))
            .attr('height', (d) => height - scale.y(d.value)) // Subtract height for bar, upsidedown
            .attr('width', scale.x.bandwidth()); // Width of each band

    barText.attr('x', (d) => scale.x(d.currency) + (scale.x.bandwidth() / 2))
           .attr('y', (d) => scale.y(d.value) - 8);
  }

  /**
   *
   * @param {Number} winWidth Window width
   */
  function updateDimensions(winWidth) {
    margin.top = 20;
    margin.right = winWidth < breakpoint ? 0 : 50;
    margin.left = winWidth < breakpoint ? 0 : 50;
    margin.bottom = 50;

    width = winWidth - margin.left - margin.right;
    height = winWidth < breakpoint ? .7 * width : 400;
  }

  return {
    render: render,
  };
})();

/**
 *
 * @param {Object} object
 * @return {Array}
 */
function objPropsToArray(object) {
  let array = [];
  for (let prop in object) {
    if (object.hasOwnProperty(prop)) {
      array.push({
        currency: prop,
        flag: getCountryIcon(prop),
        value: object[prop],
      });
    }
  }
  return array;
}

export default Chart;
