import { EChartOption } from 'echarts';
import { poolCoordinate } from '@/config/poolcoordinate';
export const normalLines: EChartOption.SeriesLines = {
    type: 'lines',
    zlevel: 10,
    lineStyle: {
        color: '#9ae5fc',
        width: 1,
        curveness: 0.2
    },
    data: [
        {
            name: '11',
            coords: [poolCoordinate.中国某矿池, poolCoordinate.俄罗斯某矿池],
        },
        {
            name: '12',
            coords: [poolCoordinate.中国某矿池,poolCoordinate.日本某矿池],
        },
        {
            name: '13',
            coords: [poolCoordinate.中国某矿池,poolCoordinate.印度某矿池],
        },
        {
            name: '14',
            coords: [poolCoordinate.中国某矿池, poolCoordinate.澳大利亚某矿池],
        },
        {
            name: '21',
            coords: [poolCoordinate.英国某矿池, poolCoordinate.格陵兰岛某矿池],
        },
        {
            name: '22',
            coords: [poolCoordinate.英国某矿池,poolCoordinate.加拿大某矿池],
        },
        {
            name: '23',
            coords: [poolCoordinate.英国某矿池,poolCoordinate.美国某矿池],
        },
        {
            name: '24',
            coords: [poolCoordinate.英国某矿池, poolCoordinate.巴西某矿池],
        },
        {
            name: '31',
            coords: [poolCoordinate.俄罗斯某矿池,poolCoordinate.格陵兰岛某矿池],
        },
        {
            name: '32',
            coords: [poolCoordinate.俄罗斯某矿池, poolCoordinate.加拿大某矿池],
        },
        {
            name: '41',
            coords: [poolCoordinate.巴西某矿池,poolCoordinate.印度某矿池],
        },
        {
            name: '42',
            coords: [poolCoordinate.巴西某矿池, poolCoordinate.澳大利亚某矿池],
        },
        {
            name: '33',
            coords: [poolCoordinate.中国某矿池, poolCoordinate.英国某矿池],
        }
    ]
}
