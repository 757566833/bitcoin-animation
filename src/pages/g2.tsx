import React from 'react';
import { Button } from 'antd';
import G2 from '@antv/g2';

import './index.less';
import { poolList } from './components/pool';
import { normalLines } from './components/normallines';
import { p2pLines } from './components/p2plines';
import { getBaseConfig } from '@/config/basechart';
import { transaction } from './step/transaction';
import { mapData } from '@/config/world.geo';
import { data } from '@/config/earthquake';
const DataSet = require('@antv/data-set');

export default class App extends React.Component {
  echart: React.RefObject<HTMLDivElement>
  chart: G2.Chart | undefined 
  constructor(props: any) {
    super(props);
    this.echart = React.createRef<HTMLDivElement>()

  }
  state = {
    buttonIndex: 0
  }

  componentDidMount = () => {
    if (this.echart.current) {
      this.chart = new G2.Chart({
        container: this.echart.current,
        width: window.innerWidth,
        height: window.innerHeight,
        padding: [100, 0, 100,0]
      });
      // this.chart.scale({
      //   x: {
      //     sync: true,
      //     nice: false
      //   },
      //   y: {
      //     sync: true,
      //     nice: false
      //   }
      // });
      this.chart.coord('rect').reflect();
      this.chart.legend(false);
      this.chart.axis(false);
      this.chart.tooltip({
        showTitle: false,
        containerTpl: '<div class="g2-tooltip"><table class="g2-tooltip-list"></table></div>',
        itemTpl: '<tr data-index="{index}"><td style="padding:5px;background-color:#545454;">{name}</td><td style="padding:5px;background-color:#fff;color:#000;">{value}</td></tr>',
        'g2-tooltip': {
          borderRadius: '2px',
          backgroundColor: '#DDDDDD',
          padding: 0,
          border: '1px solid #333'
        }
      });
      const ds = new DataSet();
      const dv = ds.createView('back').source(mapData, {
        type: 'GeoJSON'
      }).transform({
        type: 'geo.projection',
        projection: 'geoMercator',
        as: ['x', 'y', 'centroidX', 'centroidY']
      });
      var bgView = this.chart.view();
      bgView.source(dv);
      bgView.tooltip(false);
      bgView.polygon().position('x*y').style({
        fill: '#DDDDDD',
        stroke: '#b1b1b1',
        lineWidth: 0.5,
        fillOpacity: 0.85
      });

      // draw the bubble plot
      var userData = ds.createView().source(data);
      userData.transform({
        type: 'map',
        callback: function callback(obj:any) {
          var projectedCoord = dv.geoProjectPosition([obj.lng * 1, obj.lat * 1], 'geoMercator');
          obj.x = projectedCoord[0];
          obj.y = projectedCoord[1];
          obj.deaths = obj.deaths * 1;
          obj.magnitude = obj.magnitude * 1;
          return obj;
        }
      });
      var pointView =  this.chart.view();
      pointView.source(userData);
      pointView.point().position('x*y').size('deaths', [2, 30]).shape('circle').opacity(0.45).color('#FF2F29').tooltip('date*location*lat*lng*deaths*magnitude');

      this.chart.render();

    }

  }
  render() {
    const { buttonIndex } = this.state
    return (
      <div className='all flex'>
        <div ref={this.echart} style={{ width: '100%', height: '100%' }} />
        <div style={{ background: 'rgba(9,44,81,.6)', position: 'absolute', left: 0, top: 0, bottom: 0, width: 200 }}>
          1
        </div>
        <div className='buttonGroup'>
          <div className={`buttons flex ${buttonIndex != 0 ? 'disappear' : ''}`}>
            <Button type='primary'>发生了正常交易</Button>
            <Button type='primary'>出块</Button>
            <Button type='primary'>双花交易</Button>
            <Button type='primary'>双花出块</Button>
            <Button type='primary'>孤块</Button>
          </div>

          <div className={`buttons flex ${buttonIndex != 1 ? 'disappear' : ''}`}>
            <Button type='primary'>鹅厂交易</Button>
            <Button type='primary'>鹅厂出块</Button>
            <Button type='primary'>猪厂交易</Button>
            <Button type='primary'>猪厂出块</Button>
          </div>
          <div className={`buttons flex ${buttonIndex != 2 ? 'disappear' : ''}`}>
            <Button type='primary'>分叉</Button>
          </div>
        </div>
      </div>)
  }
}
