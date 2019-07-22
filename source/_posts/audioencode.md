---
title: 音频编码与容器关系
date: 2018-02-03 14:15:49
tags:
    - 音频
category: 杂
---

## 关系图

![关系图](/images/audioencode.png)

<!-- more -->
## MEPG-1 or  MPEG-2 Audio Layer III

有损压缩
mepg 组织
即 MP3 编码格式

#### 扩展名 
* .mp3

#### Layer 3:
224 - 320 kbit/s优秀，192 - 224 kbit/s很好，128 - 192 kbit/s好

#### mime
* audio/mepg  audio/MPA  audio/mpa-robust
 

## AAC
有损压缩
Fraunhofer IIS、杜比实验室、AT&T、Sony、Nokia
### 扩展名
* .aac  使用 MPEG-2 Audio Transport Stream 作为容器
*.mp4/.3gp 使用了MPEG-4 Part 14 的简化版即3GPP Media Release 6 Basic 进行封装的AAC编码
*.m4a 为了区别纯音频MP4文件和包含视频的MP4文件而由苹果使用的扩展名
### mime
* audio/aac, audio/aacp, audio/3gpp, audio/3gpp2, audio/mp4, audio/MP4A-LATM, audio/mpeg4-generic


## Vorbis
有损压缩
Xiph.Org基金会
### 扩展名
* .ogg/.oga  ogg只留给Vorbis格式来使用 也就是将Vorbis编码的音效包含在Ogg的容器中所成的格式, 只包含音效所用的.oga
* .mka  Matroska(一种多媒体封装格式)
* .webm  由 Google 资助的项目, 支持 Vorbis、Opus音频编解码器，使用的封装格式则以 Matroska 格式为基础。
### mime
* audio/ogg, audio/vorbis, audio/vorbis-config


## Speex
有损压缩
Xiph.Org基金会
已被废弃，建议使用 Opus 取代


## Opus
有损压缩
Xiph.Org基金会
### 扩展名
* .opus
* .ogg
* .webm
* .mka
mime
audio/ogg, audio/opus


## WAV
不压缩
微软、IBM
### 扩展名
* .wav
mime
audio/wav  audio/wave  audio/x-wav
 

## AIFF
不压缩
苹果
### 扩展名
* .aiff
* .aif
* aifc
mime
audio/x-aiff  audio/aif
 

## FLAC
无损压缩
Xiph.Org基金会
### 扩展名
* .flac
* .ogg
mime
audio/x-flac, audio/ogg


## ALAC
无损压缩
Apple
### 扩展名
* .m4a

## Monkey's Audio
无损压缩
Matthew T. Ashland
### 扩展名
* .ape