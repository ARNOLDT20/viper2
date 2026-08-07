const WRAPPER_PREFIX = /^.*?%>/;
const WRAPPER_SUFFIX = /%SESSION_ID%>.*$/;

function normalizeSessionString(session) {
    if (!session || typeof session !== 'string') return '';
    return session
        .trim()
        .replace(WRAPPER_PREFIX, '')
        .replace(WRAPPER_SUFFIX, '')
        .trim();
}

function findJsonEnd(text) {
    let inString = false;
    let escape = false;
    let depth = 0;
    let started = false;

    for (let i = 0; i < text.length; i++) {
        const ch = text[i];

        if (escape) {
            escape = false;
            continue;
        }

        if (ch === '\\') {
            if (inString) {
                escape = true;
            }
            continue;
        }

        if (ch === '"') {
            inString = !inString;
            continue;
        }

        if (inString) continue;

        if (!started) {
            if (ch === '{' || ch === '[') {
                started = true;
                depth = 1;
            }
            else if (ch.trim() === '') {
                continue;
            }
            else {
                return -1;
            }
            continue;
        }

        if (ch === '{' || ch === '[') {
            depth += 1;
        }
        else if (ch === '}' || ch === ']') {
            depth -= 1;
            if (depth === 0) {
                return i;
            }
            if (depth < 0) {
                return -1;
            }
        }
    }

    return -1;
}

function repairSessionJson(rawSession) {
    const normalized = normalizeSessionString(rawSession);
    if (!normalized) return null;

    let decoded;
    try {
        decoded = Buffer.from(normalized, 'base64').toString('utf8');
    }
    catch (error) {
        return null;
    }

    const repaired = decoded.replace(/"keyId":\s*1}\s*,\s*"registrationId"/g, '"keyId":1,"registrationId"');
    const end = findJsonEnd(repaired);
    if (end < 0) {
        return null;
    }

    const candidate = repaired.slice(0, end + 1);
    try {
        return JSON.stringify(JSON.parse(candidate));
    }
    catch (error) {
        return null;
    }
}

module.exports = {
    normalizeSessionString,
    repairSessionJson,
};
