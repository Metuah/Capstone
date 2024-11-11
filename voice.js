// Daftar kata kasar yang akan difilter
const badWords = ["tolol", "bodoh", "idiot"]; // ganti dengan kata-kata kasar yang ingin difilter

// Fungsi untuk mengganti kata kasar dengan simbol
function filterBadWords(text) {
    badWords.forEach((word) => {
        const regex = new RegExp(`\\b${word}\\b`, 'gi'); // Mencari kata kasar (case-insensitive)
        text = text.replace(regex, '***'); // Mengganti kata kasar dengan ***
    });
    return text;
}

// Inisiasi objek SpeechRecognition
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.lang = 'id-ID'; // Atur bahasa yang diinginkan
recognition.continuous = true; // Perekaman berkelanjutan
recognition.interimResults = false; // Hanya hasil final

// Event ketika perekaman dimulai
recognition.onstart = () => {
    console.log('Perekaman suara dimulai');
};

// Event ketika ada hasil perekaman
recognition.onresult = (event) => {
    let transcript = '';
    for (const result of event.results) {
        transcript += result[0].transcript;
    }
    
    // Filter kata kasar
    transcript = filterBadWords(transcript);

    // Tampilkan teks yang sudah difilter
    document.getElementById('result').innerText = transcript;
};

// Event untuk menampilkan error jika ada
recognition.onerror = (event) => {
    console.error('Error:', event.error);
};

// Fungsi untuk memulai perekaman
function startRecognition() {
    recognition.start();
}

// Fungsi untuk menghentikan perekaman
function stopRecognition() {
    recognition.stop();
}
