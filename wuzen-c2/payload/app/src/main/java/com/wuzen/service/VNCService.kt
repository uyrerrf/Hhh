package com.wuzen.service

import android.content.Context
import android.media.projection.MediaProjectionManager

object VNCService {
    fun start(context: Context) {
        val mgr = context.getSystemService(Context.MEDIA_PROJECTION_SERVICE) as MediaProjectionManager
    }
    fun stop() {}
}