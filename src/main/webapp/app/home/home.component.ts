import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AccountService } from 'app/core/auth/account.service';
import { Account } from 'app/core/auth/account.model';
import { EChartsOption } from 'echarts';
import * as echarts from 'echarts';


@Component({
  selector: 'jhi-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  
})
export class HomeComponent implements OnInit, OnDestroy {
  account: Account | null = null;
  // chartOption: EChartsOption = {
  //   xAxis: {
  //     type: 'category',
  //     data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  //   },
  //   yAxis: {
  //     type: 'value',
  //   },
  //   series: [
  //     {
  //       data: [820, 932, 901, 934, 1290, 1330, 1320],
  //       type: 'line',
  //     },
  //   ],
  // };
  
  chartOption:EChartsOption = {
    series: [
      {
          type: 'gauge',
          center: ['50%', '60%'],
          startAngle: 200,
          endAngle: -20,
          min: 0,
          max: 60,
          splitNumber: 12,
          itemStyle: {
              color: '#923EB9'
          },
          progress: {
              show: true,
              width: 10
          },
          pointer: {
              show: false
          },
          axisLine: {
              lineStyle: {
                  width: 10
              }
          },
          axisTick: {
              show: false
          },
          splitLine: {
              show: false
          },
          axisLabel: {
              show: false
          },
          anchor: {
              show: false
          },
          title: {
              show: false
          },
          detail: {
              valueAnimation: true,
              width: '10%',
              lineHeight: 40,
              borderRadius: 8,
              offsetCenter: [0, '-15%'],
              fontSize: 13,
              fontWeight: 'bolder',
              formatter: '{value} °C',
              color: '#923EB9'
          },
          data: [
              {
                  value: 10
              }
          ]
      },
      {
          type: 'gauge',
          center: ['50%', '60%'],
          startAngle: 200,
          endAngle: -20,
          min: 0,
          max: 60,
          itemStyle: {
              color: '#923EB9'
          },
          progress: {
              show: true,
              width: 8
          },
          pointer: {
              show: false
          },
          axisLine: {
              show: false
          },
          axisTick: {
              show: false
          },
          splitLine: {
              show: false
          },
          axisLabel: {
              show: false
          },
          detail: {
              show: false
          },
          data: [
              {
                  value: 10
              }
          ]
      }
  ]
};

chartOption1:EChartsOption = {
    series: [
      {
          type: 'gauge',
          center: ['50%', '60%'],
          startAngle: 200,
          endAngle: -20,
          min: 0,
          max: 60,
          splitNumber: 12,
          itemStyle: {
              color: '#d63384'
          },
          progress: {
              show: true,
              width: 10
          },
          pointer: {
              show: false
          },
          axisLine: {
              lineStyle: {
                  width: 10
              }
          },
          axisTick: {
              show: false
          },
          splitLine: {
              show: false
          },
          axisLabel: {
              show: false
          },
          anchor: {
              show: false
          },
          title: {
              show: false
          },
          detail: {
              valueAnimation: true,
              width: '10%',
              lineHeight: 40,
              borderRadius: 8,
              offsetCenter: [0, '-15%'],
              fontSize: 13,
              fontWeight: 'bolder',
              formatter: '{value} %',
              color: '#d63384'
          },
          data: [
              {
                  value: 10
              }
          ]
      },
      {
          type: 'gauge',
          center: ['50%', '60%'],
          startAngle: 200,
          endAngle: -20,
          min: 0,
          max: 60,
          itemStyle: {
              color: '#d63384'
          },
          progress: {
              show: true,
              width: 8
          },
          pointer: {
              show: false
          },
          axisLine: {
              show: false
          },
          axisTick: {
              show: false
          },
          splitLine: {
              show: false
          },
          axisLabel: {
              show: false
          },
          detail: {
              show: false
          },
          data: [
              {
                  value: 10
              }
          ]
      }
  ]
};
chartOption2:EChartsOption = {
    series: [
      {
          type: 'gauge',
          center: ['50%', '60%'],
          startAngle: 200,
          endAngle: -20,
          min: 0,
          max: 60,
          splitNumber: 12,
          itemStyle: {
              color: '#18BB6B'
          },
          progress: {
              show: true,
              width: 10
          },
          pointer: {
              show: false
          },
          axisLine: {
              lineStyle: {
                  width: 10
              }
          },
          axisTick: {
              show: false
          },
          splitLine: {
              show: false
          },
          axisLabel: {
              show: false
          },
          anchor: {
              show: false
          },
          title: {
              show: false
          },
          detail: {
              valueAnimation: true,
              width: '10%',
              lineHeight: 40,
              borderRadius: 8,
              offsetCenter: [0, '-15%'],
              fontSize: 13,
              fontWeight: 'bolder',
              formatter: '{value} kPa',
              color: '#18BB6B'
          },
          data: [
              {
                  value: 10
              }
          ]
      },
      {
          type: 'gauge',
          center: ['50%', '60%'],
          startAngle: 200,
          endAngle: -20,
          min: 0,
          max: 60,
          itemStyle: {
              color: '#18BB6B'
          },
          progress: {
              show: true,
              width: 8
          },
          pointer: {
              show: false
          },
          axisLine: {
              show: false
          },
          axisTick: {
              show: false
          },
          splitLine: {
              show: false
          },
          axisLabel: {
              show: false
          },
          detail: {
              show: false
          },
          data: [
              {
                  value: 10
              }
          ]
      }
  ]
};
chartOption3:EChartsOption = {
    series: [
      {
          type: 'gauge',
          center: ['50%', '60%'],
          startAngle: 200,
          endAngle: -20,
          min: 0,
          max: 60,
          splitNumber: 12,
          itemStyle: {
              color: '#F73757'
          },
          progress: {
              show: true,
              width: 10
          },
          pointer: {
              show: false
          },
          axisLine: {
              lineStyle: {
                  width: 10
              }
          },
          axisTick: {
              show: false
          },
          splitLine: {
              show: false
          },
          axisLabel: {
              show: false
          },
          anchor: {
              show: false
          },
          title: {
              show: false
          },
          detail: {
              valueAnimation: true,
              width: '10%',
              lineHeight: 40,
              borderRadius: 8,
              offsetCenter: [0, '-15%'],
              fontSize: 13,
              fontWeight: 'bolder',
              formatter: '{value} mm',
              color: '#F73757'
          },
          data: [
              {
                  value: 10
              }
          ]
      },
      {
          type: 'gauge',
          center: ['50%', '60%'],
          startAngle: 200,
          endAngle: -20,
          min: 0,
          max: 60,
          itemStyle: {
              color: '#F73757'
          },
          progress: {
              show: true,
              width: 8
          },
          pointer: {
              show: false
          },
          axisLine: {
              show: false
          },
          axisTick: {
              show: false
          },
          splitLine: {
              show: false
          },
          axisLabel: {
              show: false
          },
          detail: {
              show: false
          },
          data: [
              {
                  value: 10
              }
          ]
      }
  ]
};
chartOption4:EChartsOption = {
    series: [
      {
          type: 'gauge',
          center: ['50%', '60%'],
          startAngle: 200,
          endAngle: -20,
          min: 0,
          max: 60,
          splitNumber: 12,
          itemStyle: {
              color: '#FFAB4D'
          },
          progress: {
              show: true,
              width: 10
          },
          pointer: {
              show: false
          },
          axisLine: {
              lineStyle: {
                  width: 10
              }
          },
          axisTick: {
              show: false
          },
          splitLine: {
              show: false
          },
          axisLabel: {
              show: false
          },
          anchor: {
              show: false
          },
          title: {
              show: false
          },
          detail: {
              valueAnimation: true,
              width: '10%',
              lineHeight: 40,
              borderRadius: 8,
              offsetCenter: [0, '-15%'],
              fontSize: 13,
              fontWeight: 'bolder',
              formatter: '{value} kW',
              color: '#FFAB4D'
          },
          data: [
              {
                  value: 10
              }
          ]
      },
      {
          type: 'gauge',
          center: ['50%', '60%'],
          startAngle: 200,
          endAngle: -20,
          min: 0,
          max: 60,
          itemStyle: {
              color: '#FFAB4D'
          },
          progress: {
              show: true,
              width: 8
          },
          pointer: {
              show: false
          },
          axisLine: {
              show: false
          },
          axisTick: {
              show: false
          },
          splitLine: {
              show: false
          },
          axisLabel: {
              show: false
          },
          detail: {
              show: false
          },
          data: [
              {
                  value: 10
              }
          ]
      }
  ]
};

chartOption5:EChartsOption = {
    series: [
      {
          type: 'gauge',
          center: ['50%', '60%'],
          startAngle: 200,
          endAngle: -20,
          min: 0,
          max: 60,
          splitNumber: 12,
          itemStyle: {
              color: '#32BFFF'
          },
          progress: {
              show: true,
              width: 10
          },
          pointer: {
              show: false
          },
          axisLine: {
              lineStyle: {
                  width: 10
              }
          },
          axisTick: {
              show: false
          },
          splitLine: {
              show: false
          },
          axisLabel: {
              show: false
          },
          anchor: {
              show: false
          },
          title: {
              show: false
          },
          detail: {
              valueAnimation: true,
              width: '10%',
              lineHeight: 40,
              borderRadius: 8,
              offsetCenter: [0, '-15%'],
              fontSize: 13,
              fontWeight: 'bolder',
              formatter: '{value} °C',
              color: '#32BFFF'
          },
          data: [
              {
                  value: 10
              }
          ]
      },
      {
          type: 'gauge',
          center: ['50%', '60%'],
          startAngle: 200,
          endAngle: -20,
          min: 0,
          max: 60,
          itemStyle: {
              color: '#32BFFF'
          },
          progress: {
              show: true,
              width: 8
          },
          pointer: {
              show: false
          },
          axisLine: {
              show: false
          },
          axisTick: {
              show: false
          },
          splitLine: {
              show: false
          },
          axisLabel: {
              show: false
          },
          detail: {
              show: false
          },
          data: [
              {
                  value: 10
              }
          ]
      }
  ]
};

chartOption6:EChartsOption = {
    series: [
      {
          type: 'gauge',
          center: ['50%', '60%'],
          startAngle: 200,
          endAngle: -20,
          min: 0,
          max: 60,
          splitNumber: 12,
          itemStyle: {
              color: '#fd7e14'
          },
          progress: {
              show: true,
              width: 10
          },
          pointer: {
              show: false
          },
          axisLine: {
              lineStyle: {
                  width: 10
              }
          },
          axisTick: {
              show: false
          },
          splitLine: {
              show: false
          },
          axisLabel: {
              show: false
          },
          anchor: {
              show: false
          },
          title: {
              show: false
          },
          detail: {
              valueAnimation: true,
              width: '10%',
              lineHeight: 40,
              borderRadius: 8,
              offsetCenter: [0, '-15%'],
              fontSize: 13,
              fontWeight: 'bolder',
              formatter: '{value}psi',
              color: '#fd7e14'
          },
          data: [
              {
                  value: 10
              }
          ]
      },
      {
          type: 'gauge',
          center: ['50%', '60%'],
          startAngle: 200,
          endAngle: -20,
          min: 0,
          max: 60,
          itemStyle: {
              color: '#fd7e14'
          },
          progress: {
              show: true,
              width: 8
          },
          pointer: {
              show: false
          },
          axisLine: {
              show: false
          },
          axisTick: {
              show: false
          },
          splitLine: {
              show: false
          },
          axisLabel: {
              show: false
          },
          detail: {
              show: false
          },
          data: [
              {
                  value: 10
              }
          ]
      }
  ]
};

chartOption7:EChartsOption = {
    series: [
      {
          type: 'gauge',
          center: ['50%', '60%'],
          startAngle: 200,
          endAngle: -20,
          min: 0,
          max: 60,
          splitNumber: 12,
          itemStyle: {
              color: '#6610f2'
          },
          progress: {
              show: true,
              width: 10
          },
          pointer: {
              show: false
          },
          axisLine: {
              lineStyle: {
                  width: 10
              }
          },
          axisTick: {
              show: false
          },
          splitLine: {
              show: false
          },
          axisLabel: {
              show: false
          },
          anchor: {
              show: false
          },
          title: {
              show: false
          },
          detail: {
              valueAnimation: true,
              width: '10%',
              lineHeight: 40,
              borderRadius: 8,
              offsetCenter: [0, '-15%'],
              fontSize: 13,
              fontWeight: 'bolder',
              formatter: '{value} bar',
              color: '#6610f2'
          },
          data: [
              {
                  value: 10
              }
          ]
      },
      {
          type: 'gauge',
          center: ['50%', '60%'],
          startAngle: 200,
          endAngle: -20,
          min: 0,
          max: 60,
          itemStyle: {
              color: '#6610f2'
          },
          progress: {
              show: true,
              width: 8
          },
          pointer: {
              show: false
          },
          axisLine: {
              show: false
          },
          axisTick: {
              show: false
          },
          splitLine: {
              show: false
          },
          axisLabel: {
              show: false
          },
          detail: {
              show: false
          },
          data: [
              {
                  value: 10
              }
          ]
      }
  ]
};

chartOption8:EChartsOption = {
    series: [
      {
          type: 'gauge',
          center: ['50%', '60%'],
          startAngle: 200,
          endAngle: -20,
          min: 0,
          max: 60,
          splitNumber: 12,
          itemStyle: {
              color: '#dc3545'
          },
          progress: {
              show: true,
              width: 10
          },
          pointer: {
              show: false
          },
          axisLine: {
              lineStyle: {
                  width: 10
              }
          },
          axisTick: {
              show: false
          },
          splitLine: {
              show: false
          },
          axisLabel: {
              show: false
          },
          anchor: {
              show: false
          },
          title: {
              show: false
          },
          detail: {
              valueAnimation: true,
              width: '10%',
              lineHeight: 40,
              borderRadius: 8,
              offsetCenter: [0, '-15%'],
              fontSize: 13,
              fontWeight: 'bolder',
              formatter: '{value} ppm',
              color: '#dc3545'
          },
          data: [
              {
                  value: 10
              }
          ]
      },
      {
          type: 'gauge',
          center: ['50%', '60%'],
          startAngle: 200,
          endAngle: -20,
          min: 0,
          max: 60,
          itemStyle: {
              color: '#dc3545'
          },
          progress: {
              show: true,
              width: 8
          },
          pointer: {
              show: false
          },
          axisLine: {
              show: false
          },
          axisTick: {
              show: false
          },
          splitLine: {
              show: false
          },
          axisLabel: {
              show: false
          },
          detail: {
              show: false
          },
          data: [
              {
                  value: 10
              }
          ]
      }
  ]
};

chartOption9:EChartsOption = {
    series: [
      {
          type: 'gauge',
          center: ['50%', '60%'],
          startAngle: 200,
          endAngle: -20,
          min: 0,
          max: 60,
          splitNumber: 12,
          itemStyle: {
              color: '#ffc107'
          },
          progress: {
              show: true,
              width: 10
          },
          pointer: {
              show: false
          },
          axisLine: {
              lineStyle: {
                  width: 10
              }
          },
          axisTick: {
              show: false
          },
          splitLine: {
              show: false
          },
          axisLabel: {
              show: false
          },
          anchor: {
              show: false
          },
          title: {
              show: false
          },
          detail: {
              valueAnimation: true,
              width: '10%',
              lineHeight: 40,
              borderRadius: 8,
              offsetCenter: [0, '-15%'],
              fontSize: 13,
              fontWeight: 'bolder',
              formatter: '{value} °C',
              color: '#ffc107'
          },
          data: [
              {
                  value: 10
              }
          ]
      },
      {
          type: 'gauge',
          center: ['50%', '60%'],
          startAngle: 200,
          endAngle: -20,
          min: 0,
          max: 60,
          itemStyle: {
              color: '#ffc107'
          },
          progress: {
              show: true,
              width: 8
          },
          pointer: {
              show: false
          },
          axisLine: {
              show: false
          },
          axisTick: {
              show: false
          },
          splitLine: {
              show: false
          },
          axisLabel: {
              show: false
          },
          detail: {
              show: false
          },
          data: [
              {
                  value: 10
              }
          ]
      }
  ]
};
chartOption10:EChartsOption = {
    series: [
      {
          type: 'gauge',
          center: ['50%', '60%'],
          startAngle: 200,
          endAngle: -20,
          min: 0,
          max: 60,
          splitNumber: 12,
          itemStyle: {
              color: '#32BFFF'
          },
          progress: {
              show: true,
              width: 10
          },
          pointer: {
              show: false
          },
          axisLine: {
              lineStyle: {
                  width: 10
              }
          },
          axisTick: {
              show: false
          },
          splitLine: {
              show: false
          },
          axisLabel: {
              show: false
          },
          anchor: {
              show: false
          },
          title: {
              show: false
          },
          detail: {
              valueAnimation: true,
              width: '10%',
              lineHeight: 40,
              borderRadius: 8,
              offsetCenter: [0, '-15%'],
              fontSize: 13,
              fontWeight: 'bolder',
              formatter: '{value}',
              color: '#32BFFF'
          },
          data: [
              {
                  value: 10
              }
          ]
      },
      {
          type: 'gauge',
          center: ['50%', '60%'],
          startAngle: 200,
          endAngle: -20,
          min: 0,
          max: 60,
          itemStyle: {
              color: '#32BFFF'
          },
          progress: {
              show: true,
              width: 8
          },
          pointer: {
              show: false
          },
          axisLine: {
              show: false
          },
          axisTick: {
              show: false
          },
          splitLine: {
              show: false
          },
          axisLabel: {
              show: false
          },
          detail: {
              show: false
          },
          data: [
              {
                  value: 10
              }
          ]
      }
  ]
};
chartOption11:EChartsOption = {
    series: [
      {
          type: 'gauge',
          center: ['50%', '60%'],
          startAngle: 200,
          endAngle: -20,
          min: 0,
          max: 60,
          splitNumber: 12,
          itemStyle: {
              color: '#FFAB4D'
          },
          progress: {
              show: true,
              width: 10
          },
          pointer: {
              show: false
          },
          axisLine: {
              lineStyle: {
                  width: 10
              }
          },
          axisTick: {
              show: false
          },
          splitLine: {
              show: false
          },
          axisLabel: {
              show: false
          },
          anchor: {
              show: false
          },
          title: {
              show: false
          },
          detail: {
              valueAnimation: true,
              width: '10%',
              lineHeight: 40,
              borderRadius: 8,
              offsetCenter: [0, '-15%'],
              fontSize: 13,
              fontWeight: 'bolder',
              formatter: '{value}',
              color: '#FFAB4D'
          },
          data: [
              {
                  value: 10
              }
          ]
      },
      {
          type: 'gauge',
          center: ['50%', '60%'],
          startAngle: 200,
          endAngle: -20,
          min: 0,
          max: 60,
          itemStyle: {
              color: '#FFAB4D'
          },
          progress: {
              show: true,
              width: 8
          },
          pointer: {
              show: false
          },
          axisLine: {
              show: false
          },
          axisTick: {
              show: false
          },
          splitLine: {
              show: false
          },
          axisLabel: {
              show: false
          },
          detail: {
              show: false
          },
          data: [
              {
                  value: 10
              }
          ]
      }
  ]
};
chartOption12:EChartsOption = {
    series: [
      {
          type: 'gauge',
          center: ['50%', '60%'],
          startAngle: 200,
          endAngle: -20,
          min: 0,
          max: 60,
          splitNumber: 12,
          itemStyle: {
              color: '#F73757'
          },
          progress: {
              show: true,
              width: 10
          },
          pointer: {
              show: false
          },
          axisLine: {
              lineStyle: {
                  width: 10
              }
          },
          axisTick: {
              show: false
          },
          splitLine: {
              show: false
          },
          axisLabel: {
              show: false
          },
          anchor: {
              show: false
          },
          title: {
              show: false
          },
          detail: {
              valueAnimation: true,
              width: '10%',
              lineHeight: 40,
              borderRadius: 8,
              offsetCenter: [0, '-15%'],
              fontSize: 13,
              fontWeight: 'bolder',
              formatter: '{value} ppm',
              color: '#F73757'
          },
          data: [
              {
                  value: 10
              }
          ]
      },
      {
          type: 'gauge',
          center: ['50%', '60%'],
          startAngle: 200,
          endAngle: -20,
          min: 0,
          max: 60,
          itemStyle: {
              color: '#F73757'
          },
          progress: {
              show: true,
              width: 8
          },
          pointer: {
              show: false
          },
          axisLine: {
              show: false
          },
          axisTick: {
              show: false
          },
          splitLine: {
              show: false
          },
          axisLabel: {
              show: false
          },
          detail: {
              show: false
          },
          data: [
              {
                  value: 10
              }
          ]
      }
  ]
};
chartOption13:EChartsOption = {
    series: [
      {
          type: 'gauge',
          center: ['50%', '60%'],
          startAngle: 200,
          endAngle: -20,
          min: 0,
          max: 60,
          splitNumber: 12,
          itemStyle: {
              color: '#19B754'
          },
          progress: {
              show: true,
              width: 10
          },
          pointer: {
              show: false
          },
          axisLine: {
              lineStyle: {
                  width: 10
              }
          },
          axisTick: {
              show: false
          },
          splitLine: {
              show: false
          },
          axisLabel: {
              show: false
          },
          anchor: {
              show: false
          },
          title: {
              show: false
          },
          detail: {
              valueAnimation: true,
              width: '10%',
              lineHeight: 40,
              borderRadius: 8,
              offsetCenter: [0, '-15%'],
              fontSize: 13,
              fontWeight: 'bolder',
              formatter: '{value} °C',
              color: '#19B754'
          },
          data: [
              {
                  value: 10
              }
          ]
      },
      {
          type: 'gauge',
          center: ['50%', '60%'],
          startAngle: 200,
          endAngle: -20,
          min: 0,
          max: 60,
          itemStyle: {
              color: '#19B754'
          },
          progress: {
              show: true,
              width: 8
          },
          pointer: {
              show: false
          },
          axisLine: {
              show: false
          },
          axisTick: {
              show: false
          },
          splitLine: {
              show: false
          },
          axisLabel: {
              show: false
          },
          detail: {
              show: false
          },
          data: [
              {
                  value: 10
              }
          ]
      }
  ]
};
chartOption14:EChartsOption = {
    series: [
      {
          type: 'gauge',
          center: ['50%', '60%'],
          startAngle: 200,
          endAngle: -20,
          min: 0,
          max: 60,
          splitNumber: 12,
          itemStyle: {
              color: '#923EB9'
          },
          progress: {
              show: true,
              width: 10
          },
          pointer: {
              show: false
          },
          axisLine: {
              lineStyle: {
                  width: 10
              }
          },
          axisTick: {
              show: false
          },
          splitLine: {
              show: false
          },
          axisLabel: {
              show: false
          },
          anchor: {
              show: false
          },
          title: {
              show: false
          },
          detail: {
              valueAnimation: true,
              width: '10%',
              lineHeight: 40,
              borderRadius: 8,
              offsetCenter: [0, '-15%'],
              fontSize: 13,
              fontWeight: 'bolder',
              formatter: '{value} °C',
              color: '#923EB9'
          },
          data: [
              {
                  value: 10
              }
          ]
      },
      {
          type: 'gauge',
          center: ['50%', '60%'],
          startAngle: 200,
          endAngle: -20,
          min: 0,
          max: 60,
          itemStyle: {
              color: '#923EB9'
          },
          progress: {
              show: true,
              width: 8
          },
          pointer: {
              show: false
          },
          axisLine: {
              show: false
          },
          axisTick: {
              show: false
          },
          splitLine: {
              show: false
          },
          axisLabel: {
              show: false
          },
          detail: {
              show: false
          },
          data: [
              {
                  value: 10
              }
          ]
      }
  ]
};

chartOption15:EChartsOption = {
    series: [
      {
          type: 'gauge',
          center: ['50%', '60%'],
          startAngle: 200,
          endAngle: -20,
          min: 0,
          max: 60,
          splitNumber: 12,
          itemStyle: {
              color: '#dc3545'
          },
          progress: {
              show: true,
              width: 10
          },
          pointer: {
              show: false
          },
          axisLine: {
              lineStyle: {
                  width: 10
              }
          },
          axisTick: {
              show: false
          },
          splitLine: {
              show: false
          },
          axisLabel: {
              show: false
          },
          anchor: {
              show: false
          },
          title: {
              show: false
          },
          detail: {
              valueAnimation: true,
              width: '10%',
              lineHeight: 40,
              borderRadius: 8,
              offsetCenter: [0, '-15%'],
              fontSize: 13,
              fontWeight: 'bolder',
              formatter: '{value} %',
              color: '#dc3545'
          },
          data: [
              {
                  value: 10
              }
          ]
      },
      {
          type: 'gauge',
          center: ['50%', '60%'],
          startAngle: 200,
          endAngle: -20,
          min: 0,
          max: 60,
          itemStyle: {
              color: '#dc3545'
          },
          progress: {
              show: true,
              width: 8
          },
          pointer: {
              show: false
          },
          axisLine: {
              show: false
          },
          axisTick: {
              show: false
          },
          splitLine: {
              show: false
          },
          axisLabel: {
              show: false
          },
          detail: {
              show: false
          },
          data: [
              {
                  value: 10
              }
          ]
      }
  ]
};

chartOption16:EChartsOption = {
    series: [
      {
          type: 'gauge',
          center: ['50%', '60%'],
          startAngle: 200,
          endAngle: -20,
          min: 0,
          max: 60,
          splitNumber: 12,
          itemStyle: {
              color: '#923EB9'
          },
          progress: {
              show: true,
              width: 10
          },
          pointer: {
              show: false
          },
          axisLine: {
              lineStyle: {
                  width: 10
              }
          },
          axisTick: {
              show: false
          },
          splitLine: {
              show: false
          },
          axisLabel: {
              show: false
          },
          anchor: {
              show: false
          },
          title: {
              show: false
          },
          detail: {
              valueAnimation: true,
              width: '10%',
              lineHeight: 40,
              borderRadius: 8,
              offsetCenter: [0, '-15%'],
              fontSize: 13,
              fontWeight: 'bolder',
              formatter: '{value} °C',
              color: '#923EB9'
          },
          data: [
              {
                  value: 10
              }
          ]
      },
      {
          type: 'gauge',
          center: ['50%', '60%'],
          startAngle: 200,
          endAngle: -20,
          min: 0,
          max: 60,
          itemStyle: {
              color: '#923EB9'
          },
          progress: {
              show: true,
              width: 8
          },
          pointer: {
              show: false
          },
          axisLine: {
              show: false
          },
          axisTick: {
              show: false
          },
          splitLine: {
              show: false
          },
          axisLabel: {
              show: false
          },
          detail: {
              show: false
          },
          data: [
              {
                  value: 10
              }
          ]
      }
  ]
};

chartOption17:EChartsOption = {
    series: [
      {
          type: 'gauge',
          center: ['50%', '60%'],
          startAngle: 200,
          endAngle: -20,
          min: 0,
          max: 60,
          splitNumber: 12,
          itemStyle: {
              color: '#18BB6B'
          },
          progress: {
              show: true,
              width: 10
          },
          pointer: {
              show: false
          },
          axisLine: {
              lineStyle: {
                  width: 10
              }
          },
          axisTick: {
              show: false
          },
          splitLine: {
              show: false
          },
          axisLabel: {
              show: false
          },
          anchor: {
              show: false
          },
          title: {
              show: false
          },
          detail: {
              valueAnimation: true,
              width: '10%',
              lineHeight: 40,
              borderRadius: 8,
              offsetCenter: [0, '-15%'],
              fontSize: 13,
              fontWeight: 'bolder',
              formatter: '{value} cms',
              color: '#18BB6B'
          },
          data: [
              {
                  value: 10
              }
          ]
      },
      {
          type: 'gauge',
          center: ['50%', '60%'],
          startAngle: 200,
          endAngle: -20,
          min: 0,
          max: 60,
          itemStyle: {
              color: '#18BB6B'
          },
          progress: {
              show: true,
              width: 8
          },
          pointer: {
              show: false
          },
          axisLine: {
              show: false
          },
          axisTick: {
              show: false
          },
          splitLine: {
              show: false
          },
          axisLabel: {
              show: false
          },
          detail: {
              show: false
          },
          data: [
              {
                  value: 10
              }
          ]
      }
  ]
};

chartOption18:EChartsOption = {
    series: [
      {
          type: 'gauge',
          center: ['50%', '60%'],
          startAngle: 200,
          endAngle: -20,
          min: 0,
          max: 60,
          splitNumber: 12,
          itemStyle: {
              color: '#6610f2'
          },
          progress: {
              show: true,
              width: 10
          },
          pointer: {
              show: false
          },
          axisLine: {
              lineStyle: {
                  width: 10
              }
          },
          axisTick: {
              show: false
          },
          splitLine: {
              show: false
          },
          axisLabel: {
              show: false
          },
          anchor: {
              show: false
          },
          title: {
              show: false
          },
          detail: {
              valueAnimation: true,
              width: '10%',
              lineHeight: 40,
              borderRadius: 8,
              offsetCenter: [0, '-15%'],
              fontSize: 13,
              fontWeight: 'bolder',
              formatter: '{value} cms',
              color: '#6610f2'
          },
          data: [
              {
                  value: 10
              }
          ]
      },
      {
          type: 'gauge',
          center: ['50%', '60%'],
          startAngle: 200,
          endAngle: -20,
          min: 0,
          max: 60,
          itemStyle: {
              color: '#6610f2'
          },
          progress: {
              show: true,
              width: 8
          },
          pointer: {
              show: false
          },
          axisLine: {
              show: false
          },
          axisTick: {
              show: false
          },
          splitLine: {
              show: false
          },
          axisLabel: {
              show: false
          },
          detail: {
              show: false
          },
          data: [
              {
                  value: 10
              }
          ]
      }
  ]
};

linechartOption:EChartsOption = {
    
    
    tooltip: {
        trigger: 'axis',
        
        
    },



    xAxis: {
        type: 'time',
        boundaryGap: false,
        
    },
    yAxis: {
        type: 'value',
        boundaryGap: [0, '100%']
    },

    series: [
        {
            name: 'Air Temperature',
            type: 'line',
            symbol: 'none',
            sampling: 'lttb',

            itemStyle: {
                color: '#923EB9'
            },
            areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                        offset: 0,
                        color: '#923EB9'
                    },
                    {
                        offset: 1,
                        color: '#923EB9'
                    }
                ])
            },
            data: [100,200,300,400]
        }
    ]
};

