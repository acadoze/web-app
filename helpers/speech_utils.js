import axios from 'axios';

import Cookie from 'universal-cookie';
export async function getTokenOrRefresh() {
    const cookie = new Cookie();
    const speechToken = cookie.get('speech-token');

    if (speechToken === undefined) {
        try {
            const res = await fetch(`${process.env.API_BASE}/tts/speech_token`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`
                }
            });
            const jsonRes = await res.json()
            const token = jsonRes.token;
            const region = jsonRes.region;
            cookie.set('speech-token', region + ':' + token, {maxAge: 540000000, path: '/'});

            console.log('Token fetched from back-end: ' + token);
            return { authToken: token, region: region };
        } catch (err) {
            console.log(err);
            return { authToken: null, error: err };
        }
    } else {
        const idx = speechToken.indexOf(':');
        return { authToken: speechToken.slice(idx + 1), region: speechToken.slice(0, idx) };
    }
}