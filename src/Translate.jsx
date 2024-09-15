import React, { useState } from 'react';
import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const Translate = () => {
    const navigate = useNavigate();
    const [text, setText] = useState('');
    const [translatedText, setTranslatedText] = useState('');
    const [language, setLanguage] = useState('es'); // Default language (Spanish)
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(''); // To store error messages
    const handleClick = () => {
        navigate("/"); // Correctly call navigate to go back
    };


    const handleTranslate = async () => {
        setLoading(true);
        setTranslatedText('');
        setError('');

        try {
            const response = await fetch('https://libretranslate.com/translate', {
                method: 'POST',
                body: JSON.stringify({
                    q: text,
                    source: 'en', // Assuming the source text is in English
                    target: language, // The target language, e.g., 'es' for Spanish
                    format: 'text'
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error(`Failed to fetch translation. Status code: ${response.status}`);
            }

            const data = await response.json();

            // Check if the response contains the translated text
            if (data.translatedText) {
                setTranslatedText(data.translatedText);
            } else {
                throw new Error('Translation not found in response');
            }

        } catch (error) {
            console.error('Error during translation:', error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="translator-container w-full min-h-[100vh] flex justify-center items-center">
            <div>
                <textarea
                    placeholder="Enter text to translate"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    rows={5}
                    cols={50}
                />

                {/* Language Selection */}
                <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                >
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                    <option value="de">German</option>
                    <option value="hi">Hindi</option>
                    <option value="zh">Chinese</option>
                    <option value="ar">Arabic</option>
                </select>

                {/* Translate Button */}
                <button onClick={handleTranslate} disabled={loading}>
                    {loading ? 'Translating...' : 'Translate'}
                </button>

                {/* Display Translated Text */}
                {translatedText && (
                    <div className="translated-text">
                        <h2>Translated Text:</h2>
                        <p>{translatedText}</p>
                    </div>
                )}

                {/* Display Error Message */}
                {error && (
                    <div className="error-message">
                        <h2>Error:</h2>
                        <p>{error}</p>
                    </div>
                )}
                <button
                    className="fixed top-7 left-4 p-2 bg-gray-700 text-white rounded-full hover:bg-gray-600"
                    onClick={handleClick}
                >
                    <IoArrowBack />
                </button>
            </div>
            {/* Input for text */}

        </div>
    );
};

export default Translate;
