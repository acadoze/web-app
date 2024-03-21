import axios from "axios"
import {NextResponse} from "next/server"

export async function GET(req) {

    const speechKey = process.env["AZURE_SPEECH_KEY"];
    const speechRegion = process.env["AZURE_SPEECH_REGION"];

    if (!speechKey || !speechRegion) {
        return NextResponse.json({
            success: false,
            message: 'You forgot to add your speech key or region to the .env file.'
        }, {status: 401})
    } else {
        const headers = { 
            headers: {
                'Ocp-Apim-Subscription-Key': speechKey,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };

        try {
            const tokenResponse = await axios.post(`https://${speechRegion}.api.cognitive.microsoft.com/sts/v1.0/issueToken`, null, headers);
            return NextResponse.json({
                token: tokenResponse.data, region: speechRegion
            }, {status: 200})
        } catch (err) {
            return NextResponse.json({
                success: false,
                message: 'There was an error authorizing your speech key.'
            }, {status: 401})
        }
    }
}