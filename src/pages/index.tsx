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
import { alertblock } from './step/alertblock';
import { doubleSpending } from './step/doublespending';
import { doubleSpendingBlock } from './step/doublespendingblock';
import { aloneBlock } from './step/aloneblock';
interface IState {
  buttonIndex: number,
  text: string[],
  memory: (string[] | string)[],
  newBlock: boolean
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
    text: [],
    memory: [],
    newBlock: false
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
      text: [],
      memory: []
    }, () => {
      transaction(this.chart ? this.chart : null, (index) => {
        const text = [...this.state.text]
        let memory: string[] = [...this.state.memory] as string[]
        switch (index) {
          case 1:
            text.push('一个人在未知的位置发起了一笔交易')
            break;
          case 2:
            text.push('客户端将此交易发送到设定好的中国节点,中国节点验证无误后放入自己的内存池')
            memory.push('某节点发出的交易hash:aaaaaaaaaaa')
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
          text,
          memory
        })
      })
    })

  }
  alertBlock = () => {
    this.setState({
      text: [],
      memory: []
    }, () => {
      alertblock(this.chart ? this.chart : null, (index) => {
        const text = [...this.state.text]
        let memory = [...this.state.memory] as string[]
        switch (index) {
          case 1:
            text.push('假设当前内存池已经有了一部分数据')
            memory.push('交易hash:aaaaaaaaaa')
            memory.push('交易hash:bbbbbbbbbb')
            memory.push('...')
            break;
          case 2:
            text.push('这时候中国某矿池出了块')
            break;
          case 3:
            text.push('中国某节点，把自己内存池的交易打包，自己内存池的nonce放到head头中，组成hash，发送到矿池配置好的节点')
            memory = []
            break;
          case 4:
            text.push('二级节点验证无误后，替换算法中的hash，重新计算，继续向下通知')
            break;
          case 5:
            text.push('下级节点通知到已有此块hash信息的节点时，包含此hash的节点不再继续通知')
            break;
          case 6:

            break;

          default:
            break;
        }
        this.setState({
          text,
          memory
        })
        if (index === 3) {
          this.setState({
            newBlock: true
          })
        }
        if (index === 6) {
          this.setState({
            newBlock: false
          })
        }
      })
    })

  }
  doubleSpending = () => {
    this.setState({
      text: [],
      memory: []
    }, () => {
      doubleSpending(this.chart ? this.chart : null, (index) => {
        const text = [...this.state.text]
        let memory = [...this.state.memory] as string[][]
        switch (index) {
          case 1:
            text.push('一个人在未知的位置发起了一笔交易')
            break;
          case 2:
            text.push('客户端同一个utxo，发出两笔不同交易，分别发给中国某矿池和英国某矿池')
            memory.push(['中国某矿池：节点发出的交易hash:aaaaaaaaaaa', '英国某矿池：节点发出的交易hash:bbbbbbbbbbb'])
            break;
          case 3:
            text.push('中国节点通过p2p通知给自己设定好的节点，英国也是如此')
            break;
          case 4:
            text.push('中国通知英国，此交易有效，但是英国在自己的矿池中找不到此utxo，宣布无效')
            break;
          case 5:
            text.push('其他节点同理')
            break;
          case 6:

            break;

          default:
            break;
        }
        this.setState({
          text,
          memory
        })
      })
    })
  }
  doublespendingblock = () => {

    this.setState({
      text: [],
      memory: []
    }, () => {
      doubleSpendingBlock(this.chart ? this.chart : null, (index) => {
        const text = [...this.state.text]
        let memory = [...this.state.memory] as string[][]
        switch (index) {
          case 1:
            text.push('假设当前内存池已经有了一部分数据')
            memory.push(['中国某矿池：节点发出的交易hash:aaaaaaaaaaa', '英国某矿池：节点发出的交易hash:bbbbbbbbbbb'])
            break;
          case 2:
            text.push('假设中国某矿池出了块')
            memory = [['', '英国某矿池：节点发出的交易hash:bbbbbbbbbbb']]
            break;
          case 3:
            text.push('中国通知配置内的所有节点')
            break;
          case 4:
            text.push('英国接受，检测到最长链，根据最长链开始计算，此时清空内存池')
            break;
          case 5:
            text.push('不赘述')
            break;
          case 6:
            text.push('最终的结果是中国某矿池内的utxo上链，并被所有人同步到入库，英国某矿池的内存池数据被舍弃')
            break;

          default:
            break;
        }
        this.setState({
          text,
          memory
        })
        if (index === 3) {
          this.setState({
            newBlock: true
          })
        }
        if (index === 6) {
          this.setState({
            newBlock: false
          })
        }
      })
    })
  }
  aloneBlock = () => {
    this.setState({
      text: [],
      memory: []
    }, () => {
      aloneBlock(this.chart ? this.chart : null, (index) => {
        const text = [...this.state.text]
        let memory = [...this.state.memory] as string[]
        switch (index) {
          case 1:
            text.push('假设巴西某矿池先出了一个块，但是由于种种原因没通知到其他矿池')
            break;
          case 2:
            text.push('这时候中国某矿池出了块')
            break;
          case 3:
            text.push('中国某节点，把自己内存池的交易打包，自己内存池的nonce放到head头中，组成hash，发送到矿池配置好的节点')
            memory = []
            break;
          case 4:
            text.push('二级节点验证无误后，替换算法中的hash，重新计算，继续向下通知，以后的节点掠过')
            break;
          case 5:
            text.push('这时候巴西某矿池想通知其他节点，已经晚了')
            break;
          case 6:

            break;

          default:
            break;
        }
        this.setState({
          text,
          memory
        })
        if (index === 3) {
          this.setState({
            newBlock: true
          })
        }
        if (index === 6) {
          this.setState({
            newBlock: false
          })
        }
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
    const aaa = (arr: string[]) => {
      return arr.map((t) => {
        // tslint:disable-next-line: jsx-wrap-multiline
        return <>
          <div>{t}</div>
          <div style={{ width: 1, height: '100%', backgroundColor: 'red' }} />
        </>
      })
    }
    const memoryElement = this.state.memory.map((item, index) => {
      if (typeof item === 'string') {
        return <div key={index}>{item}</div>
      }
      return (
        <div key={index} className='flex'>
          {aaa(item)}
        </div>
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
          <div className={this.state.newBlock ? 'line' : 'disappear'} />
          <div className={this.state.newBlock ? 'block' : 'disappear'} >
            m+1
          </div>
        </div>
        <div className='text'>
          {textElement}
        </div>
        <div className='memory'>
          {memoryElement}
        </div>
        <div className='buttonGroup'>
          <div className={`buttons flex ${buttonIndex !== 0 ? 'disappear' : ''}`}>
            <Button type='primary' onClick={this.transaction}>发生了正常交易</Button>
            <Button type='primary' onClick={this.alertBlock}>出块</Button>
            <Button type='primary' onClick={this.doubleSpending}>双花交易</Button>
            <Button type='primary' onClick={this.doublespendingblock}>双花出块</Button>
            <Button type='primary' onClick={this.aloneBlock}>孤块</Button>
          </div>

          <div className={`buttons flex ${buttonIndex !== 1 ? 'disappear' : ''}`}>
            <Button type='primary'>鹅厂出块</Button>
            <Button type='primary'>猪厂出块</Button>
          </div>
          <div className={`buttons flex ${buttonIndex !== 2 ? 'disappear' : ''}`}>
            <Button type='primary'>分叉</Button>
          </div>
        </div>
      </div>)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
