package com.infosys.carbonfootprint.config;

import java.nio.charset.StandardCharsets;
import java.util.Date;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.infosys.carbonfootprint.entity.User;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtUtil {

    @Value("${jwt.secret}")
    private String jwtSecret;

    @Value("${jwt.expiration}")
    private long jwtExpiration;

    private SecretKey getSigningKey() {
        return Keys.hmacShaKeyFor(
            jwtSecret.getBytes(StandardCharsets.UTF_8)
        );
    }

    public String generateToken(User user) {

        return Jwts.builder()
            .subject(user.getUsername())
            .claim("userId", user.getUserId())
            .claim("role", user.getRole())
            .issuedAt(new Date())
            .expiration(
                new Date(
                    System.currentTimeMillis()
                        + jwtExpiration
                )
            )
            .signWith(getSigningKey())
            .compact();
    }

    public Claims extractClaims(String token) {

        return Jwts.parser()
            .verifyWith(getSigningKey())
            .build()
            .parseSignedClaims(token)
            .getPayload();
    }

    public String extractUsername(String token) {

        return extractClaims(token).getSubject();
    }

    public String extractRole(String token) {

        return extractClaims(token)
            .get("role", String.class);
    }

    public boolean isTokenValid(String token) {

        try {

            Claims claims = extractClaims(token);

            return claims.getExpiration()
                .after(new Date());

        } catch (Exception exception) {

            return false;
        }
    }
}
