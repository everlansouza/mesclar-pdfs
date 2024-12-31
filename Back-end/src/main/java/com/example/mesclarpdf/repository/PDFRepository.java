package com.example.mesclarpdf.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.mesclarpdf.model.PDFEntity;

@Repository
public interface PDFRepository extends JpaRepository<PDFEntity, Long> {
	// Métodos adicionais podem ser definidos aqui, se necessário
}