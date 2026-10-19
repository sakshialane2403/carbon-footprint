package com.infosys.carbonfootprint.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "user_government_document")
public class UserGovernmentDocument {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "government_document_id")
    private Long governmentDocumentId;

    @JsonIgnore
    @OneToOne
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;

    @Column(name = "document_type", nullable = false, length = 30)
    private String documentType;

    @Column(name = "document_number", nullable = false, unique = true, length = 50)
    private String documentNumber;

    // Fixes the "bytea expression is of type bigint" error in Hibernate 6/7 with PostgreSQL
    @JsonIgnore
    @JdbcTypeCode(SqlTypes.BINARY)
    @Column(name = "document_file", nullable = true, columnDefinition = "BYTEA")
    private byte[] documentFile;

    public UserGovernmentDocument() {
    }

    public Long getGovernmentDocumentId() {
        return governmentDocumentId;
    }

    public void setGovernmentDocumentId(Long governmentDocumentId) {
        this.governmentDocumentId = governmentDocumentId;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
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

    public byte[] getDocumentFile() {
        return documentFile;
    }

    public void setDocumentFile(byte[] documentFile) {
        this.documentFile = documentFile;
    }
}