linechartOption1:EChartsOption = {
    
    
    tooltip: {
        trigger: 'axis',
        
        
    },



    xAxis: {
        type: 'time',
        boundaryGap: false,
        
    },
    yAxis: {
        type: 'value',
        boundaryGap: [0, '100%']
    },

    series: [
        {
            name: 'Air Temperature',
            type: 'line',
            symbol: 'none',
            sampling: 'lttb',

            itemStyle: {
                color: '#d63384'
            },
            areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                        offset: 0,
                        color: '#d63384'
                    },
                    {
                        offset: 1,
                        color: '#d63384'
                    }
                ])
            },
            data: [100,200,300,400]
        }
    ]
};

linechartOption2:EChartsOption = {
    
    
    tooltip: {
        trigger: 'axis',
        
        
    },



    xAxis: {
        type: 'time',
        boundaryGap: false,
        
    },
    yAxis: {
        type: 'value',
        boundaryGap: [0, '100%']
    },

    series: [
        {
            name: 'Air Temperature',
            type: 'line',
            symbol: 'none',
            sampling: 'lttb',

            itemStyle: {
                color: '#18BB6B'
            },
            areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                        offset: 0,
                        color: '#18BB6B'
                    },
                    {
                        offset: 1,
                        color: '#18BB6B'
                    }
                ])
            },
            data: [100,200,300,400]
        }
    ]
};

