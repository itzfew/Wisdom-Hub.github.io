<?php
// success.php

// Extract payment details from PayPal
$paymentId = $_GET['paymentId'];
$PayerID = $_GET['PayerID'];

// PayPal API credentials
$clientId = 'AYOynJ7bpOrPL5l2p90uIwGSL68XrWvweIhb1OAyKCiSmHjy7L1vTqY9B-lCL5ljKQ2gjGIxyG3pPWEK';
$secret = 'EHeO8JN8kf6DV8HyoJ9iWI0vtmnO9I_jdZN5rUGjObvTmPTqAaTqXXiO_81e7tXi86mRIjrSJxPlVYOe';
$apiUrl = 'https://api-m.sandbox.paypal.com'; // Sandbox URL

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
