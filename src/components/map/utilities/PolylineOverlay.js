import React, { PureComponent } from 'react'
import { CanvasOverlay } from 'react-map-gl'

export default class PolylineOverlay extends PureComponent {
    _redraw ({ width, height, ctx, isDragging, project }) {
        const { points, color, lineWidth = 2, renderWhileDragging = true } = this.props
        ctx.clearRect(0, 0, width, height)
        ctx.globalCompositeOperation = 'destination-over'

        if ((renderWhileDragging || !isDragging) && points) {
            ctx.lineWidth = lineWidth
            ctx.strokeStyle = color
            ctx.beginPath()
            ctx.setLineDash([6,10])
            points.forEach(point => {
                const pixel = project([point[0], point[1]])
                ctx.lineTo(pixel[0], pixel[1])
            })
            ctx.stroke()
        }
    }

    render () {
        return <CanvasOverlay redraw={this._redraw.bind(this)} />
    }
}