linechartOption3:EChartsOption = {
    
    
    tooltip: {
        trigger: 'axis',
        
        
    },



    xAxis: {
        type: 'time',
        boundaryGap: false,
        
    },
    yAxis: {
        type: 'value',
        boundaryGap: [0, '100%']
    },

    series: [
        {
            name: 'Air Temperature',
            type: 'line',
            symbol: 'none',
            sampling: 'lttb',

            itemStyle: {
                color: '#F73757'
            },
            areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                        offset: 0,
                        color: '#F73757'
                    },
                    {
                        offset: 1,
                        color: '#F73757'
                    }
                ])
            },
            data: [100,200,300,400]
        }
    ]
};
    
linechartOption4:EChartsOption = {
    
    
    tooltip: {
        trigger: 'axis',
        
        
    },



    xAxis: {
        type: 'time',
        boundaryGap: false,
        
    },
    yAxis: {
        type: 'value',
        boundaryGap: [0, '100%']
    },

    series: [
        {
            name: 'Air Temperature',
            type: 'line',
            symbol: 'none',
            sampling: 'lttb',

            itemStyle: {
                color: '#FFAB4D'
            },
            areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                        offset: 0,
                        color: '#FFAB4D'
                    },
                    {
                        offset: 1,
                        color: '#FFAB4D'
                    }
                ])
            },
            data: [100,200,300,400]
        }
    ]
};

