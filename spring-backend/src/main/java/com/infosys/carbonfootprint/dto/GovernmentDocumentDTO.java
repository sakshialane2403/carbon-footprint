package com.infosys.carbonfootprint.dto;

import org.springframework.web.multipart.MultipartFile;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class GovernmentDocumentDTO {

    @NotBlank(message = "Government document type is required")
    private String documentType;

    @NotBlank(message = "Government document number is required")
    private String documentNumber;

    @NotNull(message = "Government document is required")
    private MultipartFile documentFile;

    public GovernmentDocumentDTO() {
    }

    public String getDocumentType() {
        return documentType;
    }

    public void setDocumentType(String documentType) {
        this.documentType = documentType;
    }

    public String getDocumentNumber() {
        return documentNumber;
    }

    public void setDocumentNumber(String documentNumber) {
        this.documentNumber = documentNumber;
    }

    public MultipartFile getDocumentFile() {
        return documentFile;
    }

    public void setDocumentFile(MultipartFile documentFile) {
        this.documentFile = documentFile;
    }
}
