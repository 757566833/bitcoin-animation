import { EChartOption } from 'echarts';
export const p2pLines: (data: EChartOption.SeriesLines.DataObject[]) => EChartOption.SeriesLines = (data) => {
    return {
        type: 'lines',
        zlevel: 10,
        effect: {
            show: true,
            period: 6,
            trailLength: 0.7,
            color: '#a6c84c',
            symbolSize: 10
        },
        lineStyle: {
            width: 1,
            color: '#a6c84c20',
            curveness: 0.2
        },
        data: data,
    }
}