linechartOption5:EChartsOption = {
    
    
    tooltip: {
        trigger: 'axis',
        
        
    },



    xAxis: {
        type: 'time',
        boundaryGap: false,
        
    },
    yAxis: {
        type: 'value',
        boundaryGap: [0, '100%']
    },

    series: [
        {
            name: 'Air Temperature',
            type: 'line',
            symbol: 'none',
            sampling: 'lttb',

            itemStyle: {
                color: '#32BFFF'
            },
            areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                        offset: 0,
                        color: '#32BFFF'
                    },
                    {
                        offset: 1,
                        color: '#32BFFF'
                    }
                ])
            },
            data: [100,200,300,400]
        }
    ]
};

linechartOption6:EChartsOption = {
    
    
    tooltip: {
        trigger: 'axis',
        
        
    },



    xAxis: {
        type: 'time',
        boundaryGap: false,
        
    },
    yAxis: {
        type: 'value',
        boundaryGap: [0, '100%']
    },

    series: [
        {
            name: 'Air Temperature',
            type: 'line',
            symbol: 'none',
            sampling: 'lttb',

            itemStyle: {
                color: '#fd7e14'
            },
            areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                        offset: 0,
                        color: '#fd7e14'
                    },
                    {
                        offset: 1,
                        color: '#fd7e14'
                    }
                ])
            },
            data: [100,200,300,400]
        }
    ]
};

