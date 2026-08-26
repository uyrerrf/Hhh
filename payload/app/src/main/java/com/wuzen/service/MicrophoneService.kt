package com.wuzen.service

import android.content.Context
import android.media.MediaRecorder
import java.io.File

object MicrophoneService {
    private var recorder: MediaRecorder? = null
    fun start(context: Context) {
        val file = File(context.cacheDir, "rec_${System.currentTimeMillis()}.aac")
        recorder = MediaRecorder().apply {
            setAudioSource(MediaRecorder.AudioSource.MIC)
            setOutputFormat(MediaRecorder.OutputFormat.AAC_ADTS)
            setAudioEncoder(MediaRecorder.AudioEncoder.AAC)
            setOutputFile(file.absolutePath)
            prepare()
            start()
        }
    }
    fun stop() {
        recorder?.apply { stop(); release() }
        recorder = null
    }
}