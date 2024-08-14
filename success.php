<?php
// success.php

// Extract payment details from PayPal
$paymentId = $_GET['paymentId'];
$PayerID = $_GET['PayerID'];

// PayPal API credentials
$clientId = 'AcZgIgCccQToTkUrl2jnMJctBcxHWwFVdg1J-YbbfSnrXIR0YR-H4DM23tXy-mv7q6u_ogRt7k_CwXbh';
$secret = 'EJyxplqpggYxQLoGIGa0wmvkvxjYwSKFc0VT72rv8hc4jJj6NcsAeWUzX-i6nIbjxhl99unX8aNejEVs';
$apiUrl = 'https://api-m.sandbox.paypal.com'; // Sandbox URL for testing

// Execute payment
$ch = curl_init($apiUrl . '/v1/payments/payment/' . $paymentId . '/execute');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json',
    'Authorization: Basic ' . base64_encode($clientId . ':' . $secret)
]);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode([
    'payer_id' => $PayerID
]));

// Execute request
$response = curl_exec($ch);
if (curl_errno($ch)) {
    die('Error: ' . curl_error($ch));
}

curl_close($ch);

// Decode response
$responseData = json_decode($response, true);

// Check if payment was successful
if ($responseData['state'] === 'approved') {
    // Payment was successful
    echo 'Payment was successful!';
    // Redirect to a thank you page or another page
    header('Location: thankyou.html');
    exit;
} else {
    echo 'Payment failed.';
}
