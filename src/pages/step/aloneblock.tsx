import { ECharts } from 'echarts'
import { getBaseConfig } from '@/config/basechart'
import { poolList } from '@/pages/components/pool';
import { normalLines } from '@/pages/components/normallines';
import { p2pLines } from '@/pages/components/p2plines';
import {  yellowPoint } from '@/pages/components/unknow';
import { poolCoordinate } from '@/config/poolcoordinate';
import { defaultStep } from './default';
import { p2pRedLines } from '@/pages/components/p2predlines';



const step1 = (eCharts: ECharts, cb: (step: number) => void) => {
    const baseConfig = getBaseConfig();
    // unknow交易
    baseConfig.series = [
        poolList,
        normalLines,
        yellowPoint(poolCoordinate.巴西某矿池)
    ]
    eCharts.setOption(baseConfig)
    cb(1)
}

const step2 = (eCharts: ECharts, cb: (step: number) => void) => {
    const baseConfig = getBaseConfig();
    // 交易发给中国矿池
    baseConfig.series = [
        poolList,
        normalLines,
        yellowPoint(poolCoordinate.中国某矿池),
        yellowPoint(poolCoordinate.巴西某矿池)
    ]
    eCharts.setOption(baseConfig)
    cb(2)
}
const step3 = (eCharts: ECharts, cb: (step: number) => void) => {
    const baseConfig = getBaseConfig();
    // 交易发给中国矿池
    const p2p = p2pLines([
        {
            name: '11',
            coords: [poolCoordinate.中国某矿池, poolCoordinate.俄罗斯某矿池],
        },
        {
            name: '12',
            coords: [poolCoordinate.中国某矿池, poolCoordinate.日本某矿池],
        },
        {
            name: '13',
            coords: [poolCoordinate.中国某矿池, poolCoordinate.印度某矿池],
        },
        {
            name: '14',
            coords: [poolCoordinate.中国某矿池, poolCoordinate.澳大利亚某矿池],
        },
        {
            name: '33',
            coords: [poolCoordinate.中国某矿池, poolCoordinate.英国某矿池],
        }
    ])
    baseConfig.series = [
        poolList,
        normalLines,
        p2p,
        yellowPoint(poolCoordinate.巴西某矿池)
    ]
    eCharts.setOption(baseConfig)
    cb(3)
}
const step4 = (eCharts: ECharts, cb: (step: number) => void) => {
    const baseConfig = getBaseConfig();
    // 交易发给中国矿池
    const p2p = p2pLines([
        {
            name: '21',
            coords: [poolCoordinate.英国某矿池, poolCoordinate.格陵兰岛某矿池],
        },
        {
            name: '22',
            coords: [poolCoordinate.英国某矿池, poolCoordinate.加拿大某矿池],
        },
        {
            name: '23',
            coords: [poolCoordinate.英国某矿池, poolCoordinate.美国某矿池],
        },
        
    ])

    const p2p2 = p2pRedLines([
        {
            name: '24',
            coords: [poolCoordinate.英国某矿池, poolCoordinate.巴西某矿池],
        }
    ])
    baseConfig.series = [
        poolList,
        normalLines,
        p2p,
        p2p2
    ]
    eCharts.setOption(baseConfig)
    cb(4)
}
const step5 = (eCharts: ECharts, cb: (step: number) => void) => {
    const baseConfig = getBaseConfig();
    const p2p = p2pRedLines([
        {
            name: '41',
            coords: [poolCoordinate.巴西某矿池, poolCoordinate.印度某矿池],
        },
        {
            name: '42',
            coords: [poolCoordinate.巴西某矿池, poolCoordinate.澳大利亚某矿池],
        },
    ])
    baseConfig.series = [
        poolList,
        normalLines,
        p2p,
        yellowPoint(poolCoordinate.巴西某矿池)
    ]

    eCharts.setOption(baseConfig)
    cb(5)
}
const step6 = (eCharts: ECharts, cb: (step: number) => void) => {
    const baseConfig = getBaseConfig();
    baseConfig.series = [];
    eCharts.setOption(baseConfig)
    baseConfig.series = defaultStep();
    eCharts.setOption(baseConfig)
    cb(6)
    return
}
const step = [step1, step2, step3, step4, step5, step6];
export const aloneBlock = (eCharts: ECharts| null, cb: (step: number) => void ) => {
    if (eCharts) {
        for (let index = 0; index < step.length; index++) {
            if (index === 0) {
                step[0](eCharts, cb)
            } else {
                setTimeout(() => {
                    step[index](eCharts, cb)
                }, (index) * 6000);
            }
        }
    }

};
