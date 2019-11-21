import React from 'react';
import { Button } from 'antd';
import echarts from './components/echart';
import { ECharts, EChartOption } from 'echarts';
import './index.less';
import { poolList } from './components/pool';
import { normalLines } from './components/normallines';
import { p2pLines } from './components/p2plines';
import { getBaseConfig } from '@/config/basechart';
import { transaction } from './step/transaction';
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps, IProps } from './store';
interface IState {
  buttonIndex: number,
  text: string[]
}

class App extends React.Component<IProps, IState> {
  echart: React.RefObject<HTMLDivElement>
  chart: ECharts | undefined
  constructor(props: IProps) {
    super(props);
    this.echart = React.createRef<HTMLDivElement>()

  }
  state: IState = {
    buttonIndex: 0,
    text: []
  }

  componentDidMount = () => {
    if (this.echart.current) {
      this.chart = echarts.init(this.echart.current);
      const baseConfig = getBaseConfig()

      baseConfig.series = [
        poolList,
        normalLines,
      ]
      this.chart.setOption(baseConfig);

    }

  }
  transaction = () => {
    this.setState({
      text: []
    }, () => {
      transaction(this.chart ? this.chart : null, (index) => {
        const text = [...this.state.text]
        switch (index) {
          case 1:
            text.push('一个人在未知的位置发起了一笔交易')
            break;
          case 2:
            text.push('客户端将此交易发送到设定好的中国节点')
            break;
          case 3:
            text.push('中国节点通过p2p通知给自己设定好的节点')
            break;
          case 4:
            text.push('二级节点继续向下通知')
            break;
          case 5:
            text.push('下级节点通知到内存池已有此交易hash的节点时，包含此hash的节点不再继续通知')
            break;
          case 6:

            break;

          default:
            break;
        }
        this.setState({
          text
        })
      })
    })

  }
  render() {
    const { buttonIndex } = this.state
    const textElement = this.state.text.map((item, index) => {
      return (
        <div key={index}>{item}</div>
      )
    })
    return (
      <div className='all flex'>

        <div ref={this.echart} style={{ width: '100%', height: '100%' }} />
        <div className='blockchain flex'>
          <div className='block'>
            n
          </div>
          <div className='line' />
          <div className='block'>
            n+1
          </div>
          <div className='line' />
          <div className='block'>
            n+2
          </div>
          <div className='line' />
          <div className='block'>
            ...
          </div>
          <div className='line' />
          <div className='block'>
            m
          </div>
        </div>
        <div className='text'>
          {textElement}
        </div>
        <div className='memory'>
          {textElement}
        </div>
        <div className='buttonGroup'>
          <div className={`buttons flex ${buttonIndex != 0 ? 'disappear' : ''}`}>
            <Button type='primary' onClick={this.transaction}>发生了正常交易</Button>
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
export default connect(mapStateToProps, mapDispatchToProps)(App);
