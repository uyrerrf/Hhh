package com.wuzen.data

import android.content.Context
import android.content.SharedPreferences

class ConfigManager(context: Context) {
    private val prefs: SharedPreferences = context.getSharedPreferences("wuzen", Context.MODE_PRIVATE)
    fun setEnabled(feature: String, enabled: Boolean) { prefs.edit().putBoolean(feature, enabled).apply() }
    fun isEnabled(feature: String): Boolean = prefs.getBoolean(feature, false)
}