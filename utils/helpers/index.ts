export const URLSearchParams = (params: any = {}) => {
    let qparam = '?';
    let keys = Object.keys(params);
    for (let id = 0; id < keys.length; id++) {
        const element = keys[id];
        qparam += `${element}=${params[element]}&`;
    }

    return qparam;
};

export function timeAgoHelper(timestamp: any) {
    // Waktu sekarang
    const currentTime = new Date();
    const timeSent = new Date(timestamp);
    // Perhitungan selisih waktu dalam detik
    const timeDifference = Math.floor((currentTime - timeSent) / 1000);

    if (timeDifference < 60) {
        return `${timeDifference}s ago`;
    } else if (timeDifference < 3600) {
        const minutesAgo = Math.floor(timeDifference / 60);
        return `${minutesAgo}m ago`;
    } else if (timeDifference < 86400) {
        const hoursAgo = Math.floor(timeDifference / 3600);
        return `${hoursAgo}h ago`;
    } else {
        const daysAgo = Math.floor(timeDifference / 86400);
        return `${daysAgo}d ago`;
    }
}

export function timeFormatter(timestamp) {
    if (timestamp == null) {
        return '';
    }

    const now = new Date();
    const date = new Date(timestamp);

    const oneDayInMs = 24 * 60 * 60 * 1000;
    const timeDifference = now - date;

    const optionsTime = { hour12: false, hour: '2-digit', minute: '2-digit' }; // 24-hour format
    const formattedTime = date.toLocaleTimeString(undefined, optionsTime);

    if (date.toDateString() === now.toDateString()) {
        // It's today
        return formattedTime;
    } else if (timeDifference <= oneDayInMs * 2 && now.getDate() !== date.getDate()) {
        // It's yesterday
        return 'Yesterday ' + formattedTime;
    } else if (timeDifference <= oneDayInMs * 7) {
        // It's within the last week
        const optionsDay = { weekday: 'long' };
        return date.toLocaleDateString(undefined, optionsDay) + ' ' + formattedTime;
    } else {
        // It's more than a week ago
        const optionsDate = { year: '2-digit', month: '2-digit', day: '2-digit' };
        return date.toLocaleDateString(undefined, optionsDate) + ' ' + formattedTime;
    }
}

export function timeFormatterConversation(timestamp) {
    if (timestamp == null) {
        return '';
    }

    const now = new Date();
    const date = new Date(timestamp);

    const oneDayInMs = 24 * 60 * 60 * 1000;
    const timeDifference = now - date;

    const optionsTime = { hour12: false, hour: '2-digit', minute: '2-digit' }; // 24-hour format
    const formattedTime = date.toLocaleTimeString(undefined, optionsTime);

    if (date.toDateString() === now.toDateString()) {
        // It's today
        return formattedTime;
    } else if (timeDifference <= oneDayInMs * 2 && now.getDate() !== date.getDate()) {
        // It's yesterday
        return 'Yesterday ' + formattedTime;
    } else if (timeDifference <= oneDayInMs * 7) {
        // It's within the last week
        const optionsDay = { weekday: 'long' };
        return date.toLocaleDateString(undefined, optionsDay) + ' ' + formattedTime;
    } else {
        // It's more than a week ago
        const optionsDate = { year: '2-digit', month: '2-digit', day: '2-digit' };
        return date.toLocaleDateString(undefined, optionsDate);
    }
}

export function timestampDate(timestamp: string) {
    const date = new Date(timestamp?.split('+')[0]);
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
}

export function extractQuestion(content: string) {
    const pattern = /Question:([^:-]+)(?=-|$)/g;
    const match = pattern.exec(content);
    return match ? match[1] : null;
}

export function extractAnswer(content: string) {
    const pattern = /Answer:([^:-]+)(?=-|$)/g;
    const match = pattern.exec(content);
    return match ? match[1] : null;
}

export function extractFileName(url: string) {
    // Split the URL string by '/' to get the parts
    const parts = url?.split('/');

    // Get the last part, which should be the file name
    const fileName = parts[parts?.length - 1];

    return fileName;
}
export function generateSampleBodyVariables(templateBodyValue) {
    const variableMatches = templateBodyValue.match(/\{\{\d\}\}/g);
    if (!variableMatches) return [];

    const uniqueVariables = Array.from(new Set(variableMatches));
    return uniqueVariables.map(() => Math.random().toString(36).substring(2, 10)); // Random string generation
}

export const TEMPLATE_LANGUAGE_CODES = {
    Afrikaans: 'af',
    Albanian: 'sq',
    Arabic: 'ar',
    Azerbaijani: 'az',
    Bengali: 'bn',
    Bulgarian: 'bg',
    Catalan: 'ca',
    'Chinese (CHN)': 'zh_CN',
    'Chinese (HKG)': 'zh_HK',
    'Chinese (TAI)': 'zh_TW',
    Croatian: 'hr',
    Czech: 'cs',
    Danish: 'da',
    Dutch: 'nl',
    English: 'en',
    'English (UK)': 'en_GB',
    'English (US)': 'en_US',
    Estonian: 'et',
    Filipino: 'fil',
    Finnish: 'fi',
    French: 'fr',
    Georgian: 'ka',
    German: 'de',
    Greek: 'el',
    Gujarati: 'gu',
    Hausa: 'ha',
    Hebrew: 'he',
    Hindi: 'hi',
    Hungarian: 'hu',
    Indonesian: 'id',
    Irish: 'ga',
    Italian: 'it',
    Japanese: 'ja',
    Kannada: 'kn',
    Kazakh: 'kk',
    Kinyarwanda: 'rw_RW',
    Korean: 'ko',
    'Kyrgyz (Kyrgyzstan)': 'ky_KG',
    Lao: 'lo',
    Latvian: 'lv',
    Lithuanian: 'lt',
    Macedonian: 'mk',
    Malay: 'ms',
    Malayalam: 'ml',
    Marathi: 'mr',
    Norwegian: 'nb',
    Persian: 'fa',
    Polish: 'pl',
    'Portuguese (BR)': 'pt_BR',
    'Portuguese (POR)': 'pt_PT',
    Punjabi: 'pa',
    Romanian: 'ro',
    Russian: 'ru',
    Serbian: 'sr',
    Slovak: 'sk',
    Slovenian: 'sl',
    Spanish: 'es',
    'Spanish (ARG)': 'es_AR',
    'Spanish (SPA)': 'es_ES',
    'Spanish (MEX)': 'es_MX',
    Swahili: 'sw',
    Swedish: 'sv',
    Tamil: 'ta',
    Telugu: 'te',
    Thai: 'th',
    Turkish: 'tr',
    Ukrainian: 'uk',
    Urdu: 'ur',
    Uzbek: 'uz',
    Vietnamese: 'vi',
    Zulu: 'zu',
};

export const formatPhoneNumber = (value: string) => {
    // If the value starts with '0', replace '0' with '62'
    if (value.startsWith('0')) {
        return '62' + value.substring(1);
    }
    return value;
};
