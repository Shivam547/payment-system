package com.project.payment.kafka;

import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;

import com.project.payment.entity.Transaction;
import com.project.payment.repository.TransactionRepository;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class PaymentConsumer {

    private final TransactionRepository repository;
    private final SimpMessagingTemplate messagingTemplate;

    @KafkaListener(topics = "payment-topic")
    public void consume(String transactionId) throws InterruptedException {

        Thread.sleep(2000); // simulate processing

        Transaction txn = repository.findById(transactionId).orElseThrow();

        if (txn.getAmount() > 10000) {
            txn.setStatus("REVIEW");
        } else {
            txn.setStatus("AUTHORIZED");
        }

        repository.save(txn);

        messagingTemplate.convertAndSend("/topic/transactions", txn);
    }
}