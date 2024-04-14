package org.launchcode.liftoffgroup1.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.io.IOException;
import io.jsonwebtoken.security.Keys;
import org.springframework.context.annotation.Bean;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.stream.Collectors;

import static org.launchcode.liftoffgroup1.security.SecurityConstants.JWT_EXPIRATION;

@Component
public class JwtTokenGenerator {
//    private String jwtSecret;

//    private final SecretKey secretKey = Jwts.SIG.HS256.key().build();
////    private final SecretKey key = Keys.hmacShaKeyFor(secretKey.getBytes(StandardCharsets.UTF_8));
////    private final String secretKey = "secret";
//    public String generateToken(Authentication authentication){
//
//        String user = authentication.getName();
//        Date date = new Date();
//        Date expireDate = new Date(date.getTime() + JWT_EXPIRATION);
//        String token = Jwts.builder().setSubject(user).
//                setIssuedAt(new Date()).setExpiration(expireDate).
//                signWith(secretKey).compact();
////        signWith(key(), SignatureAlgorithm.HS256).compact();
////       return Jwts.builder().subject(user).issuedAt(new Date()).expiration(expireDate).
////               signWith(secretKey).compact();
//        return token;
//    }
////    private Key key() {
////        return Keys.hmacShaKeyFor(Decoders.BASE64.decode(jwtSecret));
////    }
//
//    public String getUsernameFromJwt(String token){
////        Claims claims = Jwts.parser().setSigningKey(secretKey).build().parseClaimsJwt(token).getBody();
//        Claims claims = Jwts.parser().verifyWith(secretKey).build().parseUnsecuredClaims(token).getPayload();
//        return claims.getSubject();
//    }
//
////    public boolean validateToken(String token){
////        try{
////        //TODO: ERROR HERE
////
//////            Jwts.parser().verifyWith(secretKey).build().parseUnsecuredClaims(token);
//////            Jwts.parser().setSigningKey(secretKey).build().parseClaimsJwt(token);
////            System.out.println("VALIDATED");
////            Jwts.parserBuilder()
////            return true;
////        }catch (Exception e){
////            throw new AuthenticationCredentialsNotFoundException("Jwt was expired or incorrect.");
////        }
////    }
//
//    public boolean validateToken(String authToken) throws IOException {
//        try {
//            Jwts.parser().setSigningKey(secretKey).build().parseClaimsJwt(authToken);
//            return true;
//        } catch (ExpiredJwtException e) {
//            System.out.println("Expired_JWT_TOKEN");
//        } catch (UnsupportedJwtException e) {
//            System.out.println("INVALID_JWT_TOKEN: Unsupported");
//        } catch (MalformedJwtException e) {
//            System.out.println("INVALID_JWT_TOKEN: Malformed");
////        } catch (SignatureException e) {
////            System.out.println("INVALID_JWT_TOKEN: Signature");
//        } catch (IllegalArgumentException e) {
//            System.out.println("Token validation error: IllegalArgumentException {}");
//        }
//        return false;
    private final JwtEncoder encoder;

    public JwtTokenGenerator(JwtEncoder encoder) {
        this.encoder = encoder;
    }



    public String generateToken(Authentication authentication) {
        Instant now = Instant.now();
        String scope = authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(" "));
        JwtClaimsSet claims = JwtClaimsSet.builder()
                .issuer("self")
                .issuedAt(now)
                .expiresAt(now.plus(1, ChronoUnit.HOURS))
                .subject(authentication.getName())
                .claim("scope", scope)
                .build();
        return this.encoder.encode(JwtEncoderParameters.from(claims)).getTokenValue();
    }
}
