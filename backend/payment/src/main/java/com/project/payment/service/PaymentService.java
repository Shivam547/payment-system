package com.project.payment.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import com.project.payment.dto.PaymentRequest;
import com.project.payment.entity.Transaction;
import com.project.payment.repository.TransactionRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PaymentService {

    private final TransactionRepository repository;
    private final KafkaTemplate<String, String> kafkaTemplate;

    public Transaction processPayment(PaymentRequest request) {

        Transaction txn = Transaction.builder()
                .id(UUID.randomUUID().toString())
                .merchantId(request.getMerchantId())
                .amount(request.getAmount())
                .currency(request.getCurrency())
                .status("PENDING")
                .createdAt(LocalDateTime.now())
                .build();

        repository.save(txn);

        kafkaTemplate.send("payment-topic", txn.getId());

        return txn;
    }

    public List<Transaction> getAllTransactions() {
        return repository.findAll();
    }
}