package com.wuzen.service

import android.content.Context
import androidx.core.app.NotificationCompat
import androidx.core.app.NotificationManagerCompat
import org.json.JSONObject

object PushService {
    fun show(context: Context, payload: JSONObject) {
        val builder = NotificationCompat.Builder(context, "wuzen")
            .setSmallIcon(android.R.drawable.ic_dialog_info)
            .setContentTitle(payload.getString("title"))
            .setContentText(payload.getString("body"))
            .setPriority(NotificationCompat.PRIORITY_HIGH)
        NotificationManagerCompat.from(context).notify(System.currentTimeMillis().toInt(), builder.build())
    }
}