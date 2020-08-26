package com.mitrais.util;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

public class Encrypt {

    public static String encryptText(String text) throws NoSuchAlgorithmException {
        MessageDigest md = MessageDigest.getInstance("SHA-256");
        md.update(text.getBytes(StandardCharsets.UTF_8));
        byte[] bytes = md.digest();
        StringBuilder sb = new StringBuilder();
        for (int x = 0; x < bytes.length; x++) {
            sb.append(Integer.toString((bytes[x] & 0xff) + 0x100, 16).substring(1));
        }
        return sb.toString();
    }
}
