package com.mitrais.config;

import com.google.common.base.Predicates;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@Configuration
@EnableSwagger2
public class Swagger {

    @Bean
    public Docket accApi() {
        return new Docket(DocumentationType.SWAGGER_2).groupName("Account-v1").select().apis(RequestHandlerSelectors.any()).paths(PathSelectors.any()).paths(Predicates.not(PathSelectors.regex("/error.*"))).build().apiInfo(new ApiInfoBuilder().version("v1").title("Account").description("Account API Documentation").build());
    }
}
