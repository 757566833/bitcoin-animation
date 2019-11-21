import { EChartOption } from 'echarts'
export const getBaseConfig: () => EChartOption = () => {
    return {
        tooltip: {
            show: true
        },
        geo: {
            map: 'world', // 与引用进来的地图js名字一致
            roam: true, // 缩放平移
            zoom:0.8,
            itemStyle: { // 每个区域的样式 
                normal: {
                    areaColor: '#092C51',
                    borderWidth: 1,
                    borderColor: '#092C51',
                    color: '#092C51',
                    label: {
                        show: false
                    }
                },
                emphasis: {
                    areaColor: '#2a333d'
                }
            },
            label: {
                show: false
            },
            silent: true
        },
        series: [

        ], // 将之前处理的数据放到这里
    }
};
