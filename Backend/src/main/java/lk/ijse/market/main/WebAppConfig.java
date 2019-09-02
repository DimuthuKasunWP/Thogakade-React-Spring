package lk.ijse.market.main;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.CacheControl;
import org.springframework.web.servlet.config.annotation.DefaultServletHandlerConfigurer;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.concurrent.TimeUnit;

@Configuration
@EnableWebMvc
@ComponentScan("lk.ijse.market")

public class WebAppConfig implements WebMvcConfigurer {
    @Override
    public void configureDefaultServletHandling(DefaultServletHandlerConfigurer configurer) {
        configurer.enable();
    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/images/customer/**").addResourceLocations("/WEB-INF/images/customer/")
                .setCacheControl(CacheControl.maxAge(2, TimeUnit.HOURS).cachePublic());

        registry.addResourceHandler("/images/item/**").addResourceLocations("/WEB-INF/images/item/")
                .setCacheControl(CacheControl.maxAge(2, TimeUnit.HOURS).cachePublic());

    }
}