linechartOption7:EChartsOption = {
    
    
    tooltip: {
        trigger: 'axis',
        
        
    },



    xAxis: {
        type: 'time',
        boundaryGap: false,
        
    },
    yAxis: {
        type: 'value',
        boundaryGap: [0, '100%']
    },

    series: [
        {
            name: 'Air Temperature',
            type: 'line',
            symbol: 'none',
            sampling: 'lttb',

            itemStyle: {
                color: '#6610f2'
            },
            areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                        offset: 0,
                        color: '#6610f2'
                    },
                    {
                        offset: 1,
                        color: '#6610f2'
                    }
                ])
            },
            data: [100,200,300,400]
        }
    ]
};

linechartOption8:EChartsOption = {
    
    
    tooltip: {
        trigger: 'axis',
        
        
    },



    xAxis: {
        type: 'time',
        boundaryGap: false,
        
    },
    yAxis: {
        type: 'value',
        boundaryGap: [0, '100%']
    },

    series: [
        {
            name: 'Air Temperature',
            type: 'line',
            symbol: 'none',
            sampling: 'lttb',

            itemStyle: {
                color: '#dc3545'
            },
            areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                        offset: 0,
                        color: '#dc3545'
                    },
                    {
                        offset: 1,
                        color: '#dc3545'
                    }
                ])
            },
            data: [100,200,300,400]
        }
    ]
};

