package com.project.payment.repository;
import org.springframework.data.jpa.repository.JpaRepository;

import com.project.payment.entity.Transaction;

public interface TransactionRepository extends JpaRepository<Transaction, String> {
}
