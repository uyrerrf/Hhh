package com.wuzen.util

import javax.crypto.Cipher
import javax.crypto.spec.SecretKeySpec
import android.util.Base64

object Encryption {
    private const val KEY = "WuzenSecretKey16"
    fun encrypt(data: String): String {
        val cipher = Cipher.getInstance("AES/ECB/PKCS5Padding")
        cipher.init(Cipher.ENCRYPT_MODE, SecretKeySpec(KEY.toByteArray(), "AES"))
        return Base64.encodeToString(cipher.doFinal(data.toByteArray()), Base64.DEFAULT)
    }
    fun decrypt(data: String): String {
        val cipher = Cipher.getInstance("AES/ECB/PKCS5Padding")
        cipher.init(Cipher.DECRYPT_MODE, SecretKeySpec(KEY.toByteArray(), "AES"))
        return String(cipher.doFinal(Base64.decode(data, Base64.DEFAULT)))
    }
}