linechartOption9:EChartsOption = {
    
    
    tooltip: {
        trigger: 'axis',
        
        
    },



    xAxis: {
        type: 'time',
        boundaryGap: false,
        
    },
    yAxis: {
        type: 'value',
        boundaryGap: [0, '100%']
    },

    series: [
        {
            name: 'Air Temperature',
            type: 'line',
            symbol: 'none',
            sampling: 'lttb',

            itemStyle: {
                color: '#ffc107'
            },
            areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                        offset: 0,
                        color: '#ffc107'
                    },
                    {
                        offset: 1,
                        color: '#ffc107'
                    }
                ])
            },
            data: [100,200,300,400]
        }
    ]
};

linechartOption10:EChartsOption = {
    
    
    tooltip: {
        trigger: 'axis',
        
        
    },



    xAxis: {
        type: 'time',
        boundaryGap: false,
        
    },
    yAxis: {
        type: 'value',
        boundaryGap: [0, '100%']
    },

    series: [
        {
            name: 'Air Temperature',
            type: 'line',
            symbol: 'none',
            sampling: 'lttb',

            itemStyle: {
                color: '#32BFFF'
            },
            areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                        offset: 0,
                        color: '#32BFFF'
                    },
                    {
                        offset: 1,
                        color: '#32BFFF'
                    }
                ])
            },
            data: [100,200,300,400]
        }
    ]
};

