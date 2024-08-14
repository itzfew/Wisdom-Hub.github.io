 <?php
// pay.php

$amount = $_POST['amount'];
$currency = $_POST['currency'];
$returnUrl = 'http://yourdomain.com/success.php'; // Replace with your actual success URL
$cancelUrl = 'http://yourdomain.com/cancel.php'; // Replace with your actual cancel URL

// PayPal API credentials
$clientId = 'AYOynJ7bpOrPL5l2p90uIwGSL68XrWvweIhb1OAyKCiSmHjy7L1vTqY9B-lCL5ljKQ2gjGIxyG3pPWEK';
$secret = 'EHeO8JN8kf6DV8HyoJ9iWI0vtmnO9I_jdZN5rUGjObvTmPTqAaTqXXiO_81e7tXi86mRIjrSJxPlVYOe';
$apiUrl = 'https://api-m.sandbox.paypal.com'; // Sandbox URL

// Create a new PayPal payment request
$paymentData = [
    'intent' => 'sale',
    'redirect_urls' => [
        'return_url' => $returnUrl,
        'cancel_url' => $cancelUrl
    ],
    'payer' => [
        'payment_method' => 'paypal'
    ],
    'transactions' => [
        [
            'amount' => [
                'total' => $amount,
                'currency' => $currency
            ],
            'description' => 'Purchase Description'
        ]
    ]
];

// Initialize cURL
$ch = curl_init($apiUrl . '/v1/payments/payment');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json',
    'Authorization: Basic ' . base64_encode($clientId . ':' . $secret)
]);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($paymentData));

// Execute request
$response = curl_exec($ch);
if (curl_errno($ch)) {
    die('Error: ' . curl_error($ch));
}

curl_close($ch);

// Decode response
$responseData = json_decode($response, true);

// Redirect to PayPal
if ($responseData['state'] === 'created') {
    foreach ($responseData['links'] as $link) {
        if ($link['rel'] === 'approval_url') {
            header('Location: ' . $link['href']);
            exit;
        }
    }
} else {
    die('Error creating payment.');
}
