package com.wuzen.service

import android.content.Context
import android.graphics.ImageFormat
import android.hardware.camera2.*
import android.media.ImageReader
import android.os.Handler
import android.os.Looper
import android.util.Base64

object CameraService {
    private var cameraDevice: CameraDevice? = null
    private var captureSession: CameraCaptureSession? = null
    private var imageReader: ImageReader? = null
    private val handler = Handler(Looper.getMainLooper())

    fun start(context: Context, camera: String) {
        val manager = context.getSystemService(Context.CAMERA_SERVICE) as CameraManager
        val cameraId = if (camera == "front") manager.cameraIdList.getOrNull(1) ?: manager.cameraIdList[0] else manager.cameraIdList[0]
        imageReader = ImageReader.newInstance(640, 480, ImageFormat.JPEG, 2)
        imageReader?.setOnImageAvailableListener({ reader ->
            val image = reader.acquireLatestImage() ?: return@setOnImageAvailableListener
            val buffer = image.planes[0].buffer
            val bytes = ByteArray(buffer.remaining())
            buffer.get(bytes)
            val base64 = Base64.encodeToString(bytes, Base64.DEFAULT)
            WebSocketManager.sendFrame(base64)
            image.close()
        }, handler)
        manager.openCamera(cameraId, object : CameraDevice.StateCallback() {
            override fun onOpened(cd: CameraDevice) {
                cameraDevice = cd
                val surfaces = listOf(imageReader!!.surface)
                cd.createCaptureSession(surfaces, object : CameraCaptureSession.StateCallback() {
                    override fun onConfigured(session: CameraCaptureSession) {
                        captureSession = session
                        val request = cd.createCaptureRequest(CameraDevice.TEMPLATE_PREVIEW).apply {
                            addTarget(imageReader!!.surface)
                        }.build()
                        session.setRepeatingRequest(request, null, handler)
                    }
                    override fun onConfigureFailed(session: CameraCaptureSession) {}
                }, handler)
            }
            override fun onDisconnected(cd: CameraDevice) { stop() }
            override fun onError(cd: CameraDevice, error: Int) { stop() }
        }, handler)
    }

    fun stop() {
        captureSession?.close()
        cameraDevice?.close()
        imageReader?.close()
        captureSession = null
        cameraDevice = null
        imageReader = null
    }

    fun snap(context: Context, camera: String) {
        start(context, camera)
        handler.postDelayed({ stop() }, 3000)
    }
}