linechartOption11:EChartsOption = {
    
    
    tooltip: {
        trigger: 'axis',
        
        
    },



    xAxis: {
        type: 'time',
        boundaryGap: false,
        
    },
    yAxis: {
        type: 'value',
        boundaryGap: [0, '100%']
    },

    series: [
        {
            name: 'Air Temperature',
            type: 'line',
            symbol: 'none',
            sampling: 'lttb',

            itemStyle: {
                color: '#FFAB4D'
            },
            areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                        offset: 0,
                        color: '#FFAB4D'
                    },
                    {
                        offset: 1,
                        color: '#FFAB4D'
                    }
                ])
            },
            data: [100,200,300,400]
        }
    ]
};

linechartOption12:EChartsOption = {
    
    
    tooltip: {
        trigger: 'axis',
        
        
    },



    xAxis: {
        type: 'time',
        boundaryGap: false,
        
    },
    yAxis: {
        type: 'value',
        boundaryGap: [0, '100%']
    },

    series: [
        {
            name: 'Air Temperature',
            type: 'line',
            symbol: 'none',
            sampling: 'lttb',

            itemStyle: {
                color: '#F73757'
            },
            areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                        offset: 0,
                        color: '#F73757'
                    },
                    {
                        offset: 1,
                        color: '#F73757'
                    }
                ])
            },
            data: [100,200,300,400]
        }
    ]
};

