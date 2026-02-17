package com.project.payment.dto;

import lombok.Data;

@Data
public class PaymentRequest {
    private String merchantId;
    private Double amount;
    private String currency;
}