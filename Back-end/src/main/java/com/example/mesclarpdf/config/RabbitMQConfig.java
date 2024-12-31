package com.example.mesclarpdf.config;

import org.springframework.amqp.core.Queue;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitMQConfig {
    public static final String QUEUE_NAME = "pdfMergeQueue";

    @Bean
    public Queue pdfMergeQueue() {
        return new Queue(QUEUE_NAME, false);
    }
}