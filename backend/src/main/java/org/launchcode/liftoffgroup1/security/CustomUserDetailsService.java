package org.launchcode.liftoffgroup1.security;

import org.launchcode.liftoffgroup1.model.User;
import org.launchcode.liftoffgroup1.model.data.UserRepository;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class CustomUserDetailsService implements UserDetailsService {
    UserRepository userRepository;

    public CustomUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username).orElseThrow(()-> new UsernameNotFoundException("user not found"));
        return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(), roleToAuthority(user.getRole()));
    }

    private Collection<GrantedAuthority> roleToAuthority(String role){
        Collection<GrantedAuthority> list = new ArrayList<>();
        list.add(new SimpleGrantedAuthority(role));
        return list;
    }

}
