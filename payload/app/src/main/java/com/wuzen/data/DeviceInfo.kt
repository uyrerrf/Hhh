package com.wuzen.data

data class DeviceInfo(
    val model: String,
    val manufacturer: String,
    val osVersion: String,
    val batteryLevel: Int,
    val ipAddress: String,
    val country: String
)