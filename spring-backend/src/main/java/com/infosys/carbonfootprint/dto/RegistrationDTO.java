package com.infosys.carbonfootprint.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RegistrationDTO {

    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    private String email;

    @Valid
    @NotNull(message = "Personal details are required")
    private PersonalDetailsDTO personalDetails;

    @Valid
    @NotNull(message = "Address details are required")
    private AddressDTO address;

    @Valid
    @NotNull(message = "Government document details are required")
    private GovernmentDocumentDTO governmentDocument;
}
