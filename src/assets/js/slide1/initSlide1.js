import Chart from './charts/barChartCurrencies';

/**
 */
function initSlide1() {
  window.addEventListener('resize', function() {
    Chart.render();
  });
}

export default initSlide1;
