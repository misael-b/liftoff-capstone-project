package org.launchcode.liftoffgroup1;

import org.launchcode.liftoffgroup1.security.RsaKeyProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@SpringBootApplication
@EnableConfigurationProperties(RsaKeyProperties.class)
public class LiftoffGroup1Application {

    public static void main(String[] args) {
        SpringApplication.run(LiftoffGroup1Application.class, args);
    }
}
