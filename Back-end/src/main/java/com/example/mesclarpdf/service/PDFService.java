package com.example.mesclarpdf.service;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

import org.apache.pdfbox.multipdf.PDFMergerUtility;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.mesclarpdf.dto.PDFDTO;
import com.example.mesclarpdf.model.PDFEntity;
import com.example.mesclarpdf.repository.PDFRepository;

@Service
public class PDFService {

    @Autowired
    private PDFRepository pdfRepository;

    private final String UPLOAD_DIR = "uploads/";

    // Método para mesclar PDFs
    public PDFDTO mergePDFs(MultipartFile[] files, String name) {
        PDFMergerUtility merger = new PDFMergerUtility();
        String outputFilePath = UPLOAD_DIR + name + ".pdf";

        try {
            // Adiciona os arquivos PDF ao utilitário de mesclagem
            for (MultipartFile file : files) {
                File tempFile = File.createTempFile("temp", file.getOriginalFilename());
                file.transferTo(tempFile);
                merger.addSource(tempFile);
            }

            // Mescla os PDFs e salva o arquivo resultante
            merger.setDestinationFileName(outputFilePath);
            merger.mergeDocuments(null);

            // Cria e salva a entidade no banco de dados
            PDFEntity pdfEntity = new PDFEntity();
            pdfEntity.setName(name);
            pdfEntity.setLink(outputFilePath);
            pdfRepository.save(pdfEntity);

            // Converte a entidade para DTO e retorna
            PDFDTO pdfDTO = new PDFDTO();
            pdfDTO.setId(pdfEntity.getId());
            pdfDTO.setName(pdfEntity.getName());
            pdfDTO.setLink(pdfEntity.getLink());
            pdfDTO.setCreatedAt(pdfEntity.getCreatedAt());
            return pdfDTO;

        } catch (IOException e) {
            e.printStackTrace();
            throw new RuntimeException("Erro ao mesclar PDFs");
        }
    }

    // Método para obter o histórico de mesclagens
    public List<PDFDTO> getMergeHistory() {
        return pdfRepository.findAll().stream().map(pdfEntity -> {
            PDFDTO pdfDTO = new PDFDTO();
            pdfDTO.setId(pdfEntity.getId());
            pdfDTO.setName(pdfEntity.getName());
            pdfDTO.setLink(pdfEntity.getLink());
            pdfDTO.setCreatedAt(pdfEntity.getCreatedAt());
            return pdfDTO;
        }).collect(Collectors.toList());
    }
}