linechartOption13:EChartsOption = {
    
    
    tooltip: {
        trigger: 'axis',
        
        
    },



    xAxis: {
        type: 'time',
        boundaryGap: false,
        
    },
    yAxis: {
        type: 'value',
        boundaryGap: [0, '100%']
    },

    series: [
        {
            name: 'Air Temperature',
            type: 'line',
            symbol: 'none',
            sampling: 'lttb',

            itemStyle: {
                color: '#19B754'
            },
            areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                        offset: 0,
                        color: '#19B754'
                    },
                    {
                        offset: 1,
                        color: '#19B754'
                    }
                ])
            },
            data: [100,200,300,400]
        }
    ]
};

linechartOption14:EChartsOption = {
    
    
    tooltip: {
        trigger: 'axis',
        
        
    },



    xAxis: {
        type: 'time',
        boundaryGap: false,
        
    },
    yAxis: {
        type: 'value',
        boundaryGap: [0, '100%']
    },

    series: [
        {
            name: 'Air Temperature',
            type: 'line',
            symbol: 'none',
            sampling: 'lttb',

            itemStyle: {
                color: '#923EB9'
            },
            areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                        offset: 0,
                        color: '#923EB9'
                    },
                    {
                        offset: 1,
                        color: '#923EB9'
                    }
                ])
            },
            data: [100,200,300,400]
        }
    ]
};

linechartOption15:EChartsOption = {
    
    
    tooltip: {
        trigger: 'axis',
        
        
    },



    xAxis: {
        type: 'time',
        boundaryGap: false,
        
    },
    yAxis: {
        type: 'value',
        boundaryGap: [0, '100%']
    },

    series: [
        {
            name: 'Air Temperature',
            type: 'line',
            symbol: 'none',
            sampling: 'lttb',

            itemStyle: {
                color: '#dc3545'
            },
            areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                        offset: 0,
                        color: '#dc3545'
                    },
                    {
                        offset: 1,
                        color: '#dc3545'
                    }
                ])
            },
            data: [100,200,300,400]
        }
    ]
};

linechartOption16:EChartsOption = {
    
    
    tooltip: {
        trigger: 'axis',
        
        
    },



    xAxis: {
        type: 'time',
        boundaryGap: false,
        
    },
    yAxis: {
        type: 'value',
        boundaryGap: [0, '100%']
    },

    series: [
        {
            name: 'Air Temperature',
            type: 'line',
            symbol: 'none',
            sampling: 'lttb',

            itemStyle: {
                color: '#923EB9'
            },
            areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                        offset: 0,
                        color: '#923EB9'
                    },
                    {
                        offset: 1,
                        color: '#923EB9'
                    }
                ])
            },
            data: [100,200,300,400]
        }
    ]
};

linechartOption17:EChartsOption = {
    
    
    tooltip: {
        trigger: 'axis',
        
        
    },



    xAxis: {
        type: 'time',
        boundaryGap: false,
        
    },
    yAxis: {
        type: 'value',
        boundaryGap: [0, '100%']
    },

    series: [
        {
            name: 'Air Temperature',
            type: 'line',
            symbol: 'none',
            sampling: 'lttb',

            itemStyle: {
                color: '#18BB6B'
            },
            areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                        offset: 0,
                        color: '#18BB6B'
                    },
                    {
                        offset: 1,
                        color: '#18BB6B'
                    }
                ])
            },
            data: [100,200,300,400]
        }
    ]
};

linechartOption18:EChartsOption = {
    
    
    tooltip: {
        trigger: 'axis',
        
        
    },



    xAxis: {
        type: 'time',
        boundaryGap: false,
        
    },
    yAxis: {
        type: 'value',
        boundaryGap: [0, '100%']
    },

    series: [
        {
            name: 'Air Temperature',
            type: 'line',
            symbol: 'none',
            sampling: 'lttb',

            itemStyle: {
                color: '#6610f2'
            },
            areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                        offset: 0,
                        color: '#6610f2'
                    },
                    {
                        offset: 1,
                        color: '#6610f2'
                    }
                ])
            },
            data: [100,200,300,400]
        }
    ]
};




  private readonly destroy$ = new Subject<void>();

  constructor(private accountService: AccountService, private router: Router) {}

  ngOnInit(): void {
    this.accountService
      .getAuthenticationState()
      .pipe(takeUntil(this.destroy$))
      .subscribe(account => (this.account = account));
  }

  login(): void {
    this.router.navigate(['/login']);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
