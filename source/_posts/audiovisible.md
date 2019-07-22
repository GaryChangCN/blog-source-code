---
title: 音频可视化与音频处理
date: 2018-02-03 14:12:25
tags: 
    - 音频
    - javascript
category: javascript
---

## 前言

来自于 Web Audio Api

<!-- more -->

## 音频可视化

话不多说直接上代码。最终显示的图是频谱图。

```javascript
class Index extends React.Component<any, any> {
    ref: HTMLAudioElement
    canvas: HTMLCanvasElement
    ctx: CanvasRenderingContext2D
    uint8Arr: Uint8Array
 
    start () {
        this.ref.play()
        const audioCtx = new AudioContext()
        const audio = document.getElementById('audio') as HTMLMediaElement
        const src = audioCtx.createMediaElementSource(audio)
 
        const gainNode = audioCtx.createGain()
        src.connect(gainNode)
 
        const analyserNode = audioCtx.createAnalyser()
        gainNode.connect(analyserNode)
 
        const processingNode = audioCtx.createScriptProcessor(1024)
        this.uint8Arr = new Uint8Array(analyserNode.frequencyBinCount)
 
        const canvas = document.getElementById('canvas') as HTMLCanvasElement
        const ctx = canvas.getContext('2d')
        this.canvas = canvas
        this.ctx = ctx
        ctx.fillStyle = 'red'
 
        processingNode.onaudioprocess = e => {
            analyserNode.getByteFrequencyData(this.uint8Arr)
            // 以下代码用于 给音频添加白噪音
            // const inputBuf = e.inputBuffer
            // const outputBuf = e.outputBuffer
            // for (let outChannel = 0; outChannel < outputBuf.numberOfChannels; outChannel ++) {
            //     const inputDate = inputBuf.getChannelData(outChannel)
            //     const outputData = outputBuf.getChannelData(outChannel)
 
            //     for (let i = 0; i < inputBuf.length; i ++) {
            //         outputData[i] = inputDate[i]
            //         outputData[i] += ((Math.random() * 2) - 1) * 0.2
            //     }
            // }
        }
 
        processingNode.connect(gainNode)
        gainNode.connect(audioCtx.destination)
    }
 
    draw () {
        const inner = () => {
            const {ctx, canvas, uint8Arr} = this
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            uint8Arr.forEach((item, i) => {
                const height = item
                const x = 2.5 * i
                ctx.fillRect(x, canvas.height - height, 2, height)
            })
            requestAnimationFrame(inner)
        }
        return inner()
    }
 
    handleStart () {
        this.start()
        this.draw()
    }
    render () {
        return (
            <div className="main">
                <div>
                    <button onClick={() => this.handleStart()}>start</button>
                </div>
                <canvas id="canvas" width="2560" height="300"></canvas>
                <audio
                    ref={ref => this.ref = ref}
                    src="http://127.0.0.1:7070/music.mp3"
                    id="audio"
                    crossOrigin="anonymous"
                ></audio>
            </div>
        )
    }
}
```
