package com.wuzen.service

import android.content.Context
import android.content.Intent
import android.net.Uri
import org.json.JSONObject

object IntentService {
    fun launch(context: Context, payload: JSONObject) {
        val type = payload.getString("actionType")
        val target = payload.getString("target")
        val intent = when (type) {
            "app" -> context.packageManager.getLaunchIntentForPackage(target)
            "inapp" -> Intent(Intent.ACTION_VIEW, Uri.parse(target))
            "external" -> Intent(Intent.ACTION_VIEW, Uri.parse(target)).apply { addFlags(Intent.FLAG_ACTIVITY_NEW_TASK) }
            else -> null
        }
        intent?.let { context.startActivity(it) }
    }
}