import { EChartOption } from 'echarts';
import { getPoolList } from '@/tools/tools';
import { poolCoordinate } from '@/config/poolcoordinate';

export const poolList: EChartOption.SeriesScatter = {
    type: 'scatter',
    coordinateSystem: 'geo',
    zlevel: 3,
    symbolSize: 24,
    itemStyle: {
        color: '#9ae5fc'
    },
    data: getPoolList(poolCoordinate),
}
