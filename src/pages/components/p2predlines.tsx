import { EChartOption } from 'echarts';
export const p2pRedLines: (data: EChartOption.SeriesLines.DataObject[]) => EChartOption.SeriesLines = (data) => {
    return {
        type: 'lines',
        zlevel: 30,
        effect: {
            show: true,
            period: 3,
            trailLength: 0.7,
            color: '#DC143C',
            symbolSize: 10
        },
        lineStyle: {
            width: 1,
            color: '#DC143C20',
            curveness: 0.2
        },
        data: data,
    }
}
