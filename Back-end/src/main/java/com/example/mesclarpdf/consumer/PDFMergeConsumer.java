package com.example.mesclarpdf.consumer;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.example.mesclarpdf.config.RabbitMQConfig;
import com.example.mesclarpdf.service.PDFService;

@Component
public class PDFMergeConsumer {

    @Autowired
    private PDFService pdfService;

    @RabbitListener(queues = RabbitMQConfig.QUEUE_NAME)
    public void receiveMessage(String message) {
        // Lógica para processar a mesclagem de PDFs a partir da mensagem recebida
        // A mensagem pode conter informações sobre os arquivos e o nome do arquivo resultante
    }
}