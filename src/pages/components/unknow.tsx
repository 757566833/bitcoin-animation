import { EChartOption } from 'echarts';
import { poolCoordinate, unkonwCorrdinate } from '@/config/poolcoordinate';
export const unknow: EChartOption.SeriesEffectScatter = {
    type: 'effectScatter',
    zlevel: 20,
    coordinateSystem: 'geo',
    rippleEffect: {
        brushType: 'stroke' // 波纹绘制效果
    },
    itemStyle: {
        color: '#FFA200'
    },

    data: [
        unkonwCorrdinate.transaction
    ],
}

export const yellowPoint = (point:[number,number])=>{
    return {
        type: 'effectScatter',
        zlevel: 20,
        coordinateSystem: 'geo',
        rippleEffect: {
            brushType: 'stroke' // 波纹绘制效果
        },
        itemStyle: {
            color: '#FFA200'
        },
    
        data: [
            point
        ],
    }
}
