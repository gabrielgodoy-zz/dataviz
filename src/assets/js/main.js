import $ from 'jquery';
import 'fullpage.js/dist/jquery.fullpage.extensions.min';
import 'fullpage.js/dist/jquery.fullpage.min.css';
import '../../index.pug';
import '../stylus/main.styl';
import {COLORS} from './constants';
import initSlide1 from './slide1/initSlide1';

init();

/**
 *
 */
function init() {
  startFullPage();
  initSlide1();
}

/**
 *
 */
function startFullPage() {
  $('#fullpage').fullpage({
    anchors: ['firstPage', 'secondPage', 'thirdPage'],
    sectionsColor: [COLORS.asphalt, COLORS.almostWhite],
    menu: '#navigation',
  });
}
