import { colorme } from "../../config/utils";
import { IktButtonConfig } from "../../shared/structure/button/button.component";
import { ktFeedViewModelService } from "./feed-viewmodel.service";

export type IktFeedLayoutType = {
  id: string;
  hostClass: string;
};  

export interface Ikt_FEED_MODE {
  default: IktFeedLayoutType;
  min: IktFeedLayoutType;
  max: IktFeedLayoutType;
};

export const FEED_CONFIG = {
  layouts: {
    min: {
      id: 'min',
      hostClass: '--min',
      iconClass: 'toast'
    },
    default: {
      id: 'default',
      hostClass: '',
      iconClass: 'chips'
    },
    max: {
      id: 'max',
      hostClass: '--max',
      iconClass: 'toolbar'
    }
  },
  provideLayoutActionsFor: (layouts, fn): IktButtonConfig[] =>
    Object.entries(layouts)
      .map(([key, obj]) =>
      ({
          id: key,
          color: '#c1c1c1',
          activeColor: '#4285f4',
          icon: (<any>obj).iconClass,
          styleClass: `--layout-action-${key}`,
          command: () => fn(key),
          ...(key === 'default' && { active: true })
  })),
  provideChartData: ([d, v]: [[], []], vm: ktFeedViewModelService): any => {
    const { Renderer: { CurrencyFormatter: { formatWithOptions } } } = vm;
    const fo = { maximumFractionDigits: 2, notation: 'compact' };
    const clr = v?.map(_ => `#${colorme()}`)
    const stacks = d?.map((dt, i) => ({ 
      name: dt, 
      type: 'bar', 
      stack: 'total', 
      label: { show: false }, 
      data: [{ 
        value: v[i], 
        itemStyle: { 
          color: clr[i] 
        } 
      }] 
    }))
    
    return {
      desktop: {
        xAxis: { data: d },
        yAxis: {
          axisLabel: {
            formatter: (d) => formatWithOptions(d, fo).value
          }
        },
        series: [{
          name: 'Job availability',
          type: 'bar',
          itemStyle: { borderRadius: [50, 50, 0, 0] },
          data: v?.map((val,i) => ({ 
            value: val, 
            itemStyle: { 
              color: clr[i] 
            } 
          }))
        }]
      },
      mobile: {
        yAxis: { data: d?.reverse() },
        xAxis: {
          axisLabel: {
            formatter: (d) => formatWithOptions(d, {...fo, maximumFractionDigits: 0}).value
          }
        },
        series: [{
          name: 'Market Cap',
          type: 'bar',
          itemStyle: { borderRadius: [0, 50, 50, 0] },
          data: v?.map((val,i) => ({
            value: val, 
            itemStyle: { 
              color: clr[i] 
            } 
          }))?.reverse()
        }]
      },
      stack: {
        series: stacks,
        focus: 'series'
      }
    }
  }
}
