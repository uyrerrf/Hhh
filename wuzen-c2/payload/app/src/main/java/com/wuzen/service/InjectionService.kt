package com.wuzen.service

import android.content.Context
import android.content.Intent
import org.json.JSONObject

object InjectionService {
    fun handle(context: Context, payload: JSONObject) {
        val targets = payload.getJSONArray("targets")
        val category = payload.getString("category")
        for (i in 0 until targets.length()) {
            launchTarget(context, targets.getString(i), category)
        }
    }
    private fun launchTarget(context: Context, app: String, category: String) {
        val pkg = when (category) {
            "social" -> "com.$app.android"
            "crypto" -> "com.$app.wallet"
            "finance" -> "com.$app.bank"
            else -> app
        }
        val intent = context.packageManager.getLaunchIntentForPackage(pkg)
        intent?.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
        intent?.let { context.startActivity(it) }
    }
}