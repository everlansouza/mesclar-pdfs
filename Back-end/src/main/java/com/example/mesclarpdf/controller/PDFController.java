package com.example.mesclarpdf.controller;

import java.io.File;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.mesclarpdf.dto.PDFDTO;
import com.example.mesclarpdf.model.PDFEntity;
import com.example.mesclarpdf.service.PDFService;

import io.swagger.annotations.ApiOperation;

@RestController
@RequestMapping("/api/pdf")
public class PDFController {

    @Autowired
    private PDFService pdfService;

    // Método para mesclar PDFs
    @PostMapping("/merge")
    public ResponseEntity<PDFDTO> mergePDFs(@RequestParam("files") MultipartFile[] files, @RequestParam("name") String name) {
        PDFDTO pdfDTO = pdfService.mergePDFs(files, name);
        return ResponseEntity.ok(pdfDTO);
    }

    // Método para listar PDFs mesclados
    @GetMapping("/history")
    public ResponseEntity<List<PDFDTO>> getMergeHistory() {
        List<PDFDTO> history = pdfService.getMergeHistory();
        return ResponseEntity.ok(history);
    }
    
 // Método para baixar o arquivo mesclado
    @GetMapping("/download/{id}")
    @ApiOperation(value = "Baixar PDF Mesclado", notes = "Permite baixar um arquivo PDF mesclado pelo ID do arquivo.")
    public ResponseEntity<FileSystemResource> downloadMergedPDF(@PathVariable Long id) {
        PDFEntity pdfEntity = pdfService.getPDFById(id);
        
        if (pdfEntity == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        File file = new File(pdfEntity.getLink());
        if (!file.exists()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        FileSystemResource resource = new FileSystemResource(file);
        HttpHeaders headers = new HttpHeaders();
        headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + file.getName());

        return ResponseEntity.ok()
                .headers(headers)
                .body(resource);
    }
}