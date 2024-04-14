//package org.launchcode.liftoffgroup1.security;
//
//import jakarta.servlet.FilterChain;
//import jakarta.servlet.ServletException;
//import jakarta.servlet.http.HttpServletRequest;
//import jakarta.servlet.http.HttpServletResponse;
//import org.hibernate.annotations.Filter;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
//import org.springframework.security.core.Authentication;
//import org.springframework.security.core.context.SecurityContextHolder;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
//import org.springframework.web.filter.OncePerRequestFilter;
//import org.springframework.util.StringUtils;
//
//
//import java.io.IOException;
//
//public class JwtAuthenticationFilter extends OncePerRequestFilter {
//    @Autowired
//    private JwtTokenGenerator jwtTokenGenerator;
//
//    @Autowired
//    private CustomUserDetailsService customUserDetailsService;
//
//    @Override
//    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
//                                    FilterChain filterChain) throws ServletException, IOException {
//        final String authHeader = request.getHeader("Authorization");
//        System.out.println("HEADER is " + authHeader);
//        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
//            filterChain.doFilter(request, response);
//            return;
//        }
//        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//        String token = getJWTFromRequest(request);
//        if(StringUtils.hasText(token) && jwtTokenGenerator.validateToken(token)){
//            String username = jwtTokenGenerator.getUsernameFromJwt(token);
//            UserDetails userDetails = customUserDetailsService.loadUserByUsername(username);
//
//            UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(userDetails,
//                    null, userDetails.getAuthorities());
//            authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
//            SecurityContextHolder.getContext().setAuthentication(authenticationToken);
//        }
//        filterChain.doFilter(request,response);
//
//    }
//
//    private String getJWTFromRequest(HttpServletRequest request){
//        String tokenHeader = request.getHeader("Authorization");
//        if(StringUtils.hasText(tokenHeader) && tokenHeader.startsWith("Bearer ")){
//            return tokenHeader.substring(7);
//        }
//        return null;
//
//    }
//}
