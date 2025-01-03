import { EChartsCoreOption } from "echarts/core";

export const kt_CHART_OPTIONS: EChartsCoreOption ={
  textStyle: {fontFamily: 'Roboto'},
  legend: {show:false},
  tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
  grid: { left: '3%', right: '4%', bottom: '3%', top: '-3%', containLabel: true },
  yAxis: { type: 'value'},
  xAxis: { type: 'category', axisLabel: { interval: 0, width:50, overflow: 'truncate' }, axisTick: { alignWithLabel: true } },
  series: [],
  animationEasing: 'elasticOut'
};

export const kt_CHART_MOBILE_OPTIONS: EChartsCoreOption = {
  ...kt_CHART_OPTIONS,
  grid: { left: '1%', right: '1%', bottom: '3%', top:'4%', containLabel: true },
  yAxis: { type: 'category', axisLabel: { interval: 0, width:50, overflow: 'truncate' }, axisTick: { alignWithLabel: true } },
  xAxis: { type: 'value'}
};

export const kt_STACK_CHART_OPTIONS: EChartsCoreOption = {
  textStyle: { fontFamily: 'Roboto' },
  legend: {show: false},
  tooltip: {
    trigger: 'axis',
    axisPointer: { type: 'shadow' }
  },
  grid: { top: '-1%', left: '-1%', right: '-1%', bottom: '-1%', containLabel: false},
  yAxis: { type: 'category', label: { show: false }, data:[''] },
  xAxis: { type: 'value'},
  series: [],
  animationEasing: 'elasticOut'